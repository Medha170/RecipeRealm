import axios from 'axios';
require('dotenv').config();

const api = axios.create({
    baseURL: 'https://api.spoonacular.com/',
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use((config) => {
    config.params = config.params || {};
    config.params.api_key = process.env.REACT_APP_API_KEY;
    return config;
})

export default api;