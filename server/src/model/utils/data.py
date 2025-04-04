import pandas as pd
from preprocess import preprocess_data


def load_train_data(get_frame=False):
    """
    Loads train data
    """

    TRAIN_DATASET_PATHS = [
        'src/data/Trainset1.csv', 
        'src/data/Trainset2.csv'
    ]
    
    dfs = []
    for path in TRAIN_DATASET_PATHS:
        df = pd.read_csv(path, encoding='utf-8', sep=';')
        dfs.append(df)

    df = pd.concat(dfs, ignore_index=True)
    dl = preprocess_data(df)

    if get_frame: return df

    return dl


def load_test_data(get_frame=False):
    """
    Loads test data
    """

    TEST_DATASET_PATH = 'src/data/Testset1.csv'

    df = pd.read_csv(TEST_DATASET_PATH, encoding='utf-8', sep=';')
    dl = preprocess_data(df)

    if get_frame: return df

    return dl


def load_daywise_data(day):
    """
    Loads daywise data for passed in day
    Note that day is an integer from 1 to 16
    """

    assert day >= 1 and day <= 16, 'Day should be an integer between 1 and 16'

    DAYWISE_DATASET_PATHS = 'src/data/Daywise1.csv'

    df = pd.read_csv(DAYWISE_DATASET_PATHS, encoding='latin-1', sep=';', low_memory=False)
    df = df[df['Date'] == f"1/{14+day}/2025"]

    dl = preprocess_data(df)

    return dl

def load_low_risk_data(get_frame=False):
    """
    Loads low risk data
    """

    TRAIN_DATASET_PATH = 'src/data/low_risk_data_1.csv'

    df = pd.read_csv(TRAIN_DATASET_PATH, encoding='utf-8', sep=',', dtype=str)
    dl = preprocess_data(df)

    if get_frame: return df

    return dl

def load_medium_risk_data(get_frame=False):
    """
    Loads medium risk data
    """

    TRAIN_DATASET_PATH = 'src/data/medium_risk_data_1.csv'

    df = pd.read_csv(TRAIN_DATASET_PATH, encoding='utf-8', sep=',', dtype=str)
    dl = preprocess_data(df)

    if get_frame: return df

    return dl

def load_high_risk_data(get_frame=False):
    """
    Loads high risk data
    """

    TRAIN_DATASET_PATH = 'src/data/high_risk_data_1.csv'

    df = pd.read_csv(TRAIN_DATASET_PATH, encoding='utf-8', sep=',', dtype=str)
    dl = preprocess_data(df)

    if get_frame: return df

    return dl

def load_very_high_risk_data(get_frame=False):
    """
    Loads very high risk data
    """

    TRAIN_DATASET_PATH = 'src/data/very_high_risk_data_1.csv'

    df = pd.read_csv(TRAIN_DATASET_PATH, encoding='utf-8', sep=',', dtype=str)
    dl = preprocess_data(df)

    if get_frame: return df

    return dl

def load_risk_test_data_with_merchant():
    """
    Loads test data along with merchant name
    """

    TEST_DATASET_PATH = 'src/data/Testset2.csv'

    df = pd.read_csv(TEST_DATASET_PATH, encoding='latin-1', sep=',', dtype=str)

    print(df.iloc[0]['Merchant'])
    dl = preprocess_data(df, get_merchant=True)

    for T in dl:
        print(T)
        print(int_to_string(T[2]))
        return


    return dl


load_risk_test_data_with_merchant()


def int_to_string(n):
    """
    Convert an integer back to a string using base-256 decoding.
    """
    if not isinstance(n, int) or n < 0:
        return "UNKNOWN"
    result = []
    while n > 0:
        result.append(chr(n % 256))
        n //= 256
    return ''.join(reversed(result))