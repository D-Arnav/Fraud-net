from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from utils.main import eval_day, eval_single


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


@app.get("/fetch_single")
async def fetch_single(idx: int):
    """
    Fetch single transaction with index `idx`. 
    Returns the transaction details and model prediction.
    """

    return {"message": f"Getting single transaction with index {idx}", "transaction": eval_single(idx)}


@app.get("/predict_single")
async def predict_single(idx: int):
    return {"message": f"Predicting single transaction with index {idx}"}

@app.get("/predict_day")
async def predict_day(day: int):
    return {"message": f"Predicting transactions for day {day}"}

