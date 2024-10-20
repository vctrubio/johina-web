'use client'

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import './CardPlayground.css';

const Card = ({ id, title, image, showTitle, onClick, isSelected, className }) => {
    return (
        <div id={`card-${id}`} className={`card ${isSelected ? 'selected' : ''} ${className}`} onClick={onClick}>
            <div
                className="card-image"
                style={{ backgroundColor: image ? 'transparent' : `hsl(${id * 100 % 360}, 70%, 80%)` }}
            >
                {image && <img src={image} alt={title} />}
            </div>
            <h3 className={`card-title ${showTitle ? 'show' : ''}`}>{title}</h3>
        </div>
    );
};

const CardView = ({ card, onClose }) => {
    return (
        <div className="card-view">
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

export const CardPlayground = () => {
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

    const cards = [
        { id: 1, title: 'Eiffel Tower', image: 'https://source.unsplash.com/featured/?eiffeltower', category: 'Landmark', location: 'Paris, France', description: 'Iconic iron lattice tower on the Champ de Mars in Paris.' },
        { id: 2, title: 'Great Wall of China', image: 'https://source.unsplash.com/featured/?greatwall', category: 'Historical', location: 'China', description: 'Ancient fortification system spanning thousands of miles.' },
        { id: 3, title: 'Machu Picchu', image: 'https://source.unsplash.com/featured/?machupicchu', category: 'Archaeological', location: 'Peru', description: '15th-century Inca citadel set high in the Andes Mountains.' },
        { id: 4, title: 'Taj Mahal', image: 'https://source.unsplash.com/featured/?tajmahal', category: 'Monument', location: 'Agra, India', description: 'Ivory-white marble mausoleum on the right bank of the river Yamuna.' },
        { id: 5, title: 'Colosseum', image: 'https://source.unsplash.com/featured/?colosseum', category: 'Historical', location: 'Rome, Italy', description: 'Oval amphitheatre in the centre of Rome, built of concrete and sand.' },
        { id: 6, title: 'Petra', image: 'https://source.unsplash.com/featured/?petra', category: 'Archaeological', location: 'Jordan', description: 'Famous archaeological site containing rock-cut architecture and water conduit system.' },
        { id: 7, title: 'Christ the Redeemer', image: 'https://source.unsplash.com/featured/?christredeemer', category: 'Monument', location: 'Rio de Janeiro, Brazil', description: 'Art Deco statue of Jesus Christ at the summit of Mount Corcovado.' },
        { id: 8, title: 'Chichen Itza', image: 'https://source.unsplash.com/featured/?chichenitza', category: 'Archaeological', location: 'Yucatan, Mexico', description: 'Large pre-Columbian city built by the Maya civilization.' },
        { id: 9, title: 'Acropolis', image: 'https://source.unsplash.com/featured/?acropolis', category: 'Historical', location: 'Athens, Greece', description: 'Ancient citadel located on a rocky outcrop above the city of Athens.' },
        { id: 10, title: 'Angkor Wat', image: 'https://source.unsplash.com/featured/?angkorwat', category: 'Religious', location: 'Siem Reap, Cambodia', description: 'Largest religious monument in the world, originally constructed as a Hindu temple.' },
        { id: 11, title: 'Stonehenge', image: 'https://source.unsplash.com/featured/?stonehenge', category: 'Prehistoric', location: 'Wiltshire, England', description: 'Prehistoric monument consisting of a ring of standing stones.' },
        { id: 12, title: 'Hagia Sophia', image: 'https://source.unsplash.com/featured/?hagiasophia', category: 'Religious', location: 'Istanbul, Turkey', description: 'Former Greek Orthodox church, later an Ottoman mosque, now a museum.' },
        { id: 13, title: 'Moai Statues', image: 'https://source.unsplash.com/featured/?easterisland', category: 'Archaeological', location: 'Easter Island, Chile', description: 'Monolithic human figures carved by the Rapa Nui people.' },
        { id: 14, title: 'Neuschwanstein Castle', image: 'https://source.unsplash.com/featured/?neuschwanstein', category: 'Castle', location: 'Bavaria, Germany', description: '19th-century Romanesque Revival palace on a rugged hill above the village of Hohenschwangau.' },
        { id: 15, title: 'Petra Treasury', image: 'https://source.unsplash.com/featured/?petratreasury', category: 'Archaeological', location: 'Petra, Jordan', description: 'Elaborate temple in Petra, also known as Al-Khazneh, carved out of a sandstone rock face.' },
        { id: 16, title: 'Borobudur', image: 'https://source.unsplash.com/featured/?borobudur', category: 'Religious', location: 'Java, Indonesia', description: '9th-century Mahayana Buddhist temple in Magelang Regency, Central Java, Indonesia.' },
        { id: 17, title: 'Alhambra', image: 'https://source.unsplash.com/featured/?alhambra', category: 'Palace', location: 'Granada, Spain', description: 'Palace and fortress complex located in Granada, Andalusia, Spain.' },
        { id: 18, title: 'Parthenon', image: 'https://source.unsplash.com/featured/?parthenon', category: 'Historical', location: 'Athens, Greece', description: 'Former temple on the Athenian Acropolis, dedicated to the goddess Athena.' },
        { id: 19, title: 'Forbidden City', image: 'https://source.unsplash.com/featured/?forbiddencity', category: 'Historical', location: 'Beijing, China', description: 'Complex of former Chinese imperial palaces and now a museum in central Beijing.' },
        { id: 20, title: 'Sagrada Familia', image: 'https://source.unsplash.com/featured/?sagradafamilia', category: 'Religious', location: 'Barcelona, Spain', description: 'Large unfinished Roman Catholic church designed by Spanish architect Antoni Gaudí.' },
        { id: 21, title: 'Pyramids of Giza', image: 'https://source.unsplash.com/featured/?pyramids', category: 'Ancient Wonder', location: 'Giza, Egypt', description: 'Ancient Egyptian monument complex, including the Great Sphinx.' },
        { id: 22, title: 'Petra', image: 'https://source.unsplash.com/featured/?petra', category: 'Archaeological', location: 'Jordan', description: 'Historical and archaeological city famous for its rock-cut architecture.' },
        { id: 23, title: 'Machu Picchu', image: 'https://source.unsplash.com/featured/?machupicchu', category: 'Archaeological', location: 'Peru', description: '15th-century Inca citadel located in the Eastern Cordillera of southern Peru.' },
        { id: 24, title: 'Angkor Wat', image: 'https://source.unsplash.com/featured/?angkorwat', category: 'Religious', location: 'Siem Reap, Cambodia', description: 'Largest religious monument in the world, originally constructed as a Hindu temple.' },
    ].map(card => ({ ...card, slug: generateSlug(card.title) })); // Add slug to each card

    // Get unique categories and locations
    const categories = getUniqueValues(cards, 'category');
    const locations = getUniqueValues(cards, 'location');

    const getCardsPerRow = () => {
        if (windowWidth < 768) return 1; // Mobile
        if (windowWidth < 1024) return 2; // Tablet
        return 4; // Desktop
    };

    useEffect(() => {
        const slug = searchParams.get('slug');
        if (slug) {
            const card = cards.find(c => c.slug === slug);
            if (card) {
                setSelectedCard(card.id);
                setIsCardViewVisible(true);
                // Use a longer timeout to ensure the DOM has updated
                setTimeout(() => scrollToCard(card.id), 300);
            }
        }
    }, [searchParams, cards]);

    const scrollToCard = (cardId) => {
        console.log('Scrolling to card:', cardId);
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

    const handleCardClick = (cardId) => {
        console.log('Card clicked:', cardId);
        setSelectedCard(prevSelectedCard => {
            if (prevSelectedCard === cardId) {
                setIsClosing(true);
                setIsCardViewVisible(false);
                setTimeout(() => {
                    setSelectedCard(null);
                    setIsClosing(false);
                    const newUrl = new URL(window.location);
                    newUrl.searchParams.delete('slug');
                    window.history.pushState({}, '', newUrl);
                }, 0); // Match this delay with the CSS animation duration
            } else {
                const selectedCard = cards.find(c => c.id === cardId);
                setSelectedCard(cardId);
                setIsCardViewVisible(true);
                setIsClosing(false);
                
                setTimeout(() => {
                    console.log('Scrolling to card:', cardId);
                    scrollToCard(cardId);
                }, 100);
                
                const newUrl = new URL(window.location);
                newUrl.searchParams.set('slug', selectedCard.slug);
                window.history.pushState({}, '', newUrl);
            }
            return cardId;
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

    useEffect(() => {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            const cardRect = card.getBoundingClientRect();
            if (cardRect.top > cardViewPosition) {
                card.classList.add('card-shifted');
            } else {
                card.classList.remove('card-shifted');
            }
        });
    }, [cardViewPosition, selectedCard]);

    return (
        <div className="container-cards">
            <div className="filters">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="filter-select"
                >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
                <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="filter-select"
                >
                    <option value="">All Locations</option>
                    {locations.map(location => (
                        <option key={location} value={location}>{location}</option>
                    ))}
                </select>
                <button onClick={() => setShowTitles(!showTitles)}>
                    {showTitles ? 'Hide Titles' : 'Show Titles'}
                </button>
            </div>
            <div className="card-grid" ref={cardGridRef}>
                {filteredCards.map((card, index) => (
                    <React.Fragment key={card.id}>
                        <Card
                            {...card}
                            id={`card-${card.id}`}
                            showTitle={showTitles}
                            onClick={() => handleCardClick(card.id)}
                            isSelected={selectedCard === card.id}
                        />
                        {getCardRowIndex(index) === getCardRowIndex(filteredCards.findIndex(c => c.id === selectedCard)) && (
                            <div 
                                className={`card-view-container ${selectedCard === card.id && isCardViewVisible ? 'visible' : ''} ${isClosing ? 'closing' : ''}`}
                                style={{
                                    gridColumn: '1 / -1',
                                    gridRow: `${getCardRowIndex(index) + 2}`,
                                }}
                            >
                                <CardView
                                    card={filteredCards.find(c => c.id === selectedCard)}
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
