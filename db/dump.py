import pandas as pd
import mysql.connector
import numpy as np
from datetime import datetime

def replace_semicolon_with_dot(value):
    if isinstance(value, str):
        return value.replace(";", ".")
    return value

def safe_float(val):
    try:
        cleaned = replace_semicolon_with_dot(str(val))
        return float(cleaned)
    except (ValueError, TypeError):
        return None

def clean_date(value):
    try:
        parsed = pd.to_datetime(value, errors='raise', dayfirst=False)
        return parsed.strftime("%Y-%m-%d")
    except Exception:
        try:
            parsed = pd.to_datetime(value, errors='raise', dayfirst=True)
            return parsed.strftime("%Y-%m-%d")
        except Exception:
            return None


def chunk_data(data, chunk_size):
    """Yield successive chunks from the list of data."""
    for i in range(0, len(data), chunk_size):
        yield data[i:i + chunk_size]

def insert_csv_to_mysql(csv_path, batch_size=10000):
    df = pd.read_csv(csv_path, low_memory=False)

    df.rename(columns={
        "Date": "Date",
        "Payment Hour": "PaymentHour",
        "PaymentID": "PaymentID",
        "Source UserID": "SourceUserID",
        "Credit Card Type": "CreditCardType",
        "Shop": "Shop",
        "Risk Category": "RiskCategory",
        "Credit Card Funding Source Name": "CreditCardFundingSourceName",
        "Payment Creation Type": "PaymentCreationType",
        "Acquirer Property": "AcquirerProperty",
        "Merchant": "Merchant",
        "MCC": "MCC",
        "Issuer Country": "IssuerCountry",
        "Sca Exemption": "ScaExemption",
        "Sca Exemption Flow": "ScaExemptionFlow",
        "Payment Currency Code": "PaymentCurrencyCode",
        "Settled Base Amt": "SettledBaseAmt"
    }, inplace=True)

    df = df.where(pd.notnull(df), None)

    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        password="Drag0nb@llzgoat",
        database="Fraudnet"
    )
    cursor = conn.cursor()

    query = """
        INSERT INTO LiveTransactions (
            Date, PaymentHour, PaymentID, SourceUserID, CreditCardType, Shop, RiskCategory,
            CreditCardFundingSourceName, PaymentCreationType, AcquirerProperty, Merchant,
            MCC, IssuerCountry, ScaExemption, ScaExemptionFlow, PaymentCurrencyCode, SettledBaseAmt
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """

    data = [
        (
            clean_date(row.Date),
            row.PaymentHour,
            row.PaymentID,
            row.SourceUserID,
            row.CreditCardType,
            row.Shop,
            row.RiskCategory,
            row.CreditCardFundingSourceName,
            row.PaymentCreationType,
            row.AcquirerProperty,
            row.Merchant,
            row.MCC,
            row.IssuerCountry,
            row.ScaExemption,
            row.ScaExemptionFlow,
            row.PaymentCurrencyCode,
            safe_float(row.SettledBaseAmt)
        )
        for row in df.itertuples(index=False)
    ]

    print(data[1])
    print(data[3905])  # Debugging output

    try:
        total_inserted = 0
        for chunk in chunk_data(data, batch_size):
            cursor.executemany(query, chunk)
            conn.commit()
            total_inserted += cursor.rowcount
            print(f"Inserted {cursor.rowcount} rows... Total: {total_inserted}")

        print(f"Finished inserting {total_inserted} rows.")

    except mysql.connector.Error as err:
        print(f"DB insert error: {err}")
    finally:
        cursor.close()
        conn.close()

if __name__ == "__main__":
    insert_csv_to_mysql("/home/gsrinivasan/Code/Fraud-net/server/src/data/train_data.csv")
