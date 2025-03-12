export default async function evaluateDay (day) {

    const response = await fetch(`http://127.0.0.1:8000/predict_day?day=${day}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.json()
}