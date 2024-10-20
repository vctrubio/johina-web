import { Noto_Serif_Khitan_Small_Script } from "next/font/google";
import { Montserrat, Titillium_Web } from "next/font/google";

import "../globals.css";
import "../../components/CardPlayground.css";
import NavBar from "../../components/NavBar";
import TitleBar from "../../components/TitleBar";

const notoSerifKhitan = Noto_Serif_Khitan_Small_Script({ 
  subsets: ["khitan-small-script"],
  weight: "400",
});

const montserrat = Montserrat({ 
  subsets: ["latin"],
  weight: ["100", "400", "700"], // Specify the weights you need
});

const titilliumWeb = Titillium_Web({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "900"], // Specify the weights you need
});

export const metadata = {
  title: "Johina's Web",
  description: "Artist Johina Concheso's portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={titilliumWeb.className}>
        <TitleBar />
        {/* <NavBar /> */}
        {children}
      </body>
    </html>
  );
}