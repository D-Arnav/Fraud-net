import warnings

import os

import torch

from parser import parse_args
from utils import get_processed_data, evaluate
from models import NeuralNet




warnings.filterwarnings("ignore")

args = parse_args()

config = {
    'seed': args.seed,
    'data_path': args.data_path,
    'save_path': args.save_path,
    'vis_path': args.vis_path,
    'log_path': args.log_path,
    'split': args.split,
    'class_weight': args.class_weight,
    'save': False
}

X_test, y_test = get_processed_data(config)[2:]

model = NeuralNet(inputs=X_test.shape[1], outputs=2)
model.load_state_dict(torch.load(os.path.join(config['save_path'], 'model.pt')))

results = evaluate(X_test, y_test, model, config, log_text=True)