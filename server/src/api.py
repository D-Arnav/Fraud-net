from flask import Flask, request, jsonify
from flask_cors import CORS

from functions import fetch_and_evaluate_single, evaluate_day, fetch_dates, fetch_merchant_wise




app = Flask(__name__)
CORS(app, origins=["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"])

config = {
    'model': 'FN_2_01',
    'model_path': 'src/weights/Fraudnet_2.01_0417130824.pt',
    'thresholds': {
        'V.High Risk': 0.5,
        'High Risk': 0.5,
        'Medium Risk': 0.5,
        'Low Risk': 0.5,
        'Unknown': 0.5
    },
    'pass_through_ratio': 0.1
}

@app.route("/fetch_evaluate_transaction", methods=["GET"])
def fetch_evaluate_transaction():
    index = request.args.get("index", type=int)
    result = fetch_and_evaluate_single(index, config)
    return jsonify(result)


@app.route("/predict_day", methods=["GET"])
def predict_day():
    day = request.args.get("day", type=str)
    result = evaluate_day(day, config)
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


@app.route("/set_risk_thresholds", methods=["POST"])
def admin_slider_inputs():
    data = request.get_json()
    low_risk = data.get("low_risk")
    medium_risk = data.get("medium_risk")
    high_risk = data.get("high_risk")
    very_high_risk = data.get("very_high_risk")

    config['thresholds'] = {
        'V.High Risk': very_high_risk,
        'High Risk': high_risk,
        'Medium Risk': medium_risk,
        'Low Risk': low_risk,
        'Unknown': 0.5
    }

    return jsonify({"message": "Slider inputs Success", "config": config})


@app.route("/set_pt_ratio", methods=["POST"])
def admin_PTR_inputs():
    data = request.get_json()
    pt_ratio = data.get("pt_ratio")

    config['pass_through_ratio'] = pt_ratio

    return jsonify({"message": "PTR inputs Success", "config": config})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
