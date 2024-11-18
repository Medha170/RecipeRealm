import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './RecipeCard.css'

function RecipeCard({ recipe }) {
    return (
        <Link to={`/recipe/${recipe.id}`} className='recipe-card'>
            <h3>{recipe.title}</h3>
            <img src={recipe.image} alt={recipe.title} />
        </Link>
    )
}

RecipeCard.propTypes = {
    recipe: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
    }).isRequired,
}

export default RecipeCard