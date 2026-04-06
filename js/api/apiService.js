export default class ApiService {
    constructor(baseURL, apiKey) {
        this.baseURL = baseURL;
        this.apiKey = apiKey;
    }

    async get(endpoint, params = {}) {
        try {
            const queryParams = new URLSearchParams(params).toString();
            const url = `${this.baseURL}${endpoint}?${queryParams}`;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Client-ID ${this.apiKey}`,
                    'Accept-Version': 'v1'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('GET request failed:', error);
            throw error;
        }
    }
}