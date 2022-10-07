import axios from "axios";


class ApiClient {

    constructor(scheme, endpoint, port) {
        this.scheme = scheme;
        this.endpoint = endpoint;
        this.port = port;
    }

    async login(email, password) {
        try {
            const response = await axios.post(
                this.getApiEndpoint('/auth/login'),
                { email, password }
            );
            this.accessToken = response.data.access_token;
            this.user = response.data.user;
            if (this.accessToken == null) throw 1;
            this.axios = axios.create({
                baseURL: this.getApiEndpoint(),
                timeout: 1000,
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`,
                },
            })
        } catch {
            return false;
        }
        return true;
    }

    async search(query) {
        const response = await axios.get(this.getApiEndpoint('/search'), {
            params: {
                query,
            },
        });
        return response.data;
    }

    async findJobsOfCompany(companyId) {
        const response = await axios.get(this.getApiEndpoint('/jobs'), {
            params: {
                company: companyId,
            }
        });
        return response.data;
    }

    async findJob(jobId) {
        const response = await axios.get(this.getApiEndpoint(`/jobs/${jobId}`));
        return response.data;
    }

    getApiEndpoint(path) {
        return `${this.scheme}://${this.endpoint}:${this.port}${path}`;
    }
}

const {
    REACT_APP_API_SCHEME,
    REACT_APP_API_ENDPOINT,
    REACT_APP_API_PORT,
} = process.env;

const apiClient = new ApiClient(
    REACT_APP_API_SCHEME,
    REACT_APP_API_ENDPOINT,
    REACT_APP_API_PORT,
);

export default apiClient;
