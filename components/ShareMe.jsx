'use client'
import React, { useState } from 'react';
import { EmailShareButton, WhatsappShareButton, PinterestShareButton, TwitterShareButton, EmailIcon, WhatsappIcon, PinterestIcon, TwitterIcon } from 'react-share';import Image from 'next/image';
import { usePathname } from 'next/navigation';

export const ShareComponent = () => {
  const domain = 'http://localhost:3000'
  const pathName = usePathname()
  const path = domain + pathName

  const [btnToggle, setBtnToggle] = useState('off');
  const handleToggle = () => {
    setBtnToggle((prevState) => (prevState === 'off' ? 'on' : 'off'));
  };

  const emailSubject = "Hi All! Check out this mural I found!";
  const emailBody = "I found this mural and thought you might like it. Check it out here: "
  return (
    <>
      <div className="share-btn-container" btn-toggle={btnToggle} onClick={handleToggle}>
        <Image
          src="/share.svg"
          alt="Share"
          width={34}
          height={34}
        />
      </div>
      {btnToggle === 'on' && (
        <div className="share-btns-z">
          <div className='share-btns-link'>{path}</div>
          <div className='share-btns-btns'>
            <EmailShareButton url={path} separator=".-> " subject={emailSubject} body={emailBody}>
              <EmailIcon size={42} round />
            </EmailShareButton>
            <WhatsappShareButton url={path} title={emailSubject} separator='-> '>
              <WhatsappIcon size={42} round />
            </WhatsappShareButton>
            <TwitterShareButton url={path} title={emailSubject}>
              <TwitterIcon size={42} round />
            </TwitterShareButton>
            <PinterestShareButton url={path} media={`${domain}/path/to/image.jpg`} description={emailSubject}>
              <PinterestIcon size={42} round />
            </PinterestShareButton>
          </div>
          <div className='share-btns-close'>
            <button onClick={handleToggle}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};


/*
  Good for now, pintinteres and twitter need to get the exact image path
*/