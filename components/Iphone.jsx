
import React from 'react';
import { InstagramFeed } from './Instagraming';

const Iphone = async () => {
    return (
        <>
            <div className="iphone">
                <div className="screen">
                    <InstagramFeed />
                    <div className="notch-container">
                        <div className="notch">
                            <div className="camera"></div>
                            <div className="speaker"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Iphone;