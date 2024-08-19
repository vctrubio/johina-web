'use client'
import React, { useState, useEffect } from 'react';
import SVG from 'react-inlinesvg';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ContactCard as icons } from '@/lib/contactInfo';
import './footer.css';

export const Footer = () => {
    const text = "Get in touch!"
    const [targetText, setTargetText] = useState(text);
    const [fade, setFade] = useState(false);

    useEffect(() => {
        if (targetText) {
            setFade(true);
            const timeout = setTimeout(() => {
                setFade(false);
                setTimeout(() => setTargetText(text), 300);
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [targetText]);

    const handleClick = (href) => {
        window.location.href = href;
    };

    return (
        <footer>
            <TransitionGroup>
                <CSSTransition
                    key={targetText}
                    timeout={1000}
                    classNames="target-text"
                >
                    <div className="target-text">
                        {targetText}
                    </div>
                </CSSTransition>
            </TransitionGroup>
            <div className="icon-struct">
                {icons.map((icon, index) => (
                    <div
                        className="icon-wrapper"
                        key={index}
                        onMouseEnter={() => setTargetText(icon.tooltip)}
                        onClick={() => handleClick(icon.href)}
                    >
                        <a href={icon.href} target={icon.target} rel={icon.rel}>
                            <SVG src={icon.src} className='svg-icon' />
                        </a>
                    </div>
                ))}
            </div>
        </footer>
    );
};