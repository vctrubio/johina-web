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

export const InstagramVideoFeed = ({ video }) => {
    return (
      <div className="instagram-video-feed">
        <div className="video-item">
          <video controls width="400">
            <source src={video.media_url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {video.caption && <p>{video.caption}</p>}
        </div>
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