import torch
from sklearn.metrics import confusion_matrix
import numpy as np

from utils import create_router_dict, assess_merchant_risk_category


def evaluate_dl(model, dl):
    """
    Evaluate the model and return the confusion matrix
    """
    model.eval()
    
    all_preds = []
    all_labels = []

    with torch.no_grad():
        for X, y in dl:
            if torch.cuda.is_available():
                X, y = X.cuda(), y.cuda()
            outputs = model(X)
            _, predicted = torch.max(outputs, 1)

            all_preds.extend(predicted.cpu().numpy())
            all_labels.extend(y.cpu().numpy())

    cm = confusion_matrix(all_labels, all_preds)

    tp, fp, fn, tn = cm[1][1].item(), cm[0][1].item(), cm[1][0].item(), cm[0][0].item()

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

    print(results_print)

    results = {
        'precision': precision,
        'recall': recall,
        'f1_score': f1_score,
        'false_positive_rate': false_positive_rate,
        'false_negative_rate': false_negative_rate,
        'accuracy': accuracy,
        'num_legitimate': tp + fn,
        'num_fraudulent': fp + tn,
        'true_positives': tp,
        'false_positives': fp,
        'true_negatives': tn,
        'false_negatives': fn
    }
    
    return results


def evaluate_single(model, single_transaction):
    
    model.eval()

    if torch.cuda.is_available():
        single_transaction = single_transaction.cuda()

    with torch.no_grad():
        output = model(single_transaction)
        output = torch.nn.functional.softmax(output, dim=0)

    results = {
        'predicted': 'Fraudulent' if output.argmax() == 1 else 'Legitimate',
        'actual': 'Fraudulent' if single_transaction[1] == 1 else 'Legitimate',
        'confidence': f"{output.max().item()*100:.1f}%"
    }    

    print(results)

    return results


def evaluate_moe_model(models, dl):

    router_dict = create_router_dict()

    with torch.no_grad():
        for X, y in dl:
            if torch.cuda.is_available():
                X, y = X.cuda(), y.cuda()
            outputs = torch.stack([model(X) for model in models])
            output = outputs.mean(dim=0)
            _, predicted = torch.max(output, 1)

            for i in range(len(X)):
                merchant = X[i][0]
                risk_category = assess_merchant_risk_category(router_dict, merchant)
                print(f"Merchant: {merchant}, Risk Category: {risk_category}, Predicted: {predicted[i].item()}")