import pandas as pd

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

    return df


def load_test_data():
    """
    Loads test data
    """

    TEST_DATASET_PATHS = [
        'server/src/data/Testset1.csv', 
    ]

    dfs = []
    for path in TEST_DATASET_PATHS:
        df = pd.read_csv(path, encoding='utf-8', sep=';')
        dfs.append(df)

    df = pd.concat(dfs, ignore_index=True)

    return df