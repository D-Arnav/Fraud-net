from datetime import datetime

import os

import torch
from torch.optim import Adam

from loss import FocalLoss




def train_model(model, dl, config={}):
    """
    Train the model
    """

    config_ = {
        'class_balance': 0.035,
        'focal_loss_gamma': 1.5,
        'learning_rate': 0.005,
        'epochs': 50,
        'print_every': 10,
        'save': True,
        'save_path': 'src/model/weights'
    }

    for k, v in config.items():
        config_[k] = v

    criterion = FocalLoss(alpha=config_['class_balance'], gamma=config_['focal_loss_gamma'], reduction='mean')

    optimizer = Adam(model.parameters(), lr=config_['learning_rate'])

    if torch.cuda.is_available(): model = model.cuda()

    for epoch in range(config_['epochs']):

        model.train()
        for (X, y) in dl:
            if torch.cuda.is_available(): X, y = X.cuda(), y.cuda()
            
            optimizer.zero_grad()
            outputs = model(X)

            loss = criterion(outputs, y.long())
            loss.backward()
            optimizer.step()

        if epoch % config_['print_every'] == 0:
            print(f'Epoch [{epoch+1}/{config_['epochs']}], Loss: {loss.item()}')

    current_time = datetime.now().strftime('%Y%m%d_%H%M%S')

    if config_['save']:
        torch.save(model.state_dict(), os.path.join(config_['save_path'], f'model_1{current_time}.pt'))

    return model
