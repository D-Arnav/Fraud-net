import numpy as np

import pandas as pd

from parser import parse_args

from sklearn.model_selection import train_test_split, StratifiedKFold
from sklearn.decomposition import PCA

from utils import preprocess, vis_tree, get_model, resample, evaluate




args = parse_args()

config = {
    'seed': args.seed,
    'data_path': args.data_path,
    'save_path': args.save_path,
    'vis_path': args.vis_path,
    'split': args.split,
    'model': args.model,
    'depth': args.tree_depth,
    'class_weight': args.class_weight,
    'class_balance_method': args.class_balance_method,
    'pca_dim': args.pca_dim,
    'k_folds': args.k_folds
}

# Load Data

df = pd.read_csv(config['data_path'], sep=';')
df = preprocess(df)

# Train Model

X = df.drop('FRAUD', axis=1)
y = df['FRAUD']

if config['pca_dim'] != 0:
    pca = PCA(n_components=config['pca_dim'], random_state=config['seed'])
    X = pca.fit_transform(X)


kf = StratifiedKFold(n_splits=config['k_folds'], shuffle=True, random_state=config['seed'])

avg_acc, avg_prec, avg_rec, avg_f1 = 0, 0, 0, 0

for train_index, test_index in kf.split(X, y):
    
    X_train, X_test = X.iloc[train_index], X.iloc[test_index]
    y_train, y_test = y.iloc[train_index], y.iloc[test_index]

    X_train, y_train = resample(X_train, y_train, config)

    model = get_model(config)
    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)
    accuracy, precision, recall, f1, conf_matrix = evaluate(y_test, y_pred, verbose=False)

    avg_acc += accuracy
    avg_prec += precision
    avg_rec += recall
    avg_f1 += f1

avg_acc /= config['k_folds']
avg_prec /= config['k_folds']
avg_rec /= config['k_folds']
avg_f1 /= config['k_folds']


print(f"Average Metrics\n"
      f"Accuracy: {avg_acc*100:.1f}%\n"
      f"Precision: {avg_prec*100:.2f}%\n"
      f"Recall: {avg_rec*100:.2f}%\n"
      f"F1 Score: {avg_f1:.2f}\n\n")
       

if config['model'] in ['decision_tree', 'random_forest']:
    vis_tree(model, config)
