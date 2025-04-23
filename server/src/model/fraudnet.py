from abc import ABC

import torch

from model.transaction import NewTransactionLoader

from datetime import datetime

import pandas as pd

import os
from sklearn.manifold import TSNE
import numpy as np
from tqdm import tqdm


class NeuralNet_1_01(torch.nn.Module):

    def __init__(self, inputs, outputs):
        super(NeuralNet_1_01, self).__init__()

        self.fc1 = torch.nn.Linear(inputs, 64)
        self.fc2 = torch.nn.Linear(64, 32)
        self.drop = torch.nn.Dropout(p=0.5)
        self.fc3 = torch.nn.Linear(32, 32)
        self.fc4 = torch.nn.Linear(32, outputs)

    def forward(self, x):
        x = torch.relu(self.fc1(x))
        x = torch.relu(self.fc2(x))
        x = self.drop(x)
        x = torch.relu(self.fc3(x))
        x = self.fc4(x)

        return x
    

class FraudNet(ABC):

    def __init__(self, model_name: str, model_version: str, model_description: str = None):
        self.model_name = model_name
        self.model_version = model_version
        self.model_description = model_description


class FraudNet_FN_1_01(FraudNet):

    def __init__(self, model_name: str, model_version: str, model_description: str = None, in_size=107, class_balance=0.03):
        super().__init__(model_name, model_version, model_description)

        self.in_size = in_size
        self.out_size = 2
        self.class_balance = class_balance
        self.focal_gamma = 1.5
        self.learning_rate = 0.005
        self.epochs = 25
        self.save = True
        self.cuda = False
        self.save_path = 'src/weights'

        self.model = NeuralNet_1_01(inputs=self.in_size, outputs=self.out_size)
        self.criterion = torch.nn.CrossEntropyLoss(weight=torch.tensor([self.class_balance, 1-self.class_balance]))
        self.optimizer = torch.optim.Adam(self.model.parameters(), lr=self.learning_rate)

    def evaluate(self, tl):
        self.model.eval()

        confmat = {'TP': 0, 'TN': 0, 'FP': 0, 'FN': 0}
        with torch.no_grad():
            for (X, y, _) in tl.loader:
                y_hat, _ = self.predict(X)
                confmat = self.update_confmat(confmat, y_hat, y)
      
        return confmat
    
    def update_confmat(self, confmat, y_hat, y):
        for true, pred in zip(y.cpu().numpy(), y_hat):
            if true == 1 and pred == 1: confmat['TP'] += 1
            elif true == 0 and pred == 0: confmat['TN'] += 1
            elif true == 0 and pred == 1: confmat['FP'] += 1
            elif true == 1 and pred == 0: confmat['FN'] += 1
        
        return confmat

    def predict(self, X):
        if self.cuda: X = X.cuda()

        if len(X.shape) == 1: X = X.unsqueeze(0)

        y_out = self.model(X)
        y_hat = torch.argmax(y_out, dim=1).detach().cpu().numpy()
        p_fraud = float(torch.nn.functional.softmax(y_out, dim=1).detach().cpu().numpy()[0, 1])

        return y_hat, p_fraud

    def train(self, tl):
        self.model.train()
        loss = 0.0
        for epoch in range(self.epochs):
            for (X, y, _) in tl.loader:
                loss += self.fit_one(X, y)
            loss /= len(tl.loader)
    
            print(f'Epoch ({epoch+1}/{self.epochs}) - Loss: {loss:.6f}')
        
        if self.save:
            timestamp = datetime.now().strftime("%m%d%H%M%S")
            torch.save(self.model.state_dict(), f"{self.save_path}/{self.model_name}_{self.model_version}_{timestamp}.pt")

    def fit_one(self, X, y):
        if self.cuda: X, y = X.cuda(), y.cuda()

        y_hat = self.model(X)
        loss = self.criterion(y_hat, y.long())
        self.optimizer.zero_grad()
        loss.backward()
        self.optimizer.step()

        return loss.item()

    def tsne(self, tl):
        import matplotlib.pyplot as plt

        self.model.eval()
        embeddings = []
        labels = []

        with torch.no_grad():
            for (X, y, _) in tqdm(tl.loader, desc="Generating t-SNE Embeddings"):
                if self.cuda: X = X.cuda()
                embeddings.append(self.model.fc3(self.model.fc2(self.model.fc1(X))).cpu().numpy())
                labels.append(y.cpu().numpy())
                break # 1 Batch is enough!

        embeddings = np.concatenate(embeddings, axis=0)
        labels = np.concatenate(labels, axis=0)

        tsne = TSNE(n_components=2, random_state=42)
        reduced_embeddings = tsne.fit_transform(embeddings)

        plt.figure(figsize=(10, 8))
        sorted_indices = np.argsort(labels)
        reduced_embeddings = reduced_embeddings[sorted_indices]
        labels = labels[sorted_indices]

        fraud_indices = labels == 1
        legitimate_indices = labels == 0

        plt.scatter(reduced_embeddings[legitimate_indices, 0], reduced_embeddings[legitimate_indices, 1], 
            c='black', label='Legitimate', alpha=0.7)
        plt.scatter(reduced_embeddings[fraud_indices, 0], reduced_embeddings[fraud_indices, 1], 
            c='red', label='Fraud', alpha=0.9, marker='x', s=50)

        plt.legend()
        plt.title('t-SNE Visualization of Embeddings')
        plt.xlabel('t-SNE Dimension 1')
        plt.ylabel('t-SNE Dimension 2')

        os.makedirs('src/results', exist_ok=True)
        plt.savefig('src/results/tsne_visualization.png')
        plt.close()

    def get_results(self, confmat, print_results=True):
        
        tp, fp, fn, tn = confmat['TP'], confmat['FP'], confmat['FN'], confmat['TN']

        precision = tp / (tp + fp + 1e-10)
        recall = tp / (tp + fn + 1e-10)
        false_positive_rate = fp / (fp + tn + 1e-10)
        false_negative_rate = fn / (fn + tp + 1e-10)
        accuracy = (tp + tn) / (tp + tn + fp + fn + 1e-10)
        f1_score = 2 * (precision * recall) / (precision + recall + 1e-10)

        results_print = "\n" + \
        f"               Predicted        Precision           : {precision*100:.2f}%\n" + \
        f"              (F)     (L)       Recall              : {recall*100:.2f}%\n" + \
        f"           -----------------    F1 Score            : {f1_score*100:.2f}%\n" + \
        f"Actual (F) | {tp:5} | {fn:5} |    False Positive Rate : {false_positive_rate*100:.2f}%\n" + \
        f"       (L) | {fp:5} | {tn:5} |    False Negative Rate : {false_negative_rate*100:.2f}%\n" + \
        f"           -----------------    Accuracy            : {accuracy*100:.2f}%\n"

        if print_results: print(results_print)

    def load(self, path):
        self.model.load_state_dict(torch.load(path))

    
class FraudNet_FN_2_01(FraudNet_FN_1_01):
    def __init__(self, model_name, model_version, model_description = None):
        super().__init__(model_name, model_version, model_description, in_size=157, class_balance=0.075)


if __name__ == '__main__':

    model = FraudNet_FN_2_01(
        model_name="Fraudnet",
        model_version="2.01",
        model_description="Using More columns!"
    )

    # train_data_path = 'src/data/train_data.csv'
    # tl = NewTransactionLoader(train_data_path)
    # tl.create_loader()
    # model.train(tl)

    path = "src/weights/Fraudnet_2.01_0417130824.pt"
    model.load(path)

    test_data_path = 'src/data/test_data.csv'

    tl = NewTransactionLoader(test_data_path)
    tl.create_loader()

    model.tsne(tl)

    # cm = model.evaluate(tl)

    # model.get_results(confmat=cm)
