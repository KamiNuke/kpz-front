import axios from 'axios';

const apiClient = axios.create({
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	baseURL: import.meta.env["VITE_API_BASE_URL"],
	headers: {
		"Content-Type": "application/json",
		"Authorization": `Bearer ${import.meta.env["VITE_API_AUTH_TOKEN"]}`,
	},
});

apiClient.interceptors.response.use(
	response => response,
	error => {
		console.error('Axios error:', error);
		// eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
		return Promise.reject(error);
	}
);

export default apiClient;
