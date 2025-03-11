import torch


from data import load_train_data, load_test_data, load_daywise_data
from network import NeuralNet
from evaluate import evaluate_dl, evaluate_single
from train import train_model


MODEL_PATH = 'src/model/weights/model_20250310_170204.pt'


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

    results = evaluate_single(model, single_transaction)
    
    return results


def get_single(idx):

    test_df = load_test_data(get_frame=True)

    single_transaction = test_df.iloc[idx]

    print(single_transaction)

    return single_transaction


if __name__ == "__main__":

    # train()

    # eval()

    # eval_day(1)

    eval_single(0)