import React, { useState } from 'react'
import PropTypes from 'prop-types'

function SearchInput({ onSearch }) {
    const [query, setQuery] = useState('')

    const handleSearch = (e) => {
        e.preventDefault()
        if (query.trim()) {
            onSearch(query)
        }
    }

    return (
        <form onSubmit={handleSearch}>
            <input
                type='text'
                placeholder='Search for recipes...'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button type='submit'>Search</button>
        </form>
    )
}

SearchInput.propTypes = {
    onSearch: PropTypes.func.isRequired,
}

export default SearchInput