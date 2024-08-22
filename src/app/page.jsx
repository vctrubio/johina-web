import { Footer } from "@/components/footer";
import { SwiperHome } from "@/components/SwiperFrontPage";
import Iphone from "@/components/Iphone";
import { InstagramFeed } from "@/components/Instagraming";

const sortInstagramCategory = async () => {
  /* NOTE, THERE IS NO EDGES, ALBUMS ECT*/
  const fields = 'id,caption,media_url,media_type,permalink';  // Replace this with the specific fields you want, e.g., 'id,caption,media_type,media_url'
  const url = `https://graph.instagram.com/me/media?fields=${fields}&access_token=${process.env.INSTAGRAM_KEY}`;
  let media = null;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      console.error('Failed to fetch Instagram media:', res.status, res.statusText);
      const errorResponse = await res.json();
      console.error('Error details:', errorResponse);
    }

    media = await res.json();
  }
  catch (err) {
    console.error("🚀 ~ InstagramFeed ~ err:", err)
  }

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

  return {
    igMedia,
    igAlbum,
    igVideo
  }
}




const HomeComponent = async () => {

  const { igMedia, igAlbum, igVideo } = await sortInstagramCategory()

  return (
    <div className="home">
      <div className="childs">

        <div>
          <div className="text-center font-bold mb-1">Photos</div>
          <Iphone className="iphone">
            <InstagramFeed content={igMedia} />
          </Iphone>
        </div>

        {/* <div>
          <div className="text-center font-bold mb-1">Albums</div>
          <Iphone className="iphone">
            <InstagramFeed content={igAlbum} />
          </Iphone>
        </div>
          
        // this is the idea but its not working
        
        <div>
          <div className="text-center font-bold mb-1">Videos</div>
          <Iphone className="iphone">
            <InstagramFeed content={igVideo} />
          </Iphone>
        </div> */}

          

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
          <Footer className="child-footer" />
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div>
      {/* <SwiperHome /> */}
      <HomeComponent />
    </div>
  );
}