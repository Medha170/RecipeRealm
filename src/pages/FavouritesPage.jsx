import React, { useState, useEffect } from 'react'
import RecipeCard from '../components/RecipeCard/RecipeCard'
import '../styles/FavouritesPage.css'

function FavouritesPage() {
    const [favourites, setFavorites] = useState([])

    useEffect(() => {
        const savedFavourites = JSON.parse(localStorage.getItem('favourites')) || []
        setFavorites(savedFavourites)
    }, [])

    return (
        <div className='favourites-page'>
            <h1>My Favourite Recipes</h1>
            {favourites.length > 0 ? (
                <div className='favourites-list'>
                    {favourites.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            ) : (
                <p>No favourite recipes yet. Start adding some!</p>
            )}
        </div>
    )
}

export default FavouritesPage