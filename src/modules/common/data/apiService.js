import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

// Axios instance
const axiosInstance = axios.create({
    baseURL: apiUrl,
    withCredentials: false,
});

// Fetch token payload from Rust Axum API
export const fetchTokenPayload = async (id_token) => {
    try {
        const response = await axiosInstance.post('/decode-token/', { id_token });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const errorMessage = error.response.data.detail || 'An error occurred';
            throw new Error(errorMessage);
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
};

// Generate Key
export const generateKey = async (models, user) => {
    try {
        const response = await axiosInstance.post('/models/', {
            models: models,
            metadata: {
                user: user,
            },
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const errorMessage = error.response.data.detail || 'An error occurred';
            throw new Error(errorMessage);
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
};