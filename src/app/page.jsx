import { fetchAllContenful } from "@/lib/fetchQueries";
import { MuralCard } from "@/components/MuralCoverCard";

//Swiper {Autoplay} from 'swiper' aka also carousel

const SwiperComponent = () => {
  return (
    <div className="swiper">
    </div>
  )
}

const InstaSwiperComponent = () => {
  return (
    <div className="swiper-insta">
    </div>
  )
}

const HomeComponent = () => {
  return (
    <div className="home">
      <div className="childs">
        <div className="child-one"></div>
        <div className="child-two"><p>
        </p></div>
      </div>
    </div>
  )
}

export default async function Home() {
  return (
    <div>
      <SwiperComponent />
      <HomeComponent />
      <InstaSwiperComponent />
    </div>
  );
}