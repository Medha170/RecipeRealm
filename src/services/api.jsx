import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = 'https://api.spoonacular.com/recipes';

// Check for API key presence
if (!API_KEY) {
    console.error('API key is not set. Please set REACT_APP_API_KEY in your .env file');
}

// Create an Axios instance with default configuration
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    params: {
        apiKey: API_KEY,
    },
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to fetch recipes
const fetchRecipes = async (query) => {
    try {
        const response = await axiosInstance.get('/complexSearch', {
            params: {
                query,
                number: 10,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching recipes:', error);
        throw error;
    }
};

export default fetchRecipes;
