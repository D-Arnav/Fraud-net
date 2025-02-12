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