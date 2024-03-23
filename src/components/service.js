import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import './Recipe.css'; // Importing CSS file for styling

function Recipe() {
  const [recipes, setRecipes] = useState([]);
  const [sortBy, setSortBy] = useState('id'); // Default sorting option
  const [filterBy, setFilterBy] = useState('All'); // Default filter option
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/recipes')
      .then(response => response.json())
      .then(data => setRecipes(data))
      .catch(error => console.error('Error fetching recipe data:', error));
  }, []);

  // Function to handle sorting change
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  // Function to handle filter change
  const handleFilterChange = (event) => {
    setFilterBy(event.target.value);
  };

  // Function to sort recipes based on the selected sorting option
  const sortRecipes = (recipes) => {
    switch (sortBy) {
      case 'id':
        return recipes.sort((a, b) => a.id.localeCompare(b.id));
      case 'timetaken':
        return recipes.sort((a, b) => a.timetaken - b.timetaken);
      default:
        return recipes;
    }
  };

  // Function to filter recipes based on the selected cuisine
  const filterRecipes = (recipes) => {
    if (filterBy === 'All') {
      return recipes;
    } else {
      return recipes.filter(recipe => recipe.cuisine.toLowerCase() === filterBy.toLowerCase());
    }
  };

  // Function to handle saving a recipe
  const handleSaveRecipe = (recipeId) => {
    const savedRecipe = recipes.find(recipe => recipe.id === recipeId);
    if (savedRecipe) {
      setSavedRecipes(prevSavedRecipes => [...prevSavedRecipes, savedRecipe]);
    }
  };

  // Function to handle mouse enter
  const handleMouseEnter = (recipeId) => {
    setRecipes(prevRecipes =>
      prevRecipes.map(recipe =>
        recipe.id === recipeId ? { ...recipe, hovered: true } : recipe
      )
    );
  };

  // Function to handle mouse leave
  const handleMouseLeave = (recipeId) => {
    setRecipes(prevRecipes =>
      prevRecipes.map(recipe =>
        recipe.id === recipeId ? { ...recipe, hovered: false } : recipe
      )
    );
  };

  return (
    <div className="recipe-container">
      <div className="dropdown-container">
        <div className="dropdown">
          <label htmlFor="filter">Filter By Cuisine:</label>
          <select id="filter" value={filterBy} onChange={handleFilterChange}>
            <option value="All">All</option>
            <option value="Italian">Italian</option>
            <option value="Chinese">Chinese</option>
            <option value="South-Indian">South Indian</option>
            <option value="North-Indian">North Indian</option>
            <option value="Mexican">Mexican</option>
            <option value="Turkish">Turkish</option>
            <option value="Japanese">Japanese</option>
            <option value="French">French</option>
          </select>
        </div>
        <div className="dropdown">
          <br></br>
          <label htmlFor="sort">Sort By:</label>
          <select id="sort" value={sortBy} onChange={handleSortChange}>
            <option value="id">Recently added</option>
            <option value="timetaken">Speedy</option>
          </select>
        </div>
      </div>
      {recipes.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <div className="card-container">
          {sortRecipes(filterRecipes(recipes)).map(recipe => (
            <div
              key={recipe.id}
              className="recipe-card"
              onMouseEnter={() => handleMouseEnter(recipe.id)}
              onMouseLeave={() => handleMouseLeave(recipe.id)}
            >
              <Link to={`/recipe/${recipe.id}`} className="recipe-link">
                <img src={recipe.image} alt={recipe.name} className="recipe-image" />
                <div className="recipe-info">
                  <h2>{recipe.name}</h2>
                  <p>Cuisine: {recipe.cuisine}</p>
                  <p>Rating: {recipe.rating}</p>
                </div>
              </Link>
              {recipe.hovered && (
  <button
    className="save-button"
    onClick={() => handleSaveRecipe(recipe.id)}
  >
    <FontAwesomeIcon icon={faBookmark} />
  </button>
)}

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Recipe;
