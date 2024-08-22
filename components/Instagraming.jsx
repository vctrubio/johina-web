import Image from 'next/image';

export const InstagramCard = ({ media }) => {
    return (
        <div className='instagram-g'>
            <a href={media.permalink} target="_blank" rel="noopener noreferrer">
                <Image
                    src={media.media_url}
                    alt={media.caption || 'Instagram src'}
                    width={600}
                    height={600}
                // unoptimized //must be commented for dev
                />
                <p className="instagram-caption">{media.caption}</p>
            </a>
        </div>
    );
};



export const InstagramFeed = async ({content}) => {
    return (
        <div className='w-full'>
            {content.map((media, index) => (
                <InstagramCard key={index} media={media} />
            ))}
        </div>
    )
}


/*
Intagram media_type
- CAROUSEL_ALBUM
- VIDEO
- IMAGE

*/