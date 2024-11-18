import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchRecipeDetails, fetchRecipeNutrition } from '../services/api'
import '../styles/RecipeDetailsPage.css'

function RecipeDetailsPage() {
    const { recipeId } = useParams()
    const { data, error, isLoading } = useQuery({
        queryKey: ['recipe', recipeId],
        queryFn: () => fetchRecipeDetails(recipeId),
    })

    const { data: nutritionData, error: nutritionError, isLoading: nutritionLoading } = useQuery({
        queryKey: ['nutrition', recipeId],
        queryFn: () => fetchRecipeNutrition(recipeId),
    })

    if (isLoading || nutritionLoading) {
        return <p>Loading Recipe Details...</p>
    }
    if (error || nutritionError) {
        return <p>Error fetching recipe details. Try again</p>
    }

    return (
        <div className='recipe-details'>
            {data && (
                <>
                    <h1>{data.title}</h1>
                    <img src={data.image} alt={data.title} />
                    <p>Cooking Time: {data.readyInMinutes} minutes</p>
                    <p>Servings: {data.servings}</p>

                    <h2>Ingredients</h2>
                    <ul>
                        {data.extendedIngredients.map((ingredient) => (
                            <li key={ingredient.id}>{ingredient.original}</li>
                        ))}
                    </ul>

                    <h2>Instructions</h2>
                    <div dangerouslySetInnerHTML={{ __html: data.instructions || `<p>No instructions available</p>` }} />

                    {nutritionData && (
                        <>
                            <h2>Nutrition</h2>
                            <p>Calories: {nutritionData.calories}</p>
                            <p>Protein: {nutritionData.protein}</p>
                            <p>Fat: {nutritionData.fat}</p>
                            <p>Carbs: {nutritionData.carbs}</p>
                        </>
                    )}
                </>
            )}
        </div>
    )
}

export default RecipeDetailsPage