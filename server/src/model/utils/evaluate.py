import torch
from sklearn.metrics import confusion_matrix
import numpy as np




def evaluate_dl(model, dl):
    """
    Evaluate the model and return the confusion matrix
    """
    model.eval()
    
    all_preds = []
    all_labels = []

    with torch.no_grad():
        for X, y in dl:
            outputs = model(X)
            _, predicted = torch.max(outputs, 1)

            all_preds.extend(predicted.cpu().numpy())
            all_labels.extend(y.cpu().numpy())

    cm = confusion_matrix(all_labels, all_preds)

    tp, fp, fn, tn = cm[1][1], cm[0][1], cm[1][0], cm[0][0]

    prec = tp / (tp + fp)
    recall = tp / (tp + fn)
    fpr = fp / (fp + tn)
    fnr = fn / (fn + tp)
    acc = (tp + tn) / (tp + tn + fp + fn)
    f1 = 2 * (prec * recall) / (prec + recall)

    results_print = "\n" + \
    f"               Predicted        Precision           : {prec:.2f}\n" + \
    f"              (F)     (L)       Recall              : {recall:.2f} \n" + \
    f"           -----------------    F1 Score            : {f1:.2f}\n" + \
    f"Actual (F) | {tp:5} | {fn:5} |    False Positive Rate : {fpr*100:.2f}%\n" + \
    f"       (L) | {fp:5} | {tn:5} |    False Negative Rate : {fnr*100:.2f}%\n" + \
    f"           -----------------    Accuracy            : {acc*100:.2f}%\n"

    print(results_print)

    results = {
        'precision': prec,
        'recall': recall,
        'f1_score': f1,
        'fpr': fpr,
        'fnr': fnr,
        'accuracy': acc,
        'num_legit': tp + fn,
        'num_fraud': fp + tn
    }
    
    return results


def evaluate_single(model, single_transaction):
    
    model.eval()

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
