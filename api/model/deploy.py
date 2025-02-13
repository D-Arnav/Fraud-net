import torch
import torch.nn as nn

from parser import parse_args
from models import NeuralNet




args = parse_args()

config = {
    'seed': args.seed,
    'data_path': args.data_path,
    'save_path': args.save_path,
    'vis_path': args.vis_path,
    'split': args.split,
    'class_weight': args.class_weight,
}
        

def predict_fraud(X_batch, y_batch):

    model = NeuralNet(inputs=X_batch.shape[1], outputs=2)

    model.eval()
    with torch.no_grad():
        y_pred = model(X_batch).argmax(dim=1).numpy()

    return 

