import os

import numpy as np

from imblearn.under_sampling import TomekLinks

from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix
from sklearn.decomposition import PCA

import torch
import torch.nn as nn
import torch.nn.functional as F
import torch.optim as optim

from parser import parse_args
from utils import train, get_processed_data


args = parse_args()

config = {
    'seed': args.seed,
    'data_path': args.data_path,
    'save_path': args.save_path,
    'vis_path': args.vis_path,
    'split': args.split,
    'class_weight': args.class_weight,
    'save': False
}


X, y = get_processed_data(config)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=config['seed'])
X_train, y_train = TomekLinks().fit_resample(X_train, y_train)
X_train, y_train = torch.tensor(X_train), torch.tensor(y_train)

model = train(X_train, y_train, config)

results = eval(X_test, y_test, config)

model.eval()
with torch.no_grad():
    y_pred = model(X_test).argmax(dim=1).numpy()



accuracy = accuracy_score(y_test, y_pred)
precision = precision_score(y_test, y_pred)
recall = recall_score(y_test, y_pred)
f1 = f1_score(y_test, y_pred)
conf_matrix = confusion_matrix(y_test, y_pred)

tn, fp, fn, tp = conf_matrix.ravel()
fpr = fp / (fp + tn)
fnr = fn / (fn + tp)

print(f'Class Weight {config['class_weight']}')
print(f'Accuracy: {accuracy*100:.4f}%')
print(f'Precision: {precision*100:.4f}%')
print(f'Recall: {recall*100:.4f}%')
print(f'F1 Score: {f1*100:.4f}%')
print(f'Confusion Matrix\n')
print(f'{np.array([[tp, fn], [fp, tn]])}')


with open('api/model/log.txt', 'a') as f:
    out = f"CW {config['class_weight']}\nPrec {precision*100:.2f}% & Rec {recall*100:.2f}%\n{conf_matrix} | FPR ({fpr*100:.2f}%) & FNR ({fnr*100:.2f}%)\n"
    f.write(out)