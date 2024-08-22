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

const sortInstagramCategory = async () => {
    /* NOTE, THERE IS NO EDGES, ALBUMS ECT*/
    const fields = 'id,caption,media_url,media_type,permalink';  // Replace this with the specific fields you want, e.g., 'id,caption,media_type,media_url'
    const url = `https://graph.instagram.com/me/media?fields=${fields}&access_token=${process.env.INSTAGRAM_KEY}`;

    const data = await fetch(url)
    console.log("🚀 ~ InstagramFeed ~ data:", data)
    const media = await data.json();
    console.log("🚀 ~ InstagramFeed ~ media:", media)


    const igMedia = []
    const igAlbum = []
    const igVideo = []

    media.data.forEach(item => {
        if (item.media_type === 'IMAGE') {
            igMedia.push(item)
        } else if (item.media_type === 'CAROUSEL_ALBUM') {
            igAlbum.push(item)
        } else if (item.media_type === 'VIDEO') {
            igVideo.push(item)
        }
    })

    // const filteredMedia = media.data.filter(item => item.media_type === 'IMAGE').slice(0, 6);
    // return filteredMedia
    return {
        igMedia,
        igAlbum,
        igVideo
    }
    // const filteredMedia = media.data.filter(item => item.media_type === 'IMAGE').slice(0, 6);

}




export const InstagramFeed = async () => {

    const {igMedia}  = await sortInstagramCategory();
    return (
        <div className='w-full'>
            {igMedia.map((media, index) => (
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