'use client'
import Image from "next/image";

export const MuralCard = ({ cover }) => {
    if (!cover)
        return <>[NO IMAGE ERROR]</>
    
    const coverUrl = cover.url
    // window.cover = cover
    // window.cover = coverUrl

    return (<div className="m-card">
        <Image src={coverUrl} alt="Mural Cover" width={300} height={300} />
    </div>);
}


/* TODOS CARD 
{mural.photosCollection.items.map((photo, photoIndex) => (
              <ClientImage>

const ClientImage = ({ src, alt, width, height }) => {
  return <Image src={src} alt={alt} width={width} height={height} />;
};
*/