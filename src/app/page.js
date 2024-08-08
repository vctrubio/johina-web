import Image from "next/image";
import { fetchAllContenful } from "@/lib/fetchQueries";

export default async function Home() {
  const data = fetchAllContenful();

  const murals = (await data).muralCollection.items;
  console.log(murals);

  return (
    <div>
      hello home ladies
    </div>
  );
}
