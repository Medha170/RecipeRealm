import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { fetchRecipeDetails, fetchRecipeNutrition } from '../services/api';
import '../styles/RecipeDetailsPage.css';

function RecipeDetailsPage() {
    const { recipeId } = useParams();
    const { data, error, isLoading } = useQuery({
        queryKey: ['recipe', recipeId],
        queryFn: () => fetchRecipeDetails(recipeId),
    });

    const { data: nutritionData, error: nutritionError, isLoading: nutritionLoading } = useQuery({
        queryKey: ['nutrition', recipeId],
        queryFn: () => fetchRecipeNutrition(recipeId),
    });

    const [note, setNote] = useState('');
    const [savedNotes, setSavedNotes] = useState({});

    useEffect(() => {
        const storedNotes = JSON.parse(localStorage.getItem('notes')) || {};
        setSavedNotes(storedNotes);

        // Set the current note for this recipe
        setNote(storedNotes[recipeId] || '');
    }, [recipeId]);

    const handleNoteChange = (e) => {
        setNote(e.target.value);
    };

    const handleSaveNote = () => {
        const updatedNotes = { ...savedNotes, [recipeId]: note };
        setSavedNotes(updatedNotes);
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
    };

    if (isLoading || nutritionLoading) {
        return <p>Loading Recipe Details...</p>;
    }
    if (error || nutritionError) {
        return <p>Error fetching recipe details. Try again</p>;
    }

    return (
        <div className="recipe-details">
            {data && (
                <>
                    <h1>{data.title}</h1>
                    <img src={data.image} alt={data.title} />
                    <p>Cooking Time: {data.readyInMinutes} minutes</p>
                    <p>Servings: {data.servings}</p>

                    <h2>Ingredients</h2>
                    <ul>
                        {data.extendedIngredients.map((ingredient) => (
                            <li key={ingredient.id}>{ingredient.original}</li>
                        ))}
                    </ul>

                    <h2>Instructions</h2>
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>{data.instructions}</ReactMarkdown>

                    {nutritionData && (
                        <>
                            <h2>Nutrition</h2>
                            <p>Calories: {nutritionData.calories} cal</p>
                            <p>Protein: {nutritionData.protein}</p>
                            <p>Fat: {nutritionData.fat}</p>
                            <p>Carbs: {nutritionData.carbs}</p>
                        </>
                    )}

                    <div className="notes-section">
                        <h2>Personal Notes</h2>
                        <textarea
                            value={note}
                            onChange={handleNoteChange}
                            placeholder="Add your personal notes here..."
                        />
                        <button type='button' onClick={handleSaveNote}>Save Note</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default RecipeDetailsPage;