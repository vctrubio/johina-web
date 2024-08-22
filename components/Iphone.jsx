
import React from 'react';

const Iphone = ({ children }) => {
    return (
        <div className="iphone">
            <div className="screen">
                {children}
                <div className="notch-container">
                    <div className="notch">
                        <div className="camera"></div>
                        <div className="speaker"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Iphone;