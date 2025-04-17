from fastapi import FastAPI
from datetime import date, time

app = FastAPI()

@app.get("/employees")
def get_employees():
    return [
        {
            "Date": str(date.today()),
            "Time": "12:34:56",
            "PaymentID": "TX1001",
            "CreditCardType": "Visa",
            "Shop": "StoreX",
            "RiskCategory": "High",
            "CreditCardFundingSourceName": "Credit",
            "PaymentCreationType": "Online",
            "Merchant": "StoreX Pvt Ltd",
            "MCC": "5411",
            "IssuerCountry": "US",
            "ScaExemption": "LowValue",
            "ScaExemptionFlow": "Automatic",
            "IPAddress": "192.168.1.10",
            "SettledBaseAmt": 999.99
        },
        {
            "Date": str(date.today()),
            "Time": "13:00:00",
            "PaymentID": "TX1002",
            "CreditCardType": "MasterCard",
            "Shop": "StoreY",
            "RiskCategory": "Medium",
            "CreditCardFundingSourceName": "Debit",
            "PaymentCreationType": "POS",
            "Merchant": "StoreY Ltd",
            "MCC": "5732",
            "IssuerCountry": "UK",
            "ScaExemption": "TrustedBeneficiary",
            "ScaExemptionFlow": "Manual",
            "IPAddress": "192.168.1.11",
            "SettledBaseAmt": 150.00
        }
    ]
