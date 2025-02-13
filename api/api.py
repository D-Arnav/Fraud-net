from flask import request, Flask
from model.deploy import add

app = Flask(__name__)

@app.route('/add', methods=['GET', 'POST'])
def get_current_time():
    data = request.get_json()
    a = data.get('a')
    b = data.get('b')
    res = add(a, b)
    return {'sum': res}


@app.route('/predict_one', methods=['GET', 'POST'])
def predict_one():
    """
    JSON Request
    
    """
    
    
    data = request.get_json()
    pass


@app.route('/predict_batch', methods=['GET', 'POST'])
def predict_batch():
    pass

@app.route('/predict_file', methods=['GET', 'POST'])
def predict_file():
    pass