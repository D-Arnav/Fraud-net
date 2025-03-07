import json

import torch
import torch.nn as nn
import torch.optim as optim

from imblearn.under_sampling import TomekLinks

import os

import numpy as np

import pandas as pd

from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix
from sklearn.model_selection import train_test_split

from model.models import NeuralNet
from model.loss import FocalLoss



def log(text, config, printit=True):
    if printit:
        print(text)
    
    with open(config['log_path'], 'a') as f:
        f.write(text)


def rename_columns(df, config):
    with open(os.path.join(os.path.dirname(config['data_path']), 'rename_cols.json'), 'r') as f:
        cols = json.load(f)

    df = df.rename(columns=cols)

    return df


def select_columns(df):

    df = df[['CARD_TYPE', 'CARD_NAME', 'CREATION_TYPE', 'MCC', 'COUNTRY', 'SCA_EXEMPTION', 
             'SCA_EXEMPTION_FLOW', 'MERCHANT', 'SHOP', 'AMOUNT', 'FRAUD']]

    return df


def clean_data(df):

    df['FRAUD'] = df['FRAUD'].infer_objects(copy=False).fillna(0)
    df['AMOUNT'] = df['AMOUNT'].apply(lambda x: float(str(x).replace(',', '.')) if ',' in str(x) else float(str(x)))
    df[['SCA_EXEMPTION', 'SCA_EXEMPTION_FLOW']] = df[['SCA_EXEMPTION', 'SCA_EXEMPTION_FLOW']].fillna('Unkown')

    return df


def encode_columns(df, config):

    with open(os.path.join(os.path.dirname(config['data_path']), 'col_names.json'), 'r') as f:
        col_names = json.load(f)

    with open(os.path.join(os.path.dirname(config['data_path']), 'encode_cols.json'), 'r') as f:
        encoding = json.load(f)
    
    for col in encoding.keys():
        df[col] = df[col].apply(lambda x: encoding[col][x] if x in encoding[col].keys() else 101) # using 0 for unknown breaks code :/
    
    df = pd.get_dummies(df, columns=encoding.keys())

    all_cols = []
    for k, v in encoding.items():
        for k1, v1 in v.items():
            col_name = f'{k}_{v1}'
            all_cols.append(col_name)
        all_cols.append(f'{k}_101')
    
    missing_cols = [col for col in all_cols if col not in df.columns]
    missing_data = {col: False for col in missing_cols}
    missing_df = pd.DataFrame(missing_data, index=df.index)
    df = pd.concat([df, missing_df], axis=1)

    return df[col_names]


def preprocess(df, config):

    df = rename_columns(df, config)
    df = select_columns(df)
    df = clean_data(df)
    df = encode_columns(df, config)

    return df


def get_processed_data(config, tomek=True, split=True):

    df = pd.read_csv(config['data_path'], sep=';')
    df = preprocess(df, config)

    X = df.drop('FRAUD', axis=1)
    y = df['FRAUD']

    X = torch.tensor(X.values.astype(float)).float()
    y = torch.tensor(y.values.astype(float)).long()

    if split:
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=config['seed'])
    
    else:
        X_train, y_train = X, y
        X_test, y_test = None, None

    if tomek:
        X_train, y_train = TomekLinks().fit_resample(X_train, y_train)
    
    X_train, y_train = torch.tensor(X_train), torch.tensor(y_train)

    return X_train, y_train, X_test, y_test


def train(X_train, y_train, config):

    model = NeuralNet(inputs=X_train.shape[1], outputs=2)
    
    # criterion = nn.CrossEntropyLoss(weight=torch.tensor([config['class_weight'], 1-config['class_weight']], dtype=torch.float32))
    
    criterion = FocalLoss(alpha=config['class_weight'], gamma=1.5, reduction='mean')

    optimizer = optim.Adam(model.parameters(), lr=0.005)

    epochs = 200
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


def evaluate(X_test, y_test, model, config, log_text=True):

    model.eval()
    with torch.no_grad():
        y_pred = model(X_test).argmax(dim=1).numpy()

    acc = accuracy_score(y_test, y_pred)
    prec = precision_score(y_test, y_pred)
    rec = recall_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred)
    conf_matrix = confusion_matrix(y_test, y_pred)

    tn, fp, fn, tp = conf_matrix.ravel()
    fpr = fp / (fp + tn)
    fnr = fn / (fn + tp)

    conf_matrix = np.array([[tp, fn], [fp, tn]])

    if log_text:
        text = f"{'-'*30}\nPrecision{' '*11}: {prec*100:.2f}%\nRecall{' '*14}: {rec*100:.2f}%\nFalse Positive Rate : {fpr.item()*100:.2f}%\nFalse Negative Rate : {fnr.item()*100:.2f}%\n{'-'*30}\nAccuracy: {acc*100:.2f}%\nF1 Score: {f1*100:.2f}%\nConfusion Matrix\n{conf_matrix}\n{'-'*30}\n\n"
        log(text, config)

    results = {
        'acc': acc,
        'prec': prec,
        'rec': rec,
        'f1': f1,
        'fpr': fpr,
        'fnr': fnr,
        'conf': conf_matrix
    }

    return results

def evaluate_single(X, y, model):
    """
    
    """

    model.eval()
    with torch.no_grad():
        y_out = model(X)[0]
        y_pred = y_out.argmax(dim=-1).numpy()

        conf_0 = np.exp(y_out[0]) / (np.exp(y_out[0]) + np.exp(y_out[1]))
        conf_1 = np.exp(y_out[1]) / (np.exp(y_out[0]) + np.exp(y_out[1]))
        conf = max(conf_0, conf_1).item()
    
    return {
        'predicted': 'Fraudulent' if y_pred else 'Legitimate',
        'actual': 'Fraudulent' if y.item() else 'Legitimate',
        'confidence': f"{conf:.2f}"  
    }