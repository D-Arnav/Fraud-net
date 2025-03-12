export default async function predictTransaction (idx) {

    const response = await fetch(`http://127.0.0.1:8000/predict_single?idx=${idx}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.json()
}