import pandas as pd

def load_merchant_risk_mapping(csv_path):
    """
    Load merchant to risk type mapping from a CSV into a dictionary.
    Tries UTF-8 first, then falls back to ISO-8859-1 if decoding fails.
    """
    try:
        df = pd.read_csv(csv_path, encoding='utf-8')
    except UnicodeDecodeError:
        print("UTF-8 failed, trying ISO-8859-1...")
        df = pd.read_csv(csv_path, encoding='ISO-8859-1')

    df.dropna(subset=['Merchant', 'Category'], inplace=True)
    df['Merchant'] = df['Merchant'].str.strip()
    df['Category'] = df['Category'].str.strip()
    mapping = dict(zip(df['Merchant'], df['Category']))
    return mapping

# Example usage
if __name__ == "__main__":
    csv_file_path = "/home/gsrinivasan/Code/Fraud-net/server/src/data/risk_mapping.csv"
    merchant_risk_dict = load_merchant_risk_mapping(csv_file_path)
    print("Sample:", list(merchant_risk_dict.items())[:5])
