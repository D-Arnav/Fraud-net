import torch
import torch.nn as nn

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
    
