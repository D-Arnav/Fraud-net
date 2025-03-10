import pandas as pd
from preprocess import preprocess_data

def load_train_data():
    """
    Loads train data
    """

    TRAIN_DATASET_PATHS = [
        'server/src/data/Trainset1.csv', 
        'server/src/data/Trainset2.csv'
    ]
    
    dfs = []
    for path in TRAIN_DATASET_PATHS:
        df = pd.read_csv(path, encoding='utf-8', sep=';')
        dfs.append(df)

    df = pd.concat(dfs, ignore_index=True)
    dl = preprocess_data(df)

    return dl


def load_test_data():
    """
    Loads test data
    """

    TEST_DATASET_PATH = 'server/src/data/Testset1.csv'

    df = pd.read_csv(TEST_DATASET_PATH, encoding='utf-8', sep=';')
    dl = preprocess_data(df)

    return dl


def load_daywise_data(day):
    """
    Loads daywise data for passed in day
    Note that day is an integer from 1 to 16
    """

    assert day >= 1 and day <= 16, 'Day should be an integer between 1 and 16'

    DAYWISE_DATASET_PATHS = 'server/src/data/Daywise1.csv'

    df = pd.read_csv(DAYWISE_DATASET_PATHS, encoding='latin-1', sep=';')
    df = df[df['Date'] == f"1/{14+day}/2025"]

    dl = preprocess_data(df)

    return dl