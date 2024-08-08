import Image from "next/image";
import { fetchAllContenful } from "@/lib/fetchQueries";

//Swiper {Autoplay} from 'swiper' aka also carousel


export default async function Home() {
  const data = fetchAllContenful();
  const murals = (await data).muralCollection.items;
  console.log(murals);

  return (
    <div className="m-container">
      {murals.map((mural, index) => (
        <div key={index} className="m-item">
          <h2>title: {mural.title}</h2>
          <p>description: {mural.description}</p>
          <p>Location: {mural.location}</p>
          <p>Close Up: {mural.closeUp ? 'Yes' : 'No'}</p>
          <p>Photo count: {mural.photosCollection.items.length}</p>

          {/* <div>
            {mural.photosCollection.items.map((photo, photoIndex) => (
              <Image
                // key={photoIndex}
                src={photo.url}
                alt={photo.title}
                width={500}
                height={500}
              />
            ))}
          </div> */}
          
        </div>
      ))}
    </div>
  );
}

/* TODOS CARD 
{mural.photosCollection.items.map((photo, photoIndex) => (
              <ClientImage>

const ClientImage = ({ src, alt, width, height }) => {
  return <Image src={src} alt={alt} width={width} height={height} />;
};
*/