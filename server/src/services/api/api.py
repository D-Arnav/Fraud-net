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
    Fetch single transaction with index `idx`. 
    
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
    """

    transaction = get_single(idx)

    transaction = make_transaction(transaction, idx)

    return transaction


@app.get("/predict_day")
async def predict_day(day: int):

    results = eval_day(day)

    return results
