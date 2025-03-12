from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import sys
sys.path.append("src/model/utils")
sys.path.append("src/services/api/utils")

from main import eval_day, eval_single, get_single
from transaction import make_transaction


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/hello")
async def hello():
    return {"message": "Hello from API"}


@app.get("/predict_single")
async def predict_single(idx: int):
    """
    Predict single transaction with index `idx`. 
    
    Input: idx (int) - Index of the transaction to fetch
    Output: results (dict): {
        "actual": "Legitimate" or "Fraudulent",
        "predicted": "Legitimate" or "Fraudulent",
        "confidence": "X.X%"
    }
    """

    results = eval_single(idx)

    return results


@app.get("/fetch_single")
async def fetch_single(idx: int):
    """
    Fetch single transaction with index `idx`.

    Input: idx (int) - Index of the transaction to fetch
    Output: transaction (dict): {
        "serial": str,
        "payment_id": str,
        "date": str,
        "name": str,
        "card_hash": str,
        "card_bin": str,
        "amount": str,
        "currency": str
    }
    """

    transaction = get_single(idx)

    transaction = make_transaction(transaction, idx)

    return transaction


@app.get("/predict_day")
async def predict_day(day: int):
    """
    Predicts the fraud metrics for a given day.
    Args:
        day (int): The day for which to predict fraud metrics.
    Returns:
        dict: A dictionary containing the following keys:
            - 'precision': Precision of the prediction.
            - 'recall': Recall of the prediction.
            - 'f1_score': F1 score of the prediction.
            - 'false_positive_rate': False positive rate of the prediction.
            - 'false_negative_rate': False negative rate of the prediction.
            - 'accuracy': Accuracy of the prediction.
            - 'num_legitimate': Number of legitimate transactions.
            - 'num_fraudulent': Number of fraudulent transactions.
            - 'true_positives': Number of true positive predictions.
            - 'false_positives': Number of false positive predictions.
            - 'true_negatives': Number of true negative predictions.
            - 'false_negatives': Number of false negative predictions.
    """


    results = eval_day(day)

    return results
