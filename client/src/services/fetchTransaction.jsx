export default async function fetchTransaction (idx) {

    const response = await fetch(`http://127.0.0.1:8000/fetch_single?idx=${idx}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.json()
}