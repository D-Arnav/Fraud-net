from data import load_train_data, load_test_data
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import confusion_matrix
from imblearn.over_sampling import SMOTE
from imblearn.under_sampling import TomekLinks
from imblearn.combine import SMOTETomek
import warnings
warnings.filterwarnings("ignore")

def train(model_type, tomek=False, smote=False, class_balance=False):
    train_dl = load_train_data()
    test_dl = load_test_data()

    X_train = train_dl.dataset.tensors[0].numpy()
    y_train = train_dl.dataset.tensors[1].numpy()

    if smote and tomek:
        smote_tomek = SMOTETomek()
        X_train_resampled, y_train_resampled = smote_tomek.fit_resample(X_train, y_train)
    elif smote:
        smote = SMOTE(sampling_strategy=0.1)
        X_train_resampled, y_train_resampled = smote.fit_resample(X_train, y_train)
    elif tomek:
        tomek = TomekLinks()
        X_train_resampled, y_train_resampled = tomek.fit_resample(X_train, y_train)
    else:
        X_train_resampled, y_train_resampled = X_train, y_train

    X_test = test_dl.dataset.tensors[0].numpy()
    y_test = test_dl.dataset.tensors[1].numpy()

    if model_type == "logistic_regression":
        model = LogisticRegression(max_iter=1000)
    elif model_type == "svm":
        model = SVC()
    elif model_type == "decision_tree":
        if class_balance:
            model = DecisionTreeClassifier(class_weight={0: 0.05, 1: 0.95})
        else: 
            model = DecisionTreeClassifier()
    elif model_type == "random_forest":
        if class_balance:
            model = RandomForestClassifier(class_weight={0: 0.05, 1: 0.95})
        else:
            model = RandomForestClassifier()
    else:
        raise ValueError("Invalid model_type. Choose from ['logistic_regression', 'svm', 'decision_tree', 'random_forest']")

    model.fit(X_train_resampled, y_train_resampled)

    y_pred = model.predict(X_test)

    cm = confusion_matrix(y_test, y_pred)

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

    model_description = model_type.replace('_', ' ').title()
    smote_description = ' + Smote' if smote else ''
    tomek_description = ' + Tomek' if tomek else ''
    class_balance_description = ' + Class Balance' if class_balance else ''
    required_print = f'createData("{model_description}{smote_description}{tomek_description}{class_balance_description}", "{precision*100:.2f}%", "{recall*100:.2f}%", "{false_negative_rate*100:.2f}%", "{false_positive_rate*100:.2f}%"),'

    print(required_print)

if __name__ == "__main__":
    model_types = ["svm", "decision_tree", "random_forest"]
    #"logistic_regression", 
    # for model_type in model_types:
    #     for (smote, tomek, class_balance) in [[False, False, False], [False, False, True], [False, True, False], [True, False, False], [True, True, False], [True, False, True], [False, True, True], [True, True, True]]:
    #         train(model_type, tomek=tomek, smote=smote, class_balance=class_balance)

    # for model_type in model_types:
    #     for (tomek, class_balance) in [[False, False], [False, True], [True, False], [True, True]]:
    #         train(model_type, tomek=tomek, class_balance=class_balance)

    train("logistic_regression", tomek=False, smote=False, class_balance=False)
    train("logistic_regression", tomek=True, smote=True, class_balance=False)

    train("svm", tomek=False, smote=False, class_balance=False)
    # train("svm", tomek=True, smote=True, class_balance=False)

    train("decision_tree", tomek=False, smote=False, class_balance=False)
    train("decision_tree", tomek=True, smote=True, class_balance=False)
    train("decision_tree", tomek=False, smote=False, class_balance=True)
    train("decision_tree", tomek=True, smote=True, class_balance=True)

    train("random_forest", tomek=False, smote=False, class_balance=False)
    train("random_forest", tomek=True, smote=True, class_balance=False)
    train("random_forest", tomek=False, smote=False, class_balance=True)
    train("random_forest", tomek=True, smote=True, class_balance=True)

"""
createData("Logistic Regression", "0.00%", "0.00%", "100.00%", "0.00%"),
createData("Logistic Regression + Class Balance", "0.00%", "0.00%", "100.00%", "0.00%"),
createData("Logistic Regression + Tomek", "0.00%", "0.00%", "100.00%", "0.00%"),
createData("Logistic Regression + Smote", "4.31%", "80.45%", "19.55%", "11.17%"),
createData("Logistic Regression + Smote + Tomek", "4.30%", "80.45%", "19.55%", "11.20%"),
createData("Logistic Regression + Smote + Class Balance", "4.31%", "80.45%", "19.55%", "11.16%"),
createData("Logistic Regression + Tomek + Class Balance", "0.00%", "0.00%", "100.00%", "0.00%"),
createData("Logistic Regression + Smote + Tomek + Class Balance", "4.32%", "80.45%", "19.55%", "11.15%"),
createData("Svm", "0.00%", "0.00%", "100.00%", "0.00%"),
createData("Svm + Class Balance", "0.00%", "0.00%", "100.00%", "0.00%"),
createData("Svm + Tomek", "0.00%", "0.00%", "100.00%", "0.00%"),


"""