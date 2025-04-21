import pandas as pd
import torch
import re
import json
from tqdm import tqdm
from sklearn.metrics import confusion_matrix

from model.fraudnet import FraudNet_FN_2_01
from model.transaction import NewTransactionLoader, TransactionHandler
import random
import names



"""
    Column Names Here!

    Date,PaymentHour,CreditCardType,CreditCardFundingSourceName,PaymentCreationType,AcquirerProperty,MCC,BIN#,Issuer Country,ScaExemption,ScaExemptionFlow,Merchant,Shop,Payment Currency Code,PaymentID,SourceUserID,RiskCategory,Settled Base Amt,FN Qty
"""


def load_csv_with_risk_mapping():
    data_path = 'src/data/test_data.csv'
    risk_mapping_path='src/data/risk_mapping.csv'

    data_frame = pd.read_csv(
        data_path, 
        encoding='utf-8', 
        low_memory=False,
        dtype=str,
        sep=','
    )

    risk_mapping_df = pd.read_csv(risk_mapping_path, encoding='latin-1', dtype=str)
    risk_mapping = dict(zip(risk_mapping_df['Merchant'], risk_mapping_df['Category']))
    data_frame['RiskType'] = data_frame['Merchant'].map(risk_mapping).fillna('Unknown')

    return data_frame


def load_model():

    model = FraudNet_FN_2_01(
        model_name="Fraudnet",
        model_version="2.01",
        model_description="Using More columns!"
    )

    path = "src/weights/Fraudnet_2.01_0417130824.pt"
    model.load(path)

    return model


def get_config():

    config = {
        'model': 'FN_2_01',
        'model_path': 'src/weights/Fraudnet_2.01_0417130824.pt',
        'thresholds': {
            'V.High Risk': 0.5,
            'High Risk': 0.5,
            'Medium Risk': 0.5,
            'Low Risk': 0.5,
            'Unknown': 0.5
        }
    }

    return config


def get_single(data_frame, index):
    """
    Fetch and Returns a Single Transaction
    """

    return data_frame.iloc[index].to_dict()



def generate_details(row, index):
    """
    Generates Random Values for Name, Card Hash
    """

    random.seed(index)

    first_name = names.get_first_name()
    last_name = names.get_last_name()

    random_number = random.randint(1000, 9999)

    card_hash = f"**** **** **** {random_number}"

    details = {
        "Serial": index,
        "Payment ID": row['PaymentID'],
        "Date": row['Date'],
        "Name": f"{first_name} {last_name}",
        "Card Hash": card_hash,
        "Card BIN": row['BIN#'],
        "Amount": row['Settled Base Amt'].replace(';', '.'),
        "Currency": row['Payment Currency Code']
    }
    
    return details

def fetch_and_evaluate_single(index):
    """
    Fetches and evaluates a Single Transaction
    """

    config = get_config()

    model = load_model()
    data_path = 'src/data/test_data.csv'
    
    th = TransactionHandler(data_path, index)

    X = th.get_feature()

    date = th.transaction['Date']
    payment_id = th.transaction['PaymentID']
    risk_type = th.transaction['RiskType']

    _, p_fraud = model.predict(X)

    if p_fraud > config['thresholds'][risk_type]:
        recommendation = "Decline"
    else:
        recommendation = "Accept"

    result = {
        "S.No.": index,
        "Date": date,
        "PaymentID": payment_id,
        "Recommendation": recommendation,
        "Prob Fraud": f"{p_fraud * 100:.3f}%",                
    }

    details = generate_details(th.transaction, index)

    return {
        "details": details,
        "result": result
    }


def evaluate_day(day):
    """
    Evaluates an entire day of Transactions and returns the confusion matrix.
    """

    config = get_config()
    model = load_model().model
    model.eval()

    data_path = 'src/data/test_data.csv'
    tranform_path = 'src/data/transform2.json'
    risk_mapping_path = 'src/data/risk_mapping.csv'

    df = pd.read_csv(data_path, encoding='utf-8', low_memory=False, dtype=str, sep=',')
    day_df = df[df['Date'] == day].copy()
    if day_df.empty:
        return None

    risk_mapping_df = pd.read_csv(risk_mapping_path, encoding='latin-1', dtype=str)
    risk_mapping = dict(zip(risk_mapping_df['Merchant'], risk_mapping_df['Category']))
    df['RiskType'] = df['Merchant'].map(risk_mapping).fillna('Unknown')

    data_dict = {}
    for _, row in tqdm(df.iterrows(), desc="Processing Rows"):
        payment_id = row['PaymentID']  
        data_dict[payment_id] = row.to_dict()
        

    loader = NewTransactionLoader(data_path, tranform_path, risk_mapping_path)
    loader.data_frame = day_df.set_index('PaymentID')
    data_loader = loader.create_loader()

    y_true = []
    y_pred = []

    with torch.no_grad():
        for X_batch, y_batch, i in data_loader:
            logits = model(X_batch)
            output = torch.sigmoid(logits)

            thresholds = torch.tensor([config['thresholds'][data_dict[str(j.item())]['RiskType']] for j in i], device=output.device)
            preds = (output[:, 1] > thresholds).long()
            y_true.extend(y_batch.cpu().numpy().astype(int))
            y_pred.extend(preds.cpu().numpy().astype(int))

    confmat = confusion_matrix(y_true, y_pred, labels=[0, 1])
    
    result = {
        "Date": day,
        "# Legitimate": confmat[0][0].item() + confmat[0][1].item(),
        '# Fraudulent': confmat[1][0].item() + confmat[1][1].item(),
        'Accuracy': round(100 * (confmat[0][0].item() + confmat[1][1].item()) / (confmat[0][0].item() + confmat[1][1].item() + confmat[0][1].item() + confmat[1][0].item()) if (confmat[0][0].item() + confmat[1][1].item() + confmat[0][1].item() + confmat[1][0].item()) > 0 else 0, 2),
        'Precision': round(100 * confmat[1][1].item() / (confmat[1][1].item() + confmat[0][1].item()) if (confmat[1][1].item() + confmat[0][1].item()) > 0 else 0, 2),
        'Recall': round(100 * confmat[1][1].item() / (confmat[1][1].item() + confmat[1][0].item()) if (confmat[1][1].item() + confmat[1][0].item()) > 0 else 0, 2),
        'FPR': round(100 * confmat[0][1].item() / (confmat[0][1].item() + confmat[0][0].item()) if (confmat[0][1].item() + confmat[0][0].item()) > 0 else 0, 2),
        'FNR': round(100 * confmat[1][0].item() / (confmat[1][0].item() + confmat[1][1].item()) if (confmat[1][0].item() + confmat[1][1].item()) > 0 else 0, 2),
        'F1 Score': round(100 * 2 * (confmat[1][1].item() / (confmat[1][1].item() + confmat[0][1].item()) * confmat[1][1].item() / (confmat[1][1].item() + confmat[1][0].item())) / ((confmat[1][1].item() / (confmat[1][1].item() + confmat[0][1].item()) + confmat[1][1].item() / (confmat[1][1].item() + confmat[1][0].item()))) if (confmat[1][1].item() + confmat[0][1].item() + confmat[1][0].item()) > 0 else 0, 2),
        'tp': confmat[1][1].item(),
        'tn': confmat[0][0].item(),
        'fp': confmat[0][1].item(),
        'fn': confmat[1][0].item()
    }

    return result


def fetch_dates():
    data_path = 'src/data/test_data.csv'
    df = pd.read_csv(data_path, encoding='utf-8', low_memory=False, dtype=str, sep=',')
    unique_dates = df['Date'].unique().tolist()
    return unique_dates


def evaluate_merchant_wise():
    
    config = get_config()
    model = load_model().model
    model.eval()

    data_path = 'src/data/test_data.csv'
    tranform_path = 'src/data/transform2.json'
    risk_mapping_path = 'src/data/risk_mapping.csv'

    df = pd.read_csv(data_path, encoding='utf-8', low_memory=False, dtype=str, sep=',')

    risk_mapping_df = pd.read_csv(risk_mapping_path, encoding='latin-1', dtype=str)
    risk_mapping = dict(zip(risk_mapping_df['Merchant'], risk_mapping_df['Category']))
    df['RiskType'] = df['Merchant'].map(risk_mapping).fillna('Unknown')

    data_dict = {}
    for _, row in tqdm(df.iterrows(), desc="Processing Rows"):
        payment_id = row['PaymentID']  
        data_dict[payment_id] = row.to_dict()
        

    loader = NewTransactionLoader(data_path, tranform_path, risk_mapping_path)
    loader.data_frame = df.set_index('PaymentID')
    data_loader = loader.create_loader()

    y_true = []
    y_pred = []
    
    results = {}
    with torch.no_grad():
        for X_batch, y_batch, i in data_loader:
            logits = model(X_batch)
            output = torch.sigmoid(logits)
            merchants = [data_dict[str(j.item())]['Merchant'] for j in i]
            thresholds = torch.tensor([config['thresholds'][data_dict[str(j.item())]['RiskType']] for j in i], device=output.device)
            preds = (output[:, 1] > thresholds).long()
            y_true_batch = y_batch.cpu().numpy().astype(int)
            y_pred_batch = preds.cpu().numpy().astype(int)

            for merchant, true_label, pred_label in zip(merchants, y_true_batch, y_pred_batch):
                if merchant not in results:
                    results[merchant] = {'tp': 0, 'tn': 0, 'fp': 0, 'fn': 0}
                
                if true_label == 1 and pred_label == 1:
                    results[merchant]['tp'] += 1
                elif true_label == 0 and pred_label == 0:
                    results[merchant]['tn'] += 1
                elif true_label == 0 and pred_label == 1:
                    results[merchant]['fp'] += 1
                elif true_label == 1 and pred_label == 0:
                    results[merchant]['fn'] += 1

            y_true.extend(y_true_batch)
            y_pred.extend(y_pred_batch)

    for k, v in results.items():
        tp = v['tp']
        tn = v['tn']
        fp = v['fp']
        fn = v['fn']

        results[k] = {
            'merchant': k,
            'num_legitimate': tn + fp,
            'num_fraudulent': tp + fn,
            'precision': tp / (tp + fp) if (tp + fp) > 0 else 0,
            'recall': tp / (tp + fn) if (tp + fn) > 0 else 0,
            'false_positive_rate': fp / (fp + tn) if (fp + tn) > 0 else 0,
            'false_negative_rate': fn / (fn + tp) if (fn + tp) > 0 else 0
        }
    
    results = list(results.values())

    results_path = 'src/results/results.json'
    with open(results_path, 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=4)


def fetch_merchant_wise():
    results_path = 'src/results/results.json'
    with open(results_path, 'r', encoding='utf-8') as f:
        results = json.load(f)

    return results    

    
if __name__ == '__main__':

    # o = fetch_and_evaluate_single(0)
    # print(o)

    # print(
    #     evaluate_day(
    #         "3/1/2025"
    #     )
    # )

    evaluate_merchant_wise()