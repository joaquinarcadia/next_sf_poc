export async function fetchSalesforceData(instanceUrl: string, accessToken: string, endpoint: string) {
    try {
        const response = await fetch(`${instanceUrl}/services/data/v56.0${endpoint}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const data = await response.json();

        return data;
    } catch (error: any) {
        console.error("Error fetching Salesforce data:", error.response?.data || error.message);

        throw error;
    }
}
