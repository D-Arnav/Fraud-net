import mysql.connector
from datetime import timedelta

def deletion():
    try:
        # Connect to the database
        with mysql.connector.connect(
            host="localhost",
            user="root",
            password="Drag0nb@llzgoat",
            database="Fraudnet"
        ) as conn, conn.cursor() as cursor:

            # Fetch the most recent transaction date from the LiveTransactions table
            cursor.execute("SELECT MAX(Date) FROM LiveTransactions")
            latest_date = cursor.fetchone()[0]

            if not latest_date:
                print("No records found. Nothing to delete.")
                return

            # Calculate the cutoff date, 90 days before the latest date
            cutoff_date = latest_date - timedelta(days=90)

            # Delete records older than 90 days
            delete_query = """
                DELETE FROM LiveTransactions
                WHERE Date <= %s
            """
            cursor.execute(delete_query, (cutoff_date,))
            deleted_count = cursor.rowcount
            conn.commit()

            if deleted_count == 0:
                print("No records older than 90 days to delete.")
            else:
                print(f"Deleted {deleted_count} records older than {cutoff_date}.")

    except mysql.connector.Error as err:
        print(f"Database error: {err}")
    except Exception as e:
        print(f"Unexpected error: {e}")

if __name__ == "__main__":
    deletion()
