from flask import Flask, request, jsonify
from flask_cors import CORS

from functions import fetch_and_evaluate_single, evaluate_day, fetch_dates, fetch_merchant_wise

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

@app.route("/fetch_evaluate_transaction", methods=["GET"])
def fetch_evaluate_transaction():
    index = request.args.get("index", type=int)
    result = fetch_and_evaluate_single(index)
    return jsonify(result)

@app.route("/predict_day", methods=["GET"])
def predict_day():
    day = request.args.get("day", type=str)
    result = evaluate_day(day)
    return jsonify(result)

@app.route("/fetch_possible_dates", methods=["GET"])
def fetch_possible_dates():
    dates = fetch_dates()
    return jsonify(dates)

@app.route("/fetch_merchant_wise_results", methods=["GET"])
def fetch_merchant_wise_results():
    results = fetch_merchant_wise()
    return jsonify(results)

@app.route("/hello", methods=["GET"])
def hello():
    return jsonify({"message": "Hello World"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
