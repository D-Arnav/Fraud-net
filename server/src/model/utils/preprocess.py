import pandas as pd
import torch
from torch.utils.data import DataLoader, TensorDataset



def preprocess_data(df):
    """
    Preprocess the data for model training / inference
    """

    config = {
        'batch_size': 20480
    }

    METADATA_PATH = 'src/data/metadata.json'

    metadata = pd.read_json(METADATA_PATH) 
    transform = metadata['transform'] # Load the transformation metadata

    # Drop and rename columns
    df = df.drop(columns=transform['drop_columns'])
    df = df.rename(columns=transform['rename_columns'])

    # Convert Amount and Fraud to the correct data types, ensure Fraud is either 0
    df['AMOUNT'] = df['AMOUNT'].str.replace(',', '.').astype(float)
    df['FRAUD'] = df['FRAUD'].apply(lambda x: 1 if pd.notna(x) else 0)

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

    X = df.drop(columns=['FRAUD']).values
    y = df['FRAUD'].values

    X = torch.tensor(X.astype(float)).float()
    y = torch.tensor(y.astype(float)).float()

    dataset = TensorDataset(X, y)
    dl = DataLoader(dataset, batch_size=config['batch_size'], shuffle=True)

    return dl