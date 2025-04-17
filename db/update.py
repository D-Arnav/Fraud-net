import pandas as pd
import mysql.connector

def load_merchant_risk_mapping(csv_path):
    try:
        df = pd.read_csv(csv_path, encoding='utf-8')
    except UnicodeDecodeError:
        print("UTF-8 failed, trying ISO-8859-1...")
        df = pd.read_csv(csv_path, encoding='ISO-8859-1')

    df.dropna(subset=['Merchant', 'Category'], inplace=True)
    df['Merchant'] = df['Merchant'].str.strip()
    df['Category'] = df['Category'].str.strip()
    return dict(zip(df['Merchant'], df['Category']))

def update_risk_type_in_db(mapping):
    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        password="Drag0nb@llzgoat",
        database="Fraudnet"
    )
    cursor = conn.cursor()

    updated_count = 0
    for merchant, risk_type in mapping.items():
        query = """
            UPDATE LiveTransactions
            SET RiskType = %s
            WHERE Merchant = %s
        """
        cursor.execute(query, (risk_type, merchant))
        updated_count += cursor.rowcount

    conn.commit()
    print(f"Updated {updated_count} rows with RiskType.")
    cursor.close()
    conn.close()

if __name__ == "__main__":
    risk_map = load_merchant_risk_mapping("/home/gsrinivasan/Code/Fraud-net/server/src/data/risk_mapping.csv")
    update_risk_type_in_db(risk_map)
