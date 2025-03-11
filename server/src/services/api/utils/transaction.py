import names
import random



def make_transaction(row, idx):

    return {
        "serial": str(idx),
        "payment_id": str(row['PaymentID']),
        "date": (row['Date']),
        "name": generate_random_name(seed=idx),
        "card_hash": generate_random_card_hash(seed=idx),
        "card_bin": str(row['BIN#']),
        "amount": format_amount(row['Settled Pmt Amt']),
        "currency": str(row['Payment Currency Code']),
    }


def generate_random_name(seed):
    """
    Generates a random name
    """
    random.seed(seed)
    
    first_name = names.get_first_name()
    last_name = names.get_last_name()

    return f"{first_name} {last_name}"


def generate_random_card_hash(seed):
    """
    Generates a random card hash
    """

    random.seed(seed)
    
    last_four = random.randint(1000, 9999)
    card_hash = f"×××× ×××× ×××× {last_four}"

    return card_hash


def format_amount(amount):
    """
    Formats the amount to 2 decimal places
    """
    
    decimal = amount.replace(',', '.')

    return f"{float(decimal):.2f}"