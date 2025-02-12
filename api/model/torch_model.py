from imblearn.combine import SMOTETomek
from imblearn.under_sampling import TomekLinks

from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix
from sklearn.decomposition import PCA

import torch
import torch.nn as nn
import torch.nn.functional as F
import torch.optim as optim

from parser import parse_args
from utils import get_processed_data




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
        

args = parse_args()

config = {
    'seed': args.seed,
    'data_path': args.data_path,
    'save_path': args.save_path,
    'vis_path': args.vis_path,
    'split': args.split,
    'class_weight': args.class_weight,
}

X, y = get_processed_data(config)

# pca = PCA(n_components=10, random_state=config['seed'])
# X = torch.tensor(pca.fit_transform(X)).float()


X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=config['seed'])

X_train, y_train = TomekLinks().fit_resample(X_train, y_train)

X_train, y_train = torch.tensor(X_train), torch.tensor(y_train)

model = NeuralNet(inputs=X_train.shape[1], outputs=2)

criterion = nn.CrossEntropyLoss(weight=torch.tensor([config['class_weight'], 1-config['class_weight']], dtype=torch.float32))

optimizer = optim.Adam(model.parameters(), lr=0.01)

epochs = 100
for epoch in range(epochs):
    model.train()
    optimizer.zero_grad()
    outputs = model(X_train)
    loss = criterion(outputs, y_train)
    loss.backward()
    optimizer.step()

    # if epoch % 10 == 0:
    #     print(f'Epoch [{epoch+1}/{epochs}], Loss: {loss.item()}')

model.eval()
with torch.no_grad():
    y_pred = model(X_test).argmax(dim=1).numpy()

accuracy = accuracy_score(y_test, y_pred)
precision = precision_score(y_test, y_pred)
recall = recall_score(y_test, y_pred)
f1 = f1_score(y_test, y_pred)
conf_matrix = confusion_matrix(y_test, y_pred)


print(f'Class Weight {config['class_weight']}')
print(f'Accuracy: {accuracy*100:.4f}%')
print(f'Precision: {precision*100:.4f}%')
print(f'Recall: {recall*100:.4f}%')
print(f'F1 Score: {f1*100:.4f}%')
print(f'Confusion Matrix\n {conf_matrix}')

with open('api/model/logs/log.txt', 'a') as f:
    out = f"CW {config['class_weight']}\nPrec {precision*100:.2f}% & Rec {recall*100:.2f}%\n{conf_matrix}\n"
    f.write(out)