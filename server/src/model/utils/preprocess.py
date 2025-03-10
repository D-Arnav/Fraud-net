import pandas as pd
import polars as pl

from data import load_train_data, load_test_data


def preprocess_data(df):
    """
    Preprocess the data for model training / inference
    """


    metadata = pd.read_json('server/src/data/metadata.json') 
    transform = metadata['transform'] # Load the transformation metadata

    # Drop and rename columns
    df = df.drop(columns=transform['drop_columns'])
    df = df.rename(columns=transform['rename_columns'])

    # Convert Amount and Fraud to the correct data types
    df['AMOUNT'] = df['AMOUNT'].str.replace(',', '.').astype(float)
    df['FRAUD'] = df['FRAUD'].infer_objects(copy=False).fillna(0).astype(int)

    # Convert Categorial columns to one-hot encodings
    for col in transform['encodings']:
        df[col] = df[col].replace(transform['encodings'][col])
        df[col] = df[col].apply(
            lambda x: x if x in transform['encodings'][col].values() else "UNKNOWN"
        )
        all_categories = list(set(transform['encodings'][col].values())) + ["UNKNOWN"]
        df[col] = pd.Categorical(df[col], categories=all_categories)

    df = pd.get_dummies(df, columns=transform['encodings'].keys())
    
    # Set the correct order of columns
    df = df[transform['order']]

    return df

if __name__ == '__main__':
    train_df = load_train_data()
    test_df = load_test_data()
    preprocess_data(test_df)