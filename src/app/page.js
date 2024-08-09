import { fetchAllContenful } from "@/lib/fetchQueries";
import { MuralCard } from "@/components/MuralCoverCard";

//Swiper {Autoplay} from 'swiper' aka also carousel


export default async function Home() {
  const data = fetchAllContenful();
  const murals = (await data).muralCollection.items;
  console.log(murals);

  return (
    <div className="home">
      home is where the heart is
    </div>
  );
}