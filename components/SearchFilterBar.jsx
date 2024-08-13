'use client'
import React from 'react';
import Select from 'react-select';

const categories = [
    "Home",
    "Garden",
    "Restaurants",
    "Bars",
]
const locations = [
    "Madrid, Spain",
    "Barcelona, Spain",
    "Bordoux, France",
    "Berlin, Germany",
]

const options = [
    { value: 'home', label: 'Home' },
    { value: 'garden', label: 'Garden' },
    { value: 'restaurants', label: 'Restaurants' },
    { value: 'bars', label: 'Bars' },
];


const customStyles = {
    control: (provided, state) => ({
        ...provided,
        borderColor: state.isFocused ? '#96B6C5' : provided.borderColor,
        boxShadow: state.isFocused ? '0 0 0 #96B6C5 ' : provided.boxShadow,
        '&:hover': {
            borderColor: state.isFocused ? '#96B6C5' : provided.borderColor,
        },
        outline: 'none',
        backgroundColor: 'transparent',  // Set background color to transparent
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? 'lightgray' : provided.backgroundColor,
        '&:hover': {
            backgroundColor: '#96B6C5',
        },
    }),
    input: (provided) => ({
        ...provided,
        backgroundColor: 'transparent',
    }),

};

const transformedCategories = categories.map(category => ({
    value: category,
    label: category,
}));

const transformedLocations = locations.map(location => ({
    value: location,
    label: location,
}));


const CategorySelect = () => (
    <Select
        isMulti
        name="categories"
        options={transformedCategories}
        className="select-bar"
        placeholder="Categories"
        styles={customStyles}
    />
);


const LocationSelect = () => (
    <Select
        name="locations"
        options={transformedLocations}
        className="select-bar"
        placeholder="Locations"
        styles={customStyles}
    />
);

const CloseUpSelect = () => (
    <div>
        Close-up
        <input
            type="checkbox"
        />
    </div>
);

const SearchFilterBar = () => {
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
                <div className="search-bar">
                    <CategorySelect />
                    <LocationSelect />
                    <input type="text" placeholder="Search" id="height" />
                </div>
            </div>
        </>
    );
}

export default SearchFilterBar;