export default async function fetchMerchantWiseResults() {

    try {
        const response = await fetch(`http://10.55.1.250:5000/fetch_merchant_wise_results`, {
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