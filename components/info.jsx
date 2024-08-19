'use client'
import Image from "next/image";
import React, { useState } from 'react';
import './info.css';


export const Icons = ({ contacts }) => {
    const xandy = 60;
    const titleFilter = ["Phone", "Mail", "Instagram"];
    const contactName = {
        name: "Johina Concheso",
        title: "Muralist & Restorer"
    }
    const avatar = 'url(/jj.png)'

    const orderedContacts = contacts
        .filter(ptr => titleFilter.includes(ptr.title))
        .sort((a, b) => titleFilter.indexOf(a.title) - titleFilter.indexOf(b.title));

    return (
        <div className='info-icons'>
            <div className='info-icon-title'>
                <div className='avatar' style={{ backgroundImage: 'url(/jj.png)' }}></div>
                <div className='name'>
                    <div>
                        {contactName.name}
                    </div>
                    <div>
                        {contactName.title}
                    </div>
                </div>z
            </div>
            <div>
                {orderedContacts.map((contact, index) => (
                    <div key={index} className='info-icon-itr'>
                        <a href={contact.href} target={contact.target || "_self"} rel={contact.rel || ""}>
                            <Image src={contact.src} alt={contact.title} width={xandy} height={xandy} className='svg-icon' />
                            <div className='info-icon-text'>
                                {contact.tooltip}
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};