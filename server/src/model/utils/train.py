from datetime import datetime

import os

import torch
from torch.optim import Adam

from loss import FocalLoss




def train_model(model, dl):
    """
    Train the model
    """

    config = {
        'class_balance': 0.035,
        'focal_loss_gamma': 1.5,
        'learning_rate': 0.005,
        'epochs': 50,
        'print_every': 10,
        'save': True,
        'save_path': 'src/model/weights'
    }

    criterion = FocalLoss(alpha=config['class_balance'], gamma=config['focal_loss_gamma'], reduction='mean')

    optimizer = Adam(model.parameters(), lr=config['learning_rate'])

    for epoch in range(config['epochs']):

        model.train()
        for (X, y) in dl:
            optimizer.zero_grad()
            outputs = model(X)

            loss = criterion(outputs, y.long())
            loss.backward()
            optimizer.step()

        if epoch % config['print_every'] == 0:
            print(f'Epoch [{epoch+1}/{config['epochs']}], Loss: {loss.item()}')


    current_time = datetime.now().strftime('%Y%m%d_%H%M%S')

    if config['save']:
        torch.save(model.state_dict(), os.path.join(config['save_path'], f'model_1{current_time}.pt'))

    return model 
