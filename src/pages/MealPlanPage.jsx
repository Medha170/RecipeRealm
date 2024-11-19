import React, { useState, useEffect } from 'react'
import RecipeCard from '../components/RecipeCard/RecipeCard'
import '../styles/MealPlanPage.css'

function MealPlanPage() {
    const [mealPlan, setMealPlan] = useState([])

    useEffect(() => {
        const savedMealPlan = JSON.parse(localStorage.getItem('mealPlan')) || []
        setMealPlan(savedMealPlan)
    }, [])

    const handleRemoveFromMealPlan = (recipe) => {
        const updatedMealPlan = mealPlan.filter((item) => item.id !== recipe.id)
        setMealPlan(updatedMealPlan)
        localStorage.setItem('mealPlan', JSON.stringify(updatedMealPlan))
    }

    return (
        <div className="meal-plan-page">
            <h1>My Meal Plan</h1>
            {mealPlan.length > 0 ? (
                <div className="meal-plan-list">
                    {mealPlan.map((recipe) => (
                        <RecipeCard
                            key={recipe.id}
                            recipe={recipe}
                            onMealPlanAction={handleRemoveFromMealPlan}
                            isInMealPlan
                        />
                    ))}
                </div>
            ) : (
                <p>No recipes in your meal plan yet. Start adding some!</p>
            )}
        </div>
    )
}

export default MealPlanPage
