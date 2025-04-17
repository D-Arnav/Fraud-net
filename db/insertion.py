import requests
import mysql.connector
import logging
import pandas as pd  # For robust date parsing
from datetime import datetime

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

def clean_value(value, is_date=False):
    """Strips strings and returns None for empty/null-like values. Converts date if is_date is True."""
    if value is None:
        return None

    if isinstance(value, str):
        value = value.strip()
        if not value:
            return None

    if is_date:
        try:
            parsed = pd.to_datetime(value, errors='coerce', dayfirst=True)
            if pd.notnull(parsed):
                return parsed.strftime("%Y-%m-%d")
        except Exception:
            return None
        return None

    return value

def convert_amount(val):
    """Convert amount safely, handling semicolons and conversion issues."""
    try:
        if isinstance(val, str):
            val = val.replace(";", ".").strip()
        return float(val)
    except (ValueError, TypeError):
        return None

def insert_all(transactions):
    try:
        with mysql.connector.connect(
            host="localhost",
            user="root",
            password="Drag0nb@llzgoat",
            database="Fraudnet"
        ) as conn, conn.cursor() as cursor:

            query = """
                INSERT INTO LiveTransactions (
                    Date, PaymentHour, PaymentID, SourceUserID, CreditCardType, Shop, RiskCategory,
                    CreditCardFundingSourceName, PaymentCreationType, AcquirerProperty, Merchant,
                    MCC, IssuerCountry, ScaExemption, ScaExemptionFlow,
                    PaymentCurrencyCode, SettledBaseAmt
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """

            values = []
            for data in transactions:
                try:
                    record = (
                        clean_value(data.get("Date"), is_date=True),
                        clean_value(data.get("PaymentHour")),
                        clean_value(data.get("PaymentID")),
                        clean_value(data.get("SourceUserID")),
                        clean_value(data.get("CreditCardType")),
                        clean_value(data.get("Shop")),
                        clean_value(data.get("RiskCategory")),
                        clean_value(data.get("CreditCardFundingSourceName")),
                        clean_value(data.get("PaymentCreationType")),
                        clean_value(data.get("AcquirerProperty")),
                        clean_value(data.get("Merchant")),
                        clean_value(data.get("MCC")),
                        clean_value(data.get("IssuerCountry")),
                        clean_value(data.get("ScaExemption")),
                        clean_value(data.get("ScaExemptionFlow")),
                        clean_value(data.get("PaymentCurrencyCode")),
                        convert_amount(data.get("SettledBaseAmt"))
                    )
                    values.append(record)
                except Exception as e:
                    logging.warning(f"Skipping record due to bad data: {e} | data: {data}")

            if values:
                cursor.executemany(query, values)
                conn.commit()
                logging.info(f"Successfully inserted {len(values)} transactions.")
            else:
                logging.warning("No valid transactions to insert.")

    except mysql.connector.Error as err:
        logging.error(f"Database connection failed: {err}")
    except Exception as e:
        logging.error(f"Unexpected error: {e}")

def fetch_transactions(api_url):
    try:
        response = requests.get(api_url)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as err:
        logging.error(f"Failed to fetch data from API: {err}")
        return []

# Replace with your actual API endpoint
API_URL = "http://localhost:8001/transactions"

transactions = fetch_transactions(API_URL)
if transactions:
    insert_all(transactions)
else:
    logging.warning("No transactions to insert.")
