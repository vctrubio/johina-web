import { Noto_Serif_Khitan_Small_Script } from "next/font/google";
import "../globals.css";
import NavBar from "../../components/NavBar";
import TitleBar from "../../components/TitleBar";

const notoSerifKhitan = Noto_Serif_Khitan_Small_Script({ 
  subsets: ["khitan-small-script"],
  weight: "400",
});

export const metadata = {
  title: "Johina Murals",
  description: "Artist Johina Murals",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={notoSerifKhitan.className}>
        <TitleBar />
        <NavBar />
        {children}
      </body>
    </html>
  );
}