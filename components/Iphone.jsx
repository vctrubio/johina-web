import React from 'react';

const mediaId = 'your-media-id';
const fields = 'id,caption,media_url,media_type,permalink';  // Replace this with the specific fields you want, e.g., 'id,caption,media_type,media_url'
const url = `https://graph.instagram.com/me/media?fields=${fields}&access_token=${process.env.INSTAGRAM_KEY}`;

const Iphone = async() => {
    const data = await fetch(url)
    const media = await data.json();

    console.log('checking')
    console.log(media);

    return (
        <div className="iphone">
            <div className="screen">
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