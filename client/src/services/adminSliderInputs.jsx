export default async function adminSliderInputs(lowRiskValue, mediumRiskValue, highRiskValue, veryHighRiskValue) {

  try {
    const response = await fetch(`http://10.55.1.250:5000/set_risk_thresholds`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        low_risk: lowRiskValue / 100,
        medium_risk: mediumRiskValue / 100,
        high_risk: highRiskValue / 100,
        very_high_risk: veryHighRiskValue / 100,
      })

    });

    return response.json();
  } catch (error) {
    console.error('Error getting the slider inputs:', JSON.stringify(error));
    return 'Error getting the slider inputs';
  }
}