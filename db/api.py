from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

app = FastAPI()
buffered_data = []

@app.post("/receive-transactions")
async def receive_transactions(request: Request):
    try:
        data = await request.json()
        if not isinstance(data, list):
            return JSONResponse(status_code=400, content={"message": "Expected a list of transactions."})

        for transaction in data:
            required_keys = [
                "Date", "PaymentHour", "PaymentID", "SourceUserID", "CreditCardType", "Shop",
                "RiskCategory", "CreditCardFundingSourceName", "PaymentCreationType", "AcquirerProperty",
                "Merchant", "MCC", "IssuerCountry", "ScaExemption", "ScaExemptionFlow",
                "IPAddress", "PaymentCurrencyCode", "SettledBaseAmt"
            ]
            if not all(key in transaction for key in required_keys):
                return JSONResponse(status_code=400, content={"message": "Missing required fields in transaction data."})

        buffered_data.clear()
        buffered_data.extend(data)
        return {"message": "Data received successfully", "received_count": len(buffered_data)}
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": f"Error processing request: {e}"})

@app.get("/transactions")
def get_transactions():
    return buffered_data
