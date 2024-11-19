import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = 'https://api.spoonacular.com/recipes';

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
const fetchRecipes = async (query = '', offset = 0, cuisine = '', diet = '', sort = 'popularity', excludeIngredients = '') => {
    try {
        const params = {
            apiKey: API_KEY,
            number: 10,
            offset,
            cuisine,
            diet,
            sort,
            excludeIngredients,
        };
        
        if (query) {
            params.query = query;
        } else {
            params.sort = sort; // Use 'popularity' by default if no query
        }

        console.log('Fetching recipes with params:', params);
        const response = await axiosInstance.get('/complexSearch', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching recipes:', error);
        throw error;
    }
};

// Function to fetch recipe details
const fetchRecipeDetails = async (recipeId) => {
    try {
        const response = await axiosInstance.get(`/${recipeId}/information`);
        return response.data;
    } catch (error) {
        console.error('Error fetching recipe details:', error)
        throw error;
    }
};

const fetchRecipeNutrition = async (recipeId) => {
    try {
        const response = await axiosInstance.get(`/${recipeId}/nutritionWidget.json`);
        return response.data;
    } catch (error) {
        console.error('Error fetching recipe nutrition:', error)
        throw error;
    }
}

export {fetchRecipes, fetchRecipeDetails, fetchRecipeNutrition}
