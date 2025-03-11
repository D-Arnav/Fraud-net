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

    tp, fp, fn, tn = cm[1][1].item(), cm[0][1].item(), cm[1][0].item(), cm[0][0].item()

    precision = tp / (tp + fp)
    recall = tp / (tp + fn)
    false_positive_rate = fp / (fp + tn)
    false_negative_rate = fn / (fn + tp)
    accuracy = (tp + tn) / (tp + tn + fp + fn)
    f1_score = 2 * (precision * recall) / (precision + recall + 1e-10)

    results_print = "\n" + \
    f"               Predicted        Precision           : {precision:.2f}\n" + \
    f"              (F)     (L)       Recall              : {recall:.2f} \n" + \
    f"           -----------------    F1 Score            : {f1_score:.2f}\n" + \
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
