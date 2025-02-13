import argparse

def parse_args():

    parser = argparse.ArgumentParser(description='Fraud Detection')

    parser.add_argument('-seed', '--seed', type=int, default=1, help='Random Seed')
    parser.add_argument('-dp', '--data_path', type=str, default='api/data/data_2.csv', help='Dataset Path')
    parser.add_argument('-sp', '--save_path', type=str, default='api/model/weights/', help='Save Path')
    parser.add_argument('-vp', '--vis_path', type=str, default='api/model/vis/', help='Visualization Path')
    parser.add_argument('-lp', '--log_path', type=str, default='api/model/log.txt', help='Log File Path')
    parser.add_argument('-sv', '--save', action='store_true', help='Save Model')

    parser.add_argument('-s', '--split', type=float, default=0.2, help='Test Train Split')
    parser.add_argument('-m', '--model', type=str, default='logistic', help='Model Type (logistic, svm, random_forest, neural_network, gb_trees)')
    parser.add_argument('-k', '--k_folds', type=int, default=5, help='K Fold Cross-Validation')
    parser.add_argument('-d', '--tree_depth', type=int, default=3, help='Decision Tree Depth')
    parser.add_argument('-cw', '--class_weight', type=float, default=0.01, help='Class Weight for Minority Class')
    parser.add_argument('-cb', '--class_balance_method', type=str, default='smote_tomek', help='Class Balance Method (none, smote_tomek, smote, undersampling)')
    parser.add_argument('-pca', '--pca_dim', type=int, default=0, help='Number of PCA Dimensions (0 = No PCA)')

    return parser.parse_args()