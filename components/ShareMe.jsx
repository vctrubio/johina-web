import React, { useState } from 'react';
import { WhatsappShareButton, WhatsappIcon, EmailShareButton, EmailIcon } from 'react-share';
import Image from 'next/image';

export const ShareComponent = ({ shareUrl, title, path }) => {
  const [btnToggle, setBtnToggle] = useState('off');

  const handleToggle = () => {
    setBtnToggle((prevState) => (prevState === 'off' ? 'on' : 'off'));
  };

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
        <div className='share-btns-link'>Share: Link</div>
        <div className='share-btns-btns'>
          <WhatsappShareButton url={shareUrl} title={title} separator=":: ">
            <WhatsappIcon size={42} round />
          </WhatsappShareButton>
          <EmailShareButton url={shareUrl} title={title} separator=":: ">
            <EmailIcon size={42} round />
          </EmailShareButton>
        </div>
        <div className='share-btns-close'>
          <button onClick={handleToggle}>Close</button>
        </div>
      </div>
      )} 
    </>
  );
};