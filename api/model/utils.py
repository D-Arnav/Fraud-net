import torch
import torch.nn as nn
import torch.optim as optim

from IPython.display import Image

from imblearn.combine import SMOTETomek
from imblearn.over_sampling import SMOTE
from imblearn.under_sampling import RandomUnderSampler, TomekLinks

import os

import pandas as pd

from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.tree import export_graphviz
from sklearn.neural_network import MLPClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix

from models import NeuralNet




def rename_columns(df):

    df = df.rename(columns={
        'CreditCardType': 'CARD_TYPE', 
        'CreditCardFundingSourceName': 'CARD_NAME',
        'PaymentCreationType': 'CREATION_TYPE',
        'MerchantGrouping': 'MERCHANT_GROUP',
        'AcquirerProperty': 'ACQUIRER_PROPERTY',
        'MCC': 'MCC',
        'BIN#': 'BIN',
        'IssuerName': 'ISSUER',
        'Issuer Country': 'COUNTRY',
        'RequestedScaChallengeIndicator': 'SCA_INDICATOR',
        'ScaExemption': 'SCA_EXEMPTION',
        'ScaExemptionFlow': 'SCA_EXEMPTION_FLOW',
        'ScaPolicy': 'SCA_POLICY',
        'Partner': 'PARTNER',
        'Merchant': 'MERCHANT',
        'Shop': 'SHOP',
        'PaymentProvider': 'PAYMENT_PROVIDER',
        'Payment Currency Code': 'CURRENCY',
        'PaymentID': 'PAYMENT_ID',
        'Settled Pmt Amt': 'SETTLED_PAYMENT_AMOUNT',
        'Settled Base Amt': 'AMOUNT',
        'FN Qty': 'FRAUD'
    })

    return df


def select_columns(df):

    df = df[['CARD_TYPE', 'CARD_NAME', 'CREATION_TYPE', 'MCC', 'COUNTRY', 'SCA_EXEMPTION', 'SCA_EXEMPTION_FLOW', 'MERCHANT', 'SHOP', 'AMOUNT', 'FRAUD']]

    return df


def clean_data(df):

    df['FRAUD'] = df['FRAUD'].fillna(0).astype(int)
    df['AMOUNT'] = df['AMOUNT'].apply(lambda x: float(str(x).replace(',', '.')))
    df[['SCA_EXEMPTION', 'SCA_EXEMPTION_FLOW']] = df[['SCA_EXEMPTION', 'SCA_EXEMPTION_FLOW']].fillna('Unkown')
    df.isna().sum() 

    return df


def encode_top_k(df, column_name, k):

    top_k = df[column_name].value_counts().nlargest(k).index
    top_k_mapping = {category: f'CLASS_{idx}' for idx, category in enumerate(top_k, start=1)}
    top_k_mapping['Other'] = 'CLASS_0'
    
    df[column_name] = df[column_name].apply(lambda x: top_k_mapping[x] if x in top_k_mapping else top_k_mapping['Other'])
    df[column_name] = df[column_name].astype('category')
    
    df = pd.get_dummies(df, columns=[column_name], drop_first=True)

    return df


def encode_columns(df):

    df = encode_top_k(df, 'CARD_TYPE', 4)
    df = encode_top_k(df, 'CARD_NAME', 4)
    df = encode_top_k(df, 'CREATION_TYPE', 4)
    df = encode_top_k(df, 'MCC', 9)
    df = encode_top_k(df, 'COUNTRY', 9)
    df = encode_top_k(df, 'SCA_EXEMPTION', 4)
    df = encode_top_k(df, 'SCA_EXEMPTION_FLOW', 3)
    df = encode_top_k(df, 'MERCHANT', 9)
    df = encode_top_k(df, 'SHOP', 9)

    return df


def preprocess(df):

    df = rename_columns(df)
    df = select_columns(df)
    df = clean_data(df)
    df = encode_columns(df)

    return df


def get_model(config):

    class_weight_value = config['class_weight']

    models =  {
        'logistic': LogisticRegression(
            class_weight={0: class_weight_value, 1: 1 - class_weight_value}, 
            random_state=config['seed']),

        'svm': SVC(class_weight={0: class_weight_value, 1: 1 - class_weight_value}, 
                   random_state=config['seed']),

        'random_forest': RandomForestClassifier(verbose=True, 
                                                max_depth=config['depth'], 
                                                class_weight={0: class_weight_value, 1: 1 - class_weight_value}, 
                                                random_state=config['seed']),

        'neural_network': MLPClassifier(random_state=config['seed']),
        
        'gb_trees': GradientBoostingClassifier(random_state=config['seed'])
    }

    model = models[config['model']]


    return model


def resample(X_train, y_train, config):

    if config['class_balance_method'] == 'smote_tomek':
        X_train, y_train = SMOTETomek(random_state=config['seed']).fit_resample(X_train, y_train)

    elif config['class_balance_method'] == 'smote':
        X_train, y_train = SMOTE(random_state=config['seed']).fit_resample(X_train, y_train)

    elif config['class_balance_method'] == 'undersampling':
        X_train, y_train = RandomUnderSampler(random_state=config['seed']).fit_resample(X_train, y_train)

    return X_train, y_train


def evaluate(y_test, y_pred, verbose=False):

    conf_matrix = confusion_matrix(y_test, y_pred)
    accuracy = accuracy_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred, average='binary')
    recall = recall_score(y_test, y_pred, average='binary')
    f1 = f1_score(y_test, y_pred, average='binary')

    if verbose:
        print("\nAccuracy: {:.2f}%".format(100*accuracy))
        print("Precision: {:.2f}%".format(100*precision))
        print("Recall: {:.2f}%".format(100*recall))
        print("F1 Score: {:.2f}%".format(100*f1))
        print("Confusion Matrix\n", conf_matrix)

    return accuracy, precision, recall, f1, conf_matrix


def get_processed_data(config):

    df = pd.read_csv(config['data_path'], sep=';')
    df = preprocess(df)

    X = df.drop('FRAUD', axis=1)
    y = df['FRAUD']

    return torch.tensor(X.values.astype(float)).float(), torch.tensor(y.values.astype(float)).long()


def train(X_train, y_train, config):

    model = NeuralNet(inputs=X_train.shape[1], outputs=2)
    criterion = nn.CrossEntropyLoss(weight=torch.tensor([config['class_weight'], 1-config['class_weight']], dtype=torch.float32))
    optimizer = optim.Adam(model.parameters(), lr=0.01)

    epochs = 100
    for epoch in range(epochs):

        model.train()
        optimizer.zero_grad()
        outputs = model(X_train)
        loss = criterion(outputs, y_train)
        loss.backward()
        optimizer.step()

        if epoch % 10 == 0:
            print(f'Epoch [{epoch+1}/{epochs}], Loss: {loss.item()}')

    if config['save']:
        torch.save(model.state_dict(), os.path.join(config['save_path'], 'model.pt'))

    return model 

