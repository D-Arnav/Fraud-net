export default async function evaluateDay(day) {

    try {
      const response = await fetch(`http://10.55.1.250:5000/predict_day?day=${day}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.json();
    } catch (error) {
      console.error('Error fetching evaluate transaction:', JSON.stringify(error));
      return 'Error fetching evaluate transaction';
    }
  }