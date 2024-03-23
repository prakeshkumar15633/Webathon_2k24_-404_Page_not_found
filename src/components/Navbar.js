// Navbar.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/hacklogo1.png';
import SpeechToText from './speechtotext'; // Import SpeechToText component
import './Navbar.css';

function Navbar({ recipes, setFilteredRecipes }) {
    const [searchQuery, setSearchQuery] = useState('');

    // Function to handle search input change
    const handleSearchInputChange = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        // Check if recipes is defined and not empty before filtering
        if (recipes && recipes.length > 0) {
            // Filter recipes based on search query
            const filtered = recipes.filter(recipe =>
                recipe.name.toLowerCase().includes(query)
            );
            setFilteredRecipes(filtered);
        }
    };

    return (
        <nav className="navbar">
            <li className="nav-item logo-container">
                <Link to="/" className="nav-link">
                    <img src={logo} style={{ width: "150px" }} alt="Logo" />
                </Link>
            </li>
            <ul className="navbar-nav">
                <li className="nav-item search-container">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="search-bar"
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                    />
                    <SpeechToText setSearchQuery={setSearchQuery} /> {/* Add SpeechToText component */}
                </li>
                <li className="nav-item">
                    <Link to="/" className="nav-link">Browse</Link>
                </li>
                <li className="nav-item">
                    <Link to="/form" className="nav-link">Add Recipe</Link>
                </li>
                <li className="nav-item">
                    <Link to="/community" className="nav-link">Community</Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="nav-link">Register</Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="nav-link">Login</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;