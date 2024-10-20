import { Suspense } from 'react';
import { Footer } from "@/components/footer";
import { SwiperHome } from "@/components/SwiperFrontPage";
import Iphone from "@/components/Iphone";
import { InstagramFeed, InstagramVideoFeed } from "@/components/Instagraming";
import { CardPlayground } from "@/components/CardPlayground";

const sortInstagramCategory = async () => {
  const fields = 'id,caption,media_url,media_type,permalink';
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
  const igVideo = []

  media.data.forEach(item => {
    if (item.media_type === 'IMAGE' || item.media_type === 'CAROUSEL_ALBUM') {
      igMedia.push(item)
    } else if (item.media_type === 'VIDEO') {
      igVideo.push(item)
    }
  })

  return {
    igMedia,
    igVideo
  }
}

const HomeComponent = async () => {
  const { igMedia, igVideo } = await sortInstagramCategory()

  const looping = ({ content }) => {
    content.map((media, index) => {
      console.log("🚀 ~ looping ~ media:", media);
      // console.log(`🚀 ~ looping ~ index: ${index} ~ media: ${media}`)
    }
    )
  }
  // looping({ content: igMedia })

  return (
    <div className="home">
      <div className="childs">
        <div className="flex-mobile gap-4">
          {
            igMedia.length > 0 && (
              <div>
                <div className="text-center font-bold mb-1">Photos</div>
                <Iphone className="iphone">
                  <InstagramFeed content={igMedia} />
                </Iphone>
              </div>
            )
          }
          {
            igVideo.length > 0 && (
              <div>
                <div className="text-center font-bold mb-1">Videos</div>
                <Iphone className="iphone">
                  {igVideo.map((media, index) => (
                    <InstagramVideoFeed video={media} key={index} />
                  ))}
                </Iphone>
                <div>
                </div>
              </div>
            )
          }
        </div>
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
    </div >
  )
}

export default function Home() {
  return (
    <div>
      {/* <SwiperHome /> */}
      {/* <HomeComponent /> */}
      <Suspense fallback={<div>Loading...</div>}>
        <CardPlayground />
      </Suspense>
    </div>
  );
}
