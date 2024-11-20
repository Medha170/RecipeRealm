import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './RecipeCard.css';

function RecipeCard({ 
    recipe, 
    onToggleFavorite, 
    onMealPlanAction, 
    isInMealPlan, 
    onRemoveFromCollection, 
    showAddToCollection 
}) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [collections, setCollections] = useState([]);
    const [selectedCollection, setSelectedCollection] = useState('');
    const [showNewCollectionModal, setShowNewCollectionModal] = useState(false);
    const [newCollectionName, setNewCollectionName] = useState('');

    useEffect(() => {
        const favoriteRecipes = JSON.parse(localStorage.getItem('favourites')) || [];
        setIsFavorite(favoriteRecipes.some(fav => fav.id === recipe.id));

        const savedCollections = JSON.parse(localStorage.getItem('collections')) || [];
        setCollections(savedCollections);
    }, [recipe.id]);

    const handleFavoriteClick = () => {
        onToggleFavorite(recipe);
        setIsFavorite(!isFavorite);
    };

    const handleMealPlanClick = () => {
        onMealPlanAction(recipe);
    };

    const handleAddToCollection = () => {
        if (newCollectionName.trim()) {
            const newCollection = { name: newCollectionName, recipes: [recipe] };
            const updatedCollections = [...collections, newCollection];
            setCollections(updatedCollections);
            localStorage.setItem('collections', JSON.stringify(updatedCollections));
            setNewCollectionName('');
            setShowNewCollectionModal(false);
        } else if (selectedCollection) {
            const updatedCollections = collections.map((collection) =>
                collection.name === selectedCollection
                    ? { ...collection, recipes: [...collection.recipes, recipe] }
                    : collection
            );
            setCollections(updatedCollections);
            localStorage.setItem('collections', JSON.stringify(updatedCollections));
        }
    };

    return (
        <div className="recipe-card">
            <Link to={`/recipe/${recipe.id}`}>
                <h3>{recipe.title}</h3>
                <img src={recipe.image} alt={recipe.title} />
            </Link>
            <button type="button" onClick={handleFavoriteClick} className={`favorite-button ${isFavorite ? 'active' : ''}`}>
                {isFavorite ? '★' : '☆'}
            </button>
            {onRemoveFromCollection ? (
                <button type="button" onClick={() => onRemoveFromCollection(recipe)} className="remove-button">
                    Remove from Collection
                </button>
            ) : (
                <>
                    <button type="button" onClick={handleMealPlanClick} className="meal-plan-button">
                        {isInMealPlan ? 'Remove from Meal Plan' : 'Add to Meal Plan'}
                    </button>
                    {showAddToCollection && (
                        <div className="add-to-collection">
                            <select
                                value={selectedCollection}
                                onChange={(e) => {
                                    const { value } = e.target;
                                    setSelectedCollection(value);
                                    setShowNewCollectionModal(value === 'new');
                                }}
                            >
                                <option value="">Select Collection</option>
                                {collections.map((col) => (
                                    <option key={col.name} value={col.name}>
                                        {col.name}
                                    </option>
                                ))}
                                <option value="new">Add a New Collection</option>
                            </select>
                            {showNewCollectionModal && (
                                <div className="new-collection-modal">
                                    <input
                                        type="text"
                                        placeholder="New Collection Name"
                                        value={newCollectionName}
                                        onChange={(e) => setNewCollectionName(e.target.value)}
                                    />
                                    <button type="button" onClick={handleAddToCollection}>
                                        Create and Add
                                    </button>
                                </div>
                            )}
                            {!showNewCollectionModal && (
                                <button type="button" onClick={handleAddToCollection}>
                                    Add to Collection
                                </button>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

RecipeCard.propTypes = {
    recipe: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
    }).isRequired,
    onToggleFavorite: PropTypes.func.isRequired,
    onMealPlanAction: PropTypes.func.isRequired,
    onRemoveFromCollection: PropTypes.func, // Optional for removal
    isInMealPlan: PropTypes.bool,
    showAddToCollection: PropTypes.bool, // Controls dropdown visibility
};

RecipeCard.defaultProps = {
    onRemoveFromCollection: null,
    isInMealPlan: false,
    showAddToCollection: true, // Default to showing the dropdown
};

export default RecipeCard;
