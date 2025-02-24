import warnings

import os

import torch

from model.parser import parse_args
from model.utils import get_processed_data, evaluate_single
from model.models import NeuralNet




warnings.filterwarnings("ignore")

args = parse_args()

config = {
    'seed': args.seed,
    'data_path': 'data/batch.csv',
    'save_path': 'model/weights/',
    'vis_path': args.vis_path,
    'log_path': args.log_path,
    'split': args.split,
    'class_weight': args.class_weight,
    'save': False
}

X, y = get_processed_data(config, split=False, tomek=False)[:2]

model = NeuralNet(inputs=X.shape[1], outputs=2)

model.load_state_dict(torch.load(os.path.join(config['save_path'], 'model.pt')))

results = evaluate_single(X, y, model)

# TODO: Create a new funciton that return TID, Actual, Predicted, Confidence.