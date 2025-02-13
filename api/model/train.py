import os

import numpy as np

from imblearn.under_sampling import TomekLinks

from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix
from sklearn.decomposition import PCA

import torch
import torch.nn as nn
import torch.nn.functional as F
import torch.optim as optim

from parser import parse_args
from utils import train, get_processed_data, evaluate


args = parse_args()

torch.manual_seed(args.seed)

config = {
    'seed': args.seed,
    'data_path': args.data_path,
    'save_path': args.save_path,
    'vis_path': args.vis_path,
    'log_path': args.log_path,
    'split': args.split,
    'class_weight': args.class_weight,
    'save': args.save
}

X_train, y_train, X_test, y_test = get_processed_data(config)

model = train(X_train, y_train, config)

results = evaluate(X_test, y_test, model, config, log_text=True)