'use client'
import React, { useState, useEffect } from 'react';
import SVG from 'react-inlinesvg';
import whatsappSVG from '../svgs/whatsapp-black.svg';
import phoneSVG from '../svgs/phone-black.svg';
import mailSVG from '../svgs/mail-black.svg';
import instagramSVG from '../svgs/insta-black.svg';
import './footer.css';

const icons = [
    {
        href: "https://wa.me/+34609988138",
        src: whatsappSVG.src,
        tooltip: "+34 609 98 81 38"
    },
    {
        href: "tel:+34609988138",
        src: phoneSVG.src,
        tooltip: "+34 609 98 81 38"
    },
    {
        href: "https://www.instagram.com/johinagconcheso/",
        src: instagramSVG.src,
        tooltip: "johinagconcheso",
        target: "_blank",
        rel: "noopener noreferrer"
    },
    {
        href: "mailto:johina22@gmail.com",
        src: mailSVG.src,
        tooltip: "johina22@gmail.com"
    }
];

export const Footer = () => {
    const [targetText, setTargetText] = useState('');
    const [fade, setFade] = useState(false);

    useEffect(() => {
        if (targetText) {
            setFade(true);
            const timeout = setTimeout(() => {
                setFade(false);
                setTimeout(() => setTargetText(''), 300);
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [targetText]);

    const handleClick = (href) => {
        window.location.href = href;
    };

    return (
        <footer>
            <div className="target-text">
                {targetText}
            </div>
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