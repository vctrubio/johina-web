import { createClient } from 'contentful';
import Image from "next/image";

if (!process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || !process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN) {
  throw new Error('Missing Contentful environment variables');
}

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

async function getData() {
  try {
    const entries = await client.getEntries();
    return entries.items;
  } catch (error) {
    // This will activate the closest `error.js` Error Boundary
    console.error('Error fetching data from Contentful:', error);
    throw new Error('Failed to fetch data from Contentful');
  }
}

export default function Home() {
  const data = getData()
  data.then((data) => {
    console.log('data', data)
  })

  return (
    <div>
      hello home ladies
    </div>
  );
}
