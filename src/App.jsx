import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import HomePage from './pages/HomePage'
import FavouritesPage from './pages/FavouritesPage'
import MealPlanPage from './pages/MealPlanPage'
import CollectionsPage from './pages/CollectionsPage'
import RecipeDetailsPage from './pages/RecipeDetailsPage'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/favourites" element={<FavouritesPage />} />
          <Route path="/meal-plan" element={<MealPlanPage />} />
          <Route path="/recipe/:recipeId" element={<RecipeDetailsPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
