import json

import pandas as pd

import torch

from datetime import datetime

import re

from tqdm import tqdm





class NewTransactionLoader:
    """
    Optimizations

    - PaymentHour made into local time (currently UTC) and DuringDay and DuringNight Columns Made
    - Country, CurrencyCode match column

    """


    def __init__(self, data_path, tranform_path='src/data/transform2.json', risk_mapping_path='src/data/risk_mapping.csv'):

        self.data_frame = pd.read_csv(
            data_path, 
            encoding='utf-8', 
            low_memory=False,
            dtype=str,
            sep=','
        )
        self.data_frame.set_index('PaymentID', inplace=True)

        with open(tranform_path, 'r') as file:
            self.transform = json.load(file)

        risk_mapping_df = pd.read_csv(risk_mapping_path, encoding='latin-1', dtype=str)
        self.risk_mapping = dict(zip(risk_mapping_df['Merchant'], risk_mapping_df['Category']))


    def create_loader(self):

        data_frame = self.data_frame.reset_index().copy()

        data_frame.drop(
            columns=["Date", "BIN#", "SourceUserID", "Payment Currency Code"],
            inplace=True
        )

        data_frame['Settled Base Amt'] = data_frame['Settled Base Amt'].apply(lambda x: float(x.replace(';', '.')))
        data_frame['FN Qty'] = data_frame['FN Qty'].apply(lambda x: 1 if pd.notna(x) else 0)
        data_frame['PaymentHour'] = data_frame['PaymentHour'].astype(int)
        data_frame['RiskCategory'] = data_frame['RiskCategory'].astype(int)
        data_frame['RiskType'] = data_frame['Merchant'].map(self.risk_mapping).fillna('Unknown')

        new_columns = {}
        for key, values in tqdm(self.transform['categories'].items(), desc="Encoding Columns"):
            value_map = {re.sub(r'\W+', '', value).lower(): value for value in values}
            column_data = data_frame[key].str.replace(r'\W+', '', regex=True).str.lower()
            
            for value_cleaned, original_value in value_map.items():
                column_name = f"{key}__{value_cleaned}"
                new_columns[column_name] = (column_data == value_cleaned).astype(int)
                
                unknown_column_name = f"{key}__unknown"
                new_columns[unknown_column_name] = (~column_data.isin(value_map.keys())).astype(int)
        
        data_frame = pd.concat([data_frame, pd.DataFrame(new_columns)], axis=1)
        data_frame.drop(columns=self.transform['categories'].keys(), inplace=True)

        ordered_columns = []
        for key, values in self.transform['categories'].items():
            for value in values:
                value_cleaned = re.sub(r'\W+', '', value).lower()
                ordered_columns.append(f"{key}__{value_cleaned}")
            ordered_columns.append(f"{key}__unknown")

        data_frame = data_frame[ordered_columns + [col for col in data_frame.columns if col not in ordered_columns]]
        
        X = data_frame.drop(columns=['FN Qty', 'PaymentID']).astype('float32').values
        y = data_frame['FN Qty'].astype('float32').values
        i = data_frame['PaymentID'].astype('int32').values

        X = torch.tensor(X, dtype=torch.float32)
        y = torch.tensor(y, dtype=torch.float32)
        i = torch.tensor(i, dtype=torch.int32)

        dataset = torch.utils.data.TensorDataset(X, y, i)
        data_loader = torch.utils.data.DataLoader(
            dataset, 
            batch_size=10000,
            num_workers=4,
            shuffle=True
        )

        self.loader = data_loader

        return data_loader

    def get_row(self, payment_id):
        try:
            return self.data_frame.loc[str(payment_id)].to_dict()
        except KeyError:
            return None


class TransactionHandler:

    def __init__(self, data_path, index, tranform_path='src/data/transform2.json', risk_mapping_path='src/data/risk_mapping.csv'):
        
        self.data_frame = pd.read_csv(
            data_path, 
            encoding='utf-8', 
            low_memory=False,
            dtype=str,
            sep=','
        )

        with open(tranform_path, 'r') as file:
            self.transform = json.load(file)

        risk_mapping_df = pd.read_csv(risk_mapping_path, encoding='latin-1', dtype=str)
        self.risk_mapping = dict(zip(risk_mapping_df['Merchant'], risk_mapping_df['Category']))
        self.data_frame['RiskType'] = self.data_frame['Merchant'].map(self.risk_mapping).fillna('Unknown')
        self.transaction = self.data_frame.iloc[index]


    def get_feature(self):

        transaction = self.transaction.copy()

        drop_cols = ["Date", "BIN#", "SourceUserID", "Payment Currency Code"]
        for col in drop_cols:
            if col in transaction:
                transaction = transaction.drop(col)

        transaction['Settled Base Amt'] = float(transaction['Settled Base Amt'].replace(';', '.'))
        transaction['FN Qty'] = 1 if pd.notna(transaction['FN Qty']) else 0
        transaction['PaymentHour'] = int(transaction['PaymentHour'])
        transaction['RiskCategory'] = int(transaction['RiskCategory'])

        new_columns = {}
        for key, values in self.transform['categories'].items():
            value_map = {re.sub(r'\W+', '', value).lower(): value for value in values}
            value_cleaned = re.sub(r'\W+', '', str(transaction[key])).lower() if key in transaction else ''
            for v_cleaned in value_map.keys():
                col_name = f"{key}__{v_cleaned}"
                new_columns[col_name] = int(value_cleaned == v_cleaned)
            unknown_col_name = f"{key}__unknown"
            new_columns[unknown_col_name] = int(value_cleaned not in value_map.keys())

        ordered_columns = []
        for key, values in self.transform['categories'].items():
            for value in values:
                value_cleaned = re.sub(r'\W+', '', value).lower()
                ordered_columns.append(f"{key}__{value_cleaned}")
            ordered_columns.append(f"{key}__unknown")

        feature_row = []
        for col in ordered_columns:
            feature_row.append(new_columns.get(col, 0))
        exclude_cols = set(['FN Qty', 'PaymentID'] + list(self.transform['categories'].keys()))
        for col in transaction.index:
            if col not in exclude_cols:
                feature_row.append(float(transaction[col]) if isinstance(transaction[col], (int, float, str)) and str(transaction[col]).replace('.', '', 1).isdigit() else 0.0)

        X = torch.tensor([feature_row], dtype=torch.float32)

        return X


class TransactionLoader:
    
    def __init__(self):
        pass

    
    def create_from_paths(self, data_path, transform_path, sep=';'):

        self.data_frame = pd.read_csv(
            data_path, 
            encoding='utf-8', 
            low_memory=False,
            dtype=str,
            sep=sep
        )

        with open(transform_path, 'r') as file:
            self.transform = json.load(file)

        self._rename_columns()
        self.dict = self._create_dict()
        self.loader = self._create_loader()
    

    def get_column(self, transaction_id):

        column =  self.dict.get(transaction_id, None)

        if column is None:
            raise ValueError(f"Transaction ID {transaction_id} not found in the dataloader.")

        return column
    

    def _rename_columns(self):

        rename_columns = self.transform['rename_columns']
        self.data_frame.rename(columns=rename_columns, inplace=True)


    def _create_dict(self):

        data_dict = {}
        for _, row in self.data_frame.iterrows():
            payment_id = row['PAYMENT_ID']  
            data_dict[payment_id] = row.to_dict()
        
        return data_dict
    
    
    def _create_loader(self):

        drop_columns = self.transform['drop_columns']
        categorical_columns = self.transform['onehot_mappings']
        column_order = self.transform['column_order']

        data_frame = self.data_frame.copy()

        if 'Risk. Class' in data_frame.columns:
            drop_columns.append('Risk. Class')

        data_frame.drop(columns=drop_columns, inplace=True)

        data_frame['AMOUNT'] = data_frame['AMOUNT'].apply(self._convert_to_float)
        data_frame['FRAUD'] = data_frame['FRAUD'].apply(self._convert_to_0_1)

        for column in categorical_columns.keys():
            data_frame[column] = self._convert_to_onehot(data_frame[column])
        
        data_frame = pd.get_dummies(data_frame, columns=categorical_columns.keys())

        data_frame = data_frame[column_order]

        X = data_frame.drop(columns=['FRAUD', 'PAYMENT_ID']).astype('float32').values
        y = data_frame['FRAUD'].astype('float32').values
        i = data_frame['PAYMENT_ID'].astype('int32').values

        X = torch.tensor(X, dtype=torch.float32)
        y = torch.tensor(y, dtype=torch.float32)
        i = torch.tensor(i, dtype=torch.int32)

        dataset = torch.utils.data.TensorDataset(X, y, i)
        data_loader = torch.utils.data.DataLoader(
            dataset, 
            batch_size=10000,
            num_workers=4,
            shuffle=True
        )

        return data_loader


    def _convert_to_float(self, item):
        """
        Convert the 'AMOUNT' column to float.
        """

        if ',' in item:
            item = item.replace(',', '.')

        try:
            return float(item)
        except ValueError:
            raise ValueError(f"Cannot convert item '{item}' to float.")
        
    
    def _convert_to_0_1(self, item):
        """
        Convert the 'FRAUD' column to 0 or 1.
        """

        return 1 if pd.notna(item) else 0
    

    def _convert_to_onehot(self, column):
        """
        Convery categorical columns to one-hot encoding.
        This is done using a static mapping present in self.transform['onehot_mappings'].
        """

        mappings = self.transform['onehot_mappings']

        column = column.apply(
            lambda x: mappings[column.name][x] if x in mappings[column.name].keys() else 'UNKNOWN'
        )

        all_values = list(set(mappings[column.name].values())) + ['UNKNOWN']

        column = pd.Categorical(column, categories=all_values)

        return column


if __name__ == "__main__":

    data_path = 'src/data/train_data.csv'

    tl = NewTransactionLoader(data_path)
    tl.create_loader()

    print(tl.get_row(1912460838))