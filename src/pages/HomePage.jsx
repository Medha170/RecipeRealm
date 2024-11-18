import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import SearchInput from '../components/SearchInput/SearchInput'
import RecipeCard from '../components/RecipeCard/RecipeCard'
import { fetchRecipes } from '../services/api'
import '../styles/HomePage.css'

function HomePage() {
    const [searchQuery, setSearchQuery] = useState('')

    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ['recipes', searchQuery],
        queryFn: () => fetchRecipes(searchQuery),
        enabled: false
    })    

    const handleSearch = (query) => {
        setSearchQuery(query)
    }

    useEffect(() => {
        if (searchQuery) {
            refetch()
        }
    }, [searchQuery, refetch])

    return (
        <div className='homepage'>
            <h1>Recipe Search</h1>
            <SearchInput onSearch={handleSearch} />

            {isLoading && <p>Loading Recipes...</p>}
            {error && <p>Error fetching recipes. Try again</p>}
            {data && (
                <div className='recipe-grid'>
                    {data.results.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default HomePage