import whatsappSVG from '../svgs/whatsapp-black.svg';
import phoneSVG from '../svgs/phone-black.svg';
import mailSVG from '../svgs/mail-black.svg';
import instagramSVG from '../svgs/insta-black.svg';

export const ContactCard = [
    {
        title: 'Whatsapp',
        href: "https://wa.me/+34609988138",
        src: whatsappSVG.src,
        tooltip: "+34 609 988 138"
    },
    {
        title: 'Phone',
        href: "tel:+34609988138",
        src: phoneSVG.src,
        tooltip: "+34 609 988 138"
    },
    {
        title: 'Instagram',
        href: "https://www.instagram.com/johinagconcheso/",
        src: instagramSVG.src,
        tooltip: "johinagconcheso",
        target: "_blank",
        rel: "noopener noreferrer"
    },
    {
        title: 'Mail',
        href: "mailto:johina22@gmail.com",
        src: mailSVG.src,
        tooltip: "johina22@gmail.com"
    }
];