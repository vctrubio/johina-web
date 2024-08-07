import { Inter } from "next/font/google";
import "../globals.css";
import NavBar from "../../components/NavBar";
import TitleBar from "../../components/TitleBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Johina Murals",
  description: "Artist Johina Murals",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TitleBar />
        <NavBar />
        {children}
      </body>
    </html>
  );
}
