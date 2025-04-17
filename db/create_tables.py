import mysql.connector

def create_tables():
    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        password="Drag0nb@llzgoat",
        database="Fraudnet"
    )
    cursor = conn.cursor()

    table1 = """
        CREATE TABLE LiveTransactions (
            Date DATE,
            PaymentHour INT(2),
            PaymentID VARCHAR(20) PRIMARY KEY,
            SourceUserID VARCHAR(20),
            CreditCardType VARCHAR(50),
            Shop VARCHAR(200),
            RiskCategory VARCHAR(10),
            CreditCardFundingSourceName VARCHAR(10),
            PaymentCreationType VARCHAR(50),
            AcquirerProperty VARCHAR(10),
            Merchant VARCHAR(200),
            MCC VARCHAR(4),
            IssuerCountry VARCHAR(20),
            ScaExemption VARCHAR(30),
            ScaExemptionFlow VARCHAR(30),
            PaymentCurrencyCode VARCHAR(3),
            SettledBaseAmt DECIMAL(15, 2)
        );
    """

    table2 = """
        CREATE TABLE TransactionStatus (
            Date DATE,
            PaymentID VARCHAR(20),
            Status ENUM('Allowed', 'Chargeback'),
            PRIMARY KEY (PaymentID),
            FOREIGN KEY (PaymentID) REFERENCES LiveTransactions(PaymentID) ON DELETE CASCADE
        );
    """

    table3 = """
        CREATE TABLE PredictedStatus (
            Date DATE,
            PaymentID VARCHAR(20),
            PredictedStatus ENUM('Fraud', 'Legit', 'Pass Through'),
            PRIMARY KEY (PaymentID),
            FOREIGN KEY (PaymentID) REFERENCES LiveTransactions(PaymentID) ON DELETE CASCADE
        );
    """

    try:
        cursor.execute(table1)
        cursor.execute(table2)
        cursor.execute(table3)
        conn.commit()
        print("Tables created successfully.")
    except mysql.connector.Error as err:
        print("Error:", err)
    finally:
        cursor.close()
        conn.close()

if __name__ == "__main__":
    create_tables()
