import { fetchAllContenful } from "@/lib/fetchQueries";
import { MuralCard } from "@/components/MuralCoverCard";

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
          <MuralCard cover={mural.photosCollection.items[0]} />
        </div>
      ))}
    </div>
  );
}