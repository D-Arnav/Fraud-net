from flask import request, jsonify, Flask
import pandas as pd

from model.utils import preprocess

app = Flask(__name__)


def gen_rand_name():
    return "Gowtham aka Gowth man"


def gen_rand_hash():
    return "9493 7862 8494 9378"


def row_to_details(row):

    data = {
        'Serial Number': str(row['Serial']),
        'Payment ID': str(row['PaymentID']),
        'Name of the card holder': gen_rand_name(),
        'Card Hash': gen_rand_hash(),
        'Card Bin': str(row['BIN#']),
        'Amount': str(row['Settled Pmt Amt']),
        'Currency': str(row['Payment Currency Code'])
    }

    return data


@app.route('/fetch-transaction', methods=['GET', 'POST'])
def fetch_transaction():
    df = pd.read_csv('data/batch.csv', sep=';')
    # idx = request.get_json().get('index')
    idx = 1
    df.insert(0, 'Serial', range(1, len(df) + 1))
    details = row_to_details(df.iloc[idx].to_dict())

    print(details)
    return details

# fetch_transaction()