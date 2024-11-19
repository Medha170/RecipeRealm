import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './RecipeCard.css'

function RecipeCard({ recipe, onToggleFavorite, onMealPlanAction, isInMealPlan }) {
    const [isFavorite, setIsFavorite] = useState(false)

    useEffect(() => {
        // Check if the recipe is already in favorites
        const favoriteRecipes = JSON.parse(localStorage.getItem('favourites')) || []
        setIsFavorite(favoriteRecipes.some(fav => fav.id === recipe.id))
    }, [recipe.id])

    const handleFavoriteClick = () => {
        onToggleFavorite(recipe)
        setIsFavorite(!isFavorite)
    }

    const handleMealPlanClick = () => {
        onMealPlanAction(recipe)
    }

    return (
        <div className="recipe-card">
            <Link to={`/recipe/${recipe.id}`}>
                <h3>{recipe.title}</h3>
                <img src={recipe.image} alt={recipe.title} />
            </Link>
            <button type="button" onClick={handleFavoriteClick} className={`favorite-button ${isFavorite ? 'active' : ''}`}>
                {isFavorite ? '★' : '☆'}
            </button>
            <button type="button" onClick={handleMealPlanClick} className="meal-plan-button">
                {isInMealPlan ? 'Remove from Meal Plan' : 'Add to Meal Plan'}
            </button>
        </div>
    )
}

RecipeCard.propTypes = {
    recipe: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
    }).isRequired,
    onToggleFavorite: PropTypes.func.isRequired,
    onMealPlanAction: PropTypes.func.isRequired,
    isInMealPlan: PropTypes.bool,
}

RecipeCard.defaultProps = {
    isInMealPlan: false,
}

export default RecipeCard
