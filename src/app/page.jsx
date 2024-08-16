import { Footer } from "@/components/footer";
import { SwiperHome } from "@/components/SwiperFrontPage";
import Iphone  from "@/components/Iphone";

const HomeComponent = () => {
  return (
    <div className="home">
      <div className="childs">
        <Iphone className="iphone" />
        <div className="child-text">
          <p>
            <span className="emphasis-word">Johina</span> is a <span className="italic-word">celebrated muralist</span> who has been transforming spaces with her art since 1987.
          </p>
          <p>
            Her work graces <span className="highlight">Royal Palace of Madrid</span> and luxury resorts like <span className="highlight">Finca Cortesín in Marbella.</span> Beyond murals, she has led restoration projects in heritage buildings worldwide, collaborated with <span className="highlight">UNESCO</span>, and contributed to top design magazines like <span className="highlight">Architectural Digest</span> and <span className="highlight">Elle Deco</span>.
          </p>
          <p>
            With a Master’s from <span className="blue-highlight">Christie’s in Art History</span> and a background in restoration, Johina's artistry <span className="italic font-bold mr-2">blends tradition</span> with contemporary flair.
          </p>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default async function Home() {
  return (
    <div>
      <SwiperHome />
      <HomeComponent />
      {/* <InstaSwiperComponent /> */}
    </div>
  );
}