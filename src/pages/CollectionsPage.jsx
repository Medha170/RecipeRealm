import React, { useState, useEffect } from 'react'
import RecipeCard from '../components/RecipeCard/RecipeCard'
import '../styles/CollectionsPage.css'

function CollectionsPage() {
    const [collections, setCollections] = useState([])
    const [newCollectionName, setNewCollectionName] = useState('')

    useEffect(() => {
        const savedCollections = JSON.parse(localStorage.getItem('collections')) || []
        setCollections(savedCollections)
    }, [])

    const handleCreateCollection = () => {
        if (newCollectionName.trim() && !collections.some(col => col.name === newCollectionName)) {
            const newCollection = { name: newCollectionName, recipes: [] }
            const updatedCollections = [...collections, newCollection]
            setCollections(updatedCollections)
            localStorage.setItem('collections', JSON.stringify(updatedCollections))
            setNewCollectionName('')
        }
    }

    const handleDeleteCollection = (collectionName) => {
        const updatedCollections = collections.filter(collection => collection.name !== collectionName)
        setCollections(updatedCollections)
        localStorage.setItem('collections', JSON.stringify(updatedCollections))
    }

    const handleRemoveFromCollection = (collectionName, recipe) => {
        const updatedCollections = collections.map((collection) => {
            if (collection.name === collectionName) {
                return {
                    ...collection,
                    recipes: collection.recipes.filter((r) => r.id !== recipe.id),
                }
            }
            return collection
        })
        setCollections(updatedCollections)
        localStorage.setItem('collections', JSON.stringify(updatedCollections))
    }

    return (
        <div className="collections-page">
            <h1>My Recipe Collections</h1>
            <div className="create-collection">
                <input
                    type="text"
                    placeholder="Collection Name"
                    value={newCollectionName}
                    onChange={(e) => setNewCollectionName(e.target.value)}
                />
                <button type='button' onClick={handleCreateCollection}>Create Collection</button>
            </div>
            <div className="collections-list">
                {collections.map((collection) => (
                    <div key={collection.name} className="collection">
                        <h2>{collection.name}</h2>
                        <button type='button' onClick={() => handleDeleteCollection(collection.name)}>Delete Collection</button>
                        <div className="collection-recipes">
                            {collection.recipes.length > 0 ? (
                                collection.recipes.map((recipe) => (
                                    <RecipeCard
                                        key={recipe.id}
                                        recipe={recipe}
                                        onRemoveFromCollection={(r) => handleRemoveFromCollection(collection.name, r)}
                                    />
                                ))
                            ) : (
                                <p>No recipes in this collection yet.</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CollectionsPage
