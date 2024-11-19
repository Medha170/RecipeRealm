import React from 'react'
import PropTypes from 'prop-types'
import './FilterSort.css'

function FilterSort({ onFilterChange }) {
    const handleFilterChange = (e) => {
        const { name, value } = e.target
        onFilterChange(name, value)
    }

    return (
        <div className="filter-sort">
            <select name="cuisine" onChange={handleFilterChange}>
                <option value="">All Cuisines</option>
                <option value="italian">Italian</option>
                <option value="mexican">Mexican</option>
                <option value="chinese">Chinese</option>
                <option value="indian">Indian</option>
                {/* Add more cuisines as needed */}
            </select>

            <select name="diet" onChange={handleFilterChange}>
                <option value="">All Diets</option>
                <option value="gluten free">Gluten Free</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="paleo">Paleo</option>
                {/* Add more dietary options as needed */}
            </select>

            <select name="sort" onChange={handleFilterChange}>
                <option value="">Sort By</option>
                <option value="popularity">Popularity</option>
                <option value="healthiness">Healthiness</option>
                <option value="time">Preparation Time</option>
                {/* Add more sorting options if needed */}
            </select>

            <input
                type="text"
                name="excludeIngredients"
                placeholder="Exclude Ingredients (comma-separated)"
                onChange={handleFilterChange}
            />
        </div>
    )
}

FilterSort.propTypes = {
    onFilterChange: PropTypes.func.isRequired,
}

export default FilterSort