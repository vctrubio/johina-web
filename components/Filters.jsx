import React, { useState, useEffect, useRef } from 'react';
import './Filters.css';

const Filters = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, selectedLocation, setSelectedLocation, categories, locations, showTitles, setShowTitles, cards }) => {
    const [filteredLocations, setFilteredLocations] = useState(locations);
    const [filteredCategories, setFilteredCategories] = useState(categories);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isLocationOpen, setIsLocationOpen] = useState(false);
    const categoryDropdownRef = useRef(null);
    const locationDropdownRef = useRef(null);
    const categoryButtonRef = useRef(null);
    const locationButtonRef = useRef(null);

    useEffect(() => {
        if (selectedCategory) {
            const newFilteredLocations = [...new Set(cards.filter(card => card.category === selectedCategory).map(card => card.location))];
            setFilteredLocations(newFilteredLocations);
        } else {
            setFilteredLocations(locations);
        }
    }, [selectedCategory, cards, locations]);

    useEffect(() => {
        if (selectedLocation) {
            const newFilteredCategories = [...new Set(cards.filter(card => card.location === selectedLocation).map(card => card.category))];
            setFilteredCategories(newFilteredCategories);
        } else {
            setFilteredCategories(categories);
        }
    }, [selectedLocation, cards, categories]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target) && !categoryButtonRef.current.contains(event.target)) {
                setIsCategoryOpen(false);
            }
            if (locationDropdownRef.current && !locationDropdownRef.current.contains(event.target) && !locationButtonRef.current.contains(event.target)) {
                setIsLocationOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleReset = () => {
        setSearchTerm('');
        setSelectedCategory('');
        setSelectedLocation('');
    };

    return (
        <div className="filters">
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                {searchTerm && (
                    <button key="clear-search" className="clear-search-button" onClick={() => setSearchTerm('')}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
                        </svg>
                    </button>
                )}
            </div>
            <div className="options-container">
                <div className="filter-group primary-filters">
                    <div className="select-container category-container">
                        <button key="category-button" ref={categoryButtonRef} className="filter-button" onClick={() => setIsCategoryOpen(!isCategoryOpen)}>
                            <svg className="select-icon category-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path fillRule="evenodd" d="M5.25 2.25a3 3 0 00-3 3v4.318a3 3 0 00.879 2.121l9.58 9.581c.92.92 2.39.92 3.31 0l4.442-4.442a2.25 2.25 0 000-3.181L11.03 3.217a3 3 0 00-2.122-.879H5.25zm1.5 6v-1.5h1.5v1.5h-1.5zm3 0v-1.5H12v1.5H9.75z" clipRule="evenodd" />
                            </svg>
                            <span className="filter-text">{selectedCategory || ''}</span>
                        </button>
                        <div ref={categoryDropdownRef} className={`dropdown ${isCategoryOpen ? 'open' : ''}`}>
                            {filteredCategories.map(category => (
                                <button 
                                    key={`category-${category}`}
                                    onClick={() => {
                                        setSelectedCategory(category);
                                        setIsCategoryOpen(false);
                                    }}
                                    className="dropdown-item"
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="select-container location-container">
                        <button key="location-button" ref={locationButtonRef} className="filter-button" onClick={() => setIsLocationOpen(!isLocationOpen)}>
                            <svg className="select-icon location-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                            </svg>
                            <span className="filter-text">{selectedLocation || ''}</span>
                        </button>
                        <div ref={locationDropdownRef} className={`dropdown ${isLocationOpen ? 'open' : ''}`}>
                            {filteredLocations.map(location => (
                                <button 
                                    key={`location-${location}`}
                                    onClick={() => {
                                        setSelectedLocation(location);
                                        setIsLocationOpen(false);
                                    }}
                                    className="dropdown-item"
                                >
                                    {location}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="filter-group secondary-filters">
                    <button key="show-titles" className="show-titles-btn" onClick={() => setShowTitles(!showTitles)} aria-label="Show Titles">
                        <svg className={`lightbulb-icon ${showTitles ? 'on' : 'off'}`} viewBox="0 0 24 24" width="24" height="24">
                            <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" />
                        </svg>
                    </button>
                    <button key="reset" className="reset-button" onClick={handleReset} aria-label="Reset Filters">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Filters;
