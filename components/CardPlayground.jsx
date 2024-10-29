'use client'

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import './CardPlayground.css';
import { fetchAllContenful } from "@/lib/fetchQueries";
import Filters from './Filters';

const Card = ({ slug, title, image, showTitle, onClick, isSelected, className }) => {
    return (
        <div id={`card-${slug}`} className={`card ${isSelected ? 'selected' : ''} ${className}`} onClick={onClick}>
            <div
                className="card-image"
                style={{ backgroundColor: image ? 'transparent' : `hsl(${slug?.length * 100 % 360 || 0}, 70%, 80%)` }}
            >
                {image && <img src={image} alt={title} />}
            </div>
            <h3 className={`card-title ${showTitle ? 'show' : ''}`}>{title}</h3>
        </div>
    );
};

const CardView = ({ card, onClose }) => {
    return (
        <div className="card-view" id={`card-view-id${card.slug}`}>
            <div className="card-view-content">
                <div className="card-view-image" style={{ backgroundImage: `url(${card.image})` }}></div>
                <div className="card-view-details">
                    <h2>{card.title}</h2>
                    <p className="card-view-description">{card.description}</p>
                    <p className="card-view-info"><strong>Category:</strong> {card.category}</p>
                    <p className="card-view-info"><strong>Location:</strong> {card.location}</p>
                    <button onClick={onClose} className="close-button">Close</button>
                </div>
            </div>
        </div>
    );
};

// Helper function to get unique values from an array
const getUniqueValues = (array, key) => [...new Set(array.map(item => item[key]))];

// Helper function to generate a slug from a title
const generateSlug = (title) => {
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
};

export const CardPlayground = ({ cards }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [showTitles, setShowTitles] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
    const [cardViewPosition, setCardViewPosition] = useState(0);
    const [isCardViewVisible, setIsCardViewVisible] = useState(false);
    const [animatedCards, setAnimatedCards] = useState([]);
    const [animationType, setAnimationType] = useState('');
    const cardGridRef = useRef(null);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const slug = searchParams.get('slug');
        if (slug) {
            const card = cards.find(c => c.slug === slug);
            if (card) {
                setSelectedCard(card.slug);
                setIsCardViewVisible(true);
                setTimeout(() => scrollToCard(card.slug), 300);
            }
        }
    }, [searchParams, cards]);

    // useEffect(() => {
    //     const cards = document.querySelectorAll('.card');
    //     const card = processedCards.find(c => c.slug === slug);
    //     const cardRect = card.getBoundingClientRect();
    //     if (cardRect.top > cardViewPosition) {
    //         card.classList.add('card-shifted');
    //     } else {
    //         card.classList.remove('card-shifted');
    //     }
    // }, [cardViewPosition, selectedCard]);

    if (!cards || !Array.isArray(cards)) {
        return <div>No cards available...</div>;
    }

    const categories = getUniqueValues(cards, 'category');
    const locations = getUniqueValues(cards, 'location');

    const getCardsPerRow = () => {
        if (windowWidth < 768) return 1; // Mobile
        if (windowWidth < 1024) return 2; // Tablet
        return 4; // Desktop
    };

    const scrollToCard = (slug) => {
        console.log('Scrolling to card:', slug);
        const cardViewElement = document.querySelector('.card-view-container.visible');

        if (cardViewElement) {
            console.log('CardView element found');
            const cardViewRect = cardViewElement.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Calculate the position to scroll to (just above the CardView)
            const scrollPosition = scrollTop + cardViewRect.top - 360; // 20px margin

            console.log('Scrolling to position:', scrollPosition);

            // Scroll to position the CardView at the top of the viewport
            window.scrollTo({
                top: scrollPosition,
                behavior: 'smooth'
            });
        } else {
            console.log('CardView element not found');
        }
    };

    const handleCardClick = (slug) => {
        console.log('Card clicked:', slug);
        setSelectedCard(prevSelectedCard => {
            if (prevSelectedCard === slug) {
                setIsClosing(true);
                setIsCardViewVisible(false);
                setTimeout(() => {
                    setSelectedCard(null);
                    setIsClosing(false);
                    const newUrl = new URL(window.location);
                    newUrl.searchParams.delete('slug');
                    window.history.pushState({}, '', newUrl);
                }, 0);
            } else {
                const selectedCard = cards.find(c => c.slug === slug);
                setIsCardViewVisible(true);

                const newUrl = new URL(window.location);
                newUrl.searchParams.set('slug', selectedCard.slug);
                window.history.pushState({}, '', newUrl);
            }
            return slug;
        });
    };

    const getCardRowIndex = (index) => {
        return Math.floor(index / getCardsPerRow());
    };

    const filteredCards = cards.filter(card => {
        const matchesSearch = card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            card.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            card.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === '' || card.category === selectedCategory;
        const matchesLocation = selectedLocation === '' || card.location === selectedLocation;
        return matchesSearch && matchesCategory && matchesLocation;
    });

    return (
        <div className="container-cards">
            <Filters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                categories={categories}
                locations={locations}
                showTitles={showTitles}
                setShowTitles={setShowTitles}
                cards={cards}
            />
            <div className="card-grid" ref={cardGridRef}>
                {filteredCards.map((card, index) => (
                    <React.Fragment key={card.slug}>
                        <Card
                            {...card}
                            onClick={() => handleCardClick(card.slug)}
                            isSelected={selectedCard === card.slug}
                        />
                        {getCardRowIndex(index) === getCardRowIndex(filteredCards.findIndex(c => c.slug === selectedCard)) && (
                            <div
                                className={`card-view-container ${selectedCard === card.slug && isCardViewVisible ? 'visible' : ''} ${isClosing ? 'closing' : ''}`}
                                key={`view-${card.slug}`}
                                style={{
                                    gridColumn: '1 / -1',
                                    gridRow: `${getCardRowIndex(index) + 2}`,
                                }}
                            >
                                <CardView
                                    card={filteredCards.find(c => c.slug === selectedCard)}
                                    onClose={() => handleCardClick(selectedCard)}
                                />
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};
