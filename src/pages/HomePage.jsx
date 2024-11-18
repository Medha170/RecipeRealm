import React, { useState, useEffect } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import SearchInput from '../components/SearchInput/SearchInput'
import RecipeCard from '../components/RecipeCard/RecipeCard'
import { fetchRecipes } from '../services/api'
import '../styles/HomePage.css'

function HomePage() {
    const [searchQuery, setSearchQuery] = useState('')
    const { ref, inView } = useInView() // This will track when our loading element is in view

    // useInfiniteQuery for infinite scrolling
    const {
        data,
        error,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['recipes', searchQuery],
        queryFn: ({ pageParam = 0 }) => fetchRecipes(searchQuery, pageParam),
        getNextPageParam: (lastPage, pages) => {
            const nextOffset = pages.length * 10 // Increment by 10 each time
            return lastPage.results.length ? nextOffset : undefined // Only fetch if there are results
        },
        enabled: !!searchQuery, // Enable query only when there’s a search query
    })

    // Fetch next page of recipes when the `inView` (bottom loader) comes into view
    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage()
        }
    }, [inView, hasNextPage, fetchNextPage])

    const handleSearch = (query) => {
        setSearchQuery(query)
    }

    return (
        <div className="homepage">
            <h1>Recipe Search</h1>
            <SearchInput onSearch={handleSearch} />

            {isLoading && <p>Loading Recipes...</p>}
            {error && <p>Error fetching recipes. Try again</p>}
            
            {data && (
                <div className="recipe-grid">
                    {data.pages.map((page) =>
                        page.results.map((recipe) => (
                            <RecipeCard key={recipe.id} recipe={recipe} />
                        ))
                    )}
                </div>
            )}

            {/* Loader for infinite scrolling */}
            <div ref={ref} className="loading">
                {isFetchingNextPage ? 'Loading more recipes...' : ''}
            </div>
        </div>
    )
}

export default HomePage