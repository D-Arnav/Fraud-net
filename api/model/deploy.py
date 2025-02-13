import torch
import torch.nn as nn

from parser import parse_args




args = parse_args()

config = {
    'seed': args.seed,
    'data_path': args.data_path,
    'save_path': args.save_path,
    'vis_path': args.vis_path,
    'split': args.split,
    'class_weight': args.class_weight,
}

class NeuralNet(nn.Module):
    def __init__(self, inputs, outputs):
        super(NeuralNet, self).__init__()
        self.fc1 = nn.Linear(inputs, 64)
        self.fc2 = nn.Linear(64, 32)
        self.drop = nn.Dropout(p=0.5)
        self.fc3 = nn.Linear(32, 32)
        self.fc4 = nn.Linear(32, outputs)

    def forward(self, x):
        x = torch.relu(self.fc1(x))
        x = torch.relu(self.fc2(x))
        x = self.drop(x)
        x = torch.relu(self.fc3(x))
        x = self.fc4(x)
        return x
        

def predict_fraud(X_batch, y_batch):

    model = NeuralNet(inputs=X_batch.shape[1], outputs=2)

    model.eval()
    with torch.no_grad():
        y_pred = model(X_batch).argmax(dim=1).numpy()

