from flask import request, Flask

import pandas as pd

import names

import random

import torch

import os

import json

from model.utils import preprocess, evaluate_single
from model.models import NeuralNet

app = Flask(__name__)



def get_rand_name(serial):
    random.seed(serial)
    first_name = names.get_first_name()
    last_name = names.get_last_name()
    return f"{first_name} {last_name}"


def get_rand_hash(serial):
    random.seed(serial)
    nums = str(random.randint(1000000000000000, 9999999999999999))
    return ' '.join([nums[i:i+4] for i in range(0, len(nums), 4)])


def get_date(day):
    return str(pd.Timestamp(2025, 2, day).date())
    

def row_to_details(row, day):

    data = {
        'Serial Number': str(row['Serial']),
        'Date Time': str(get_date(day)),
        'Payment ID': str(row['PaymentID']),
        'Name of the card holder': get_rand_name(row['Serial']),
        'Card Hash': get_rand_hash(row['Serial']),
        'Card Bin': str(row['BIN#']),
        'Amount': str(row['Settled Pmt Amt']),
        'Currency': str(row['Payment Currency Code'])
    }

    return data


@app.route('/fetch-transaction', methods=['GET', 'POST'])
def fetch_transaction():
    day = request.get_json().get('day')
    idx = request.get_json().get('index')

    df = pd.read_csv('data/batch.csv', sep=';')
    df.insert(0, 'Serial', range(1, len(df) + 1))
    details = row_to_details(df.iloc[idx].to_dict(), day)

    return details


@app.route('/predict-fraud', methods=['GET', 'POST'])
def predict_fraud():

    idx = request.get_json().get('index')
    day = request.get_json().get('day')

    with open(os.path.join('data/day_division.json'), 'r') as f:
        day_division = json.load(f)

    df = pd.read_csv('data/data_2.csv', sep=';')
    df.set_index('PaymentID', inplace=True)

    current_tid = day_division[day-1][idx]

    current_transaction = df.loc[current_tid].to_frame().T

    current_transaction = preprocess(current_transaction, {'data_path': 'data/data_2.csv'})

    X = torch.tensor(current_transaction.drop('FRAUD', axis=1).astype(float).values[0]).float()
    y = torch.tensor(current_transaction['FRAUD'].values).clone().detach().long()

    X = X.clone().detach().float()
    X = X.unsqueeze(0)
    y = y.unsqueeze(0)

    model = NeuralNet(inputs=X.shape[-1], outputs=2)

    model.load_state_dict(torch.load(os.path.join('model/weights/model.pt')))

    results = evaluate_single(X, y, model)
    results['payment_id'] = current_tid
    results['date'] = get_date(day)

    return results

