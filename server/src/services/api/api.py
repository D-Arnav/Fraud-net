from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import sys
sys.path.append("src/model/utils")

from main import eval_day, eval_single, get_single


#TODO: Fix imports, make a fetch_one_transaction_function

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
    Returns the transaction details and model prediction.
    """

    results = eval_single(idx)

    return results


@app.get("/fetch_single")
async def fetch_single(idx: int):

    single_transaction = get_single(idx)
    
    return {"message": f"Predicting single transaction with index {idx}"}


@app.get("/predict_day")
async def predict_day(day: int):
    return {"message": f"Predicting transactions for day {day}"}

