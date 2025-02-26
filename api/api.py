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
    return ''.join([str(random.randint(0, 9)) for _ in range(16)])


def row_to_details(row):

    data = {
        'Serial Number': str(row['Serial']),
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
    df = pd.read_csv('data/batch.csv', sep=';')
    idx = request.get_json().get('index')
    df.insert(0, 'Serial', range(1, len(df) + 1))
    details = row_to_details(df.iloc[idx].to_dict())

    print(details)
    return details


@app.route('/predict-fraud', methods=['GET', 'POST'])
def predict_fraud():
    # idx = request.get_json().get('index')
    # day = request.get_json().get('day')

    idx, day  = 0, 0

    with open(os.path.join('data/day_division.json'), 'r') as f:
        day_division = json.load(f)

    # Open day_division, it is an array of arrays
    # Go to each array of array, shuffle it, and replace it

    day_division_shuf = []
    for i in range(len(day_division)):
        day_division_shuf.append(random.shuffle(day_division[i]))
    
    print(day_division)

    return 0
    
predict_fraud();

@app.route('api/metrics', methods=['GET'])
def metrics():
    pass