import matplotlib.pyplot as plt
from data import load_train_data
from preprocess import preprocess_data

def compute_correlation():
    train_df = load_train_data(get_frame=True)
    train_df = preprocess_data(train_df, get_frame=True)
    correlation_matrix = train_df.corr()
    fraud_correlation = correlation_matrix["FRAUD"]
    fraud_correlation = fraud_correlation.sort_values(ascending=False, key=lambda x: x.abs())
    top_20_correlation = fraud_correlation.head(20)
    unnessasary_columns = ["FRAUD", "SHOP_UNKNOWN", "MERCHANT_UNKNOWN"]
    top_20_correlation = top_20_correlation.drop(index=unnessasary_columns)
    top_20_correlation = top_20_correlation[::-1]
    plt.figure(figsize=(12, 8))
    colors = ['red' if val < 0 else 'blue' for val in top_20_correlation.values]
    plt.barh(top_20_correlation.index, top_20_correlation.values, color=colors)
    plt.xlabel('Correlation with FRAUD')
    plt.ylabel('Features')
    plt.title('Top 20 Features Correlated with FRAUD')
    plt.grid(True)
    plt.yticks(fontsize=8, rotation=45)
    plt.savefig('src/model/figures/correlation.png')
    plt.show()
    for feature, correlation in top_20_correlation.items():
        print(f"{feature}: {correlation:.2%}")
