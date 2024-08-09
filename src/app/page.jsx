import { fetchAllContenful } from "@/lib/fetchQueries";
import { MuralCard } from "@/components/MuralCoverCard";
import { SwiperHome, InstaSwiperComponent } from "@/components/SwiperFrontPage";

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
      <SwiperHome/>
      <HomeComponent />
      {/* <InstaSwiperComponent /> */}
    </div>
  );
}