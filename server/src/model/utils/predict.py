import torch


def predict(X, model):
    
    model.evaluate()

    with torch.no_grad():
        y_hat = model(X).argmax(1).numpy()

    return y_hat