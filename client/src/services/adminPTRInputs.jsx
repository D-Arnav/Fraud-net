export default async function adminPTRInputs(passThroughRatio) {

  try {
    const response = await fetch(`http://10.55.1.250:5000/set_pt_ratio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pt_ratio: passThroughRatio / 100,
      })
      
    });

    return response.json();
  } catch (error) {
    console.error('Error getting the PT inputs:', JSON.stringify(error));
    return 'Error getting the PT inputs';
  }
}