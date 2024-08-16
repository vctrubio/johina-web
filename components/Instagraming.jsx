
import Image from 'next/image';

export const InstagramCard = ({ media }) => {
    return (
        <div className='instagram-g'>
            <a href={media.permalink} target="_blank" rel="noopener noreferrer">
                <Image
                    src={media.media_url}
                    alt={media.caption}
                    width={800}
                    height={800}
                />
                <p className="instagram-caption">{media.caption}</p>
            </a>
        </div>
    );
};

export const InstagramFeed = async () => {
    const fields = 'id,caption,media_url,media_type,permalink';  // Replace this with the specific fields you want, e.g., 'id,caption,media_type,media_url'
    const url = `https://graph.instagram.com/me/media?fields=${fields}&access_token=${process.env.INSTAGRAM_KEY}`;

    const data = await fetch(url)
    const media = await data.json();

    const filteredMedia = media.data.filter(item => item.media_type === 'IMAGE').slice(0, 6);

    return (
        <div className='w-full'>
            {filteredMedia.map((media, index) => (
                <InstagramCard key={index} media={media} />
            ))}
        </div>
    )
}