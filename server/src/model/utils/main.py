import torch

import time

import matplotlib.pyplot as plt


from data import load_train_data, load_test_data, load_daywise_data
from network import NeuralNet
from evaluate import evaluate_dl, evaluate_single
from train import train_model
from preprocess import preprocess_data




MODEL_PATH = 'src/model/weights/model_20250311_135247.pt'


def train():

    torch.manual_seed(1)    
    train_dl = load_train_data()

    input_size = train_dl.dataset.tensors[0].shape[-1]

    model = NeuralNet(input_size, 2)

    train_model(model, train_dl)

    test_dl = load_test_data()
    evaluate_dl(model, test_dl)


def eval():

    test_dl = load_test_data()

    input_size = test_dl.dataset.tensors[0].shape[-1]

    model = NeuralNet(input_size, 2)
    
    model.load_state_dict(torch.load(MODEL_PATH))

    evaluate_dl(model, test_dl)


def eval_day(day):
    
    day_dl = load_daywise_data(day)

    input_size = day_dl.dataset.tensors[0].shape[-1]

    model = NeuralNet(input_size, 2)
    
    model.load_state_dict(torch.load(MODEL_PATH))

    results = evaluate_dl(model, day_dl)

    return results


def eval_single(idx):

    test_dl = load_test_data()

    single_transaction = test_dl.dataset.tensors[0][idx]

    input_size = single_transaction.shape[-1]

    model = NeuralNet(input_size, 2)

    model.load_state_dict(torch.load(MODEL_PATH))

    start = time.perf_counter()
    results = evaluate_single(model, single_transaction)
    end = time.perf_counter()

    print(f"Time taken: {end-start}")

    return results


def get_single(idx):

    test_df = load_test_data(get_frame=True)

    transaction = test_df.iloc[idx]

    return transaction



def compute_average_inference_time():

    test_dl = load_test_data()

    single_transaction = test_dl.dataset.tensors[0][0]

    input_size = single_transaction.shape[-1]

    model = NeuralNet(input_size, 2)

    model.load_state_dict(torch.load(MODEL_PATH))

    times = []
    for idx in range(1000):

        transaction = test_dl.dataset.tensors[0][idx]

        start = time.perf_counter()
        evaluate_single(model, transaction)
        end = time.perf_counter()

        times.append(end-start)

    average_time = sum(times)/len(times)

    print(f"Average Time taken: {average_time*1000:.4f} ms")

    return average_time


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


if __name__ == "__main__":

    # train()

    # eval()

    # for day in range(1, 17):
    #     print(f'Day {day}')
    #     eval_day(day)

    # compute_average_inference_time()

    compute_correlation()