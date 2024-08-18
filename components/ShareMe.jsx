import React from 'react';
import { WhatsappShareButton, WhatsappIcon, EmailShareButton, EmailIcon } from 'react-share';
import Image from 'next/image';

export const ShareComponent = ({ shareUrl, title }) => (
  <div style={{ display: 'flex', gap: '10px' }}>
    <WhatsappShareButton url={shareUrl} title={title}>
      <WhatsappIcon size={34} round />
    </WhatsappShareButton>
    <EmailShareButton url={shareUrl} subject={title} body="Check this out!">
      <EmailIcon size={34} round />
    </EmailShareButton>
  </div>
);
