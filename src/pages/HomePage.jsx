import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import SearchInput from '../components/SearchInput/SearchInput'
import fetchRecipes from '../services/api'

function HomePage() {
    const [searchQuery, setSearchQuery] = useState('')

    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ['recipes', searchQuery],
        queryFn: () => fetchRecipes(searchQuery),
        enabled: false
    })    

    const handleSearch = (query) => {
        setSearchQuery(query)
        refetch()
    }

    return (
        <div>
            <h1>Recipe Search</h1>
            <SearchInput onSearch={handleSearch} />

            {isLoading && <p>Loading Recipes...</p>}
            {error && <p>Error fetching recipes. Try again</p>}
            {data && (
                <ul>
                    {data.results.map((recipe) => (
                        <li key={recipe.id}>{recipe.title}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default HomePage