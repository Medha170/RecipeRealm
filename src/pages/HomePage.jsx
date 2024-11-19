import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import SearchInput from '../components/SearchInput/SearchInput'
import RecipeCard from '../components/RecipeCard/RecipeCard'
import FilterSort from '../components/FilterSort/FilterSort'
import { fetchRecipes } from '../services/api'
import '../styles/HomePage.css'

function HomePage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [filters, setFilters] = useState({ cuisine: '', diet: '', sort: 'popularity' })
    const { ref, inView } = useInView()
    const [message, setMessage] = useState('')

    const isSearchEnabled = Boolean(searchQuery) || Object.values(filters).some(val => val)

    const {
        data,
        error,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['recipes', searchQuery, filters],
        queryFn: ({ pageParam = 0 }) => fetchRecipes(searchQuery, pageParam, filters.cuisine, filters.diet, filters.sort),
        getNextPageParam: (lastPage, pages) => (lastPage.results.length ? pages.length * 10 : undefined),
        enabled: isSearchEnabled,
    })

    useEffect(() => {
        if (!searchQuery && !isSearchEnabled) {
            fetchNextPage()
        }
    }, [fetchNextPage, searchQuery, isSearchEnabled])

    useEffect(() => {
        if (inView && hasNextPage) fetchNextPage()
    }, [inView, hasNextPage, fetchNextPage])

    const handleSearch = (query) => setSearchQuery(query)

    const handleFilterChange = (name, value) => {
        setFilters((prev) => ({ ...prev, [name]: value }))
    }

    const handleToggleFavorite = (recipe) => {
        let favourites = JSON.parse(localStorage.getItem('favourites')) || []
        if (favourites.some((fav) => fav.id === recipe.id)) {
            favourites = favourites.filter((fav) => fav.id !== recipe.id)
            setMessage('Recipe removed from favorites.')
        } else {
            favourites.push(recipe)
            setMessage('Recipe added to favorites.')
        }
        localStorage.setItem('favourites', JSON.stringify(favourites))
        setTimeout(() => setMessage(''), 3000) // Clear message after 3 seconds
    }

    const handleAddToMealPlan = (recipe) => {
        const mealPlan = JSON.parse(localStorage.getItem('mealPlan')) || []
        if (!mealPlan.some((item) => item.id === recipe.id)) {
            mealPlan.push(recipe)
            setMessage('Recipe added to meal plan.')
        } else {
            setMessage('Recipe is already in meal plan.')
        }
        localStorage.setItem('mealPlan', JSON.stringify(mealPlan))
        setTimeout(() => setMessage(''), 3000) // Clear message after 3 seconds
    }    

    return (
        <div className="homepage">
            <h1>Recipe Search</h1>
            <SearchInput onSearch={handleSearch} />
            <FilterSort onFilterChange={handleFilterChange} />
            <Link to="/favourites">View Favourites</Link>
            <Link to="/meal-plan">View Meal Plan</Link>

            {message && <p className="message">{message}</p>}

            {isLoading && <p>Loading Recipes...</p>}
            {error && <p>Error fetching recipes. Try again</p>}

            {data && data.pages.flatMap(page => page.results).length > 0 && (
                <div className="recipe-grid">
                    {data.pages.flatMap(page => page.results).map((recipe) => (
                        <RecipeCard
                            key={recipe.id}
                            recipe={recipe}
                            onToggleFavorite={handleToggleFavorite}
                            onAddToMealPlan={handleAddToMealPlan}
                        />
                    ))}
                </div>
            )}

            <div ref={ref} className="loading">
                {isFetchingNextPage ? 'Loading more recipes...' : ''}
            </div>
        </div>
    )
}

export default HomePage
