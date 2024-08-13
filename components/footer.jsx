import React from 'react';
import SVG from 'react-inlinesvg';
import whatsappSVG from '../svgs/whatsapp-black.svg';
import phoneSVG from '../svgs/phone-black.svg';
import mailSVG from '../svgs/mail-black.svg';
import instagramSVG from '../svgs/insta-black.svg';
import './footer.css';

export const Footer = () => {
    return (
        <footer>
            <a href="https://wa.me/+34630199112">
                <SVG src={whatsappSVG.src} className='svg-icon' />
            </a>
            <a href="tel:+34630199112">
                <SVG src={phoneSVG.src} className='svg-icon' />
            </a>
            <a href="https://www.instagram.com/alicia.agosti.interiorismo/" target="_blank" rel="noopener noreferrer">
                <SVG src={instagramSVG.src} className='svg-icon' />
            </a>
            <a href="mailto:estudio@aliciaagosti.com">
                <SVG src={mailSVG.src} className='svg-icon' />
            </a>
        </footer>
    );
};