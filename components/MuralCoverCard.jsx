import Image from "next/image";
import Link from "next/link";
import { titleSlug } from "@/utils";

export const MuralCard = (prop) => {
    const { title } = prop.prop
    const cover = prop.prop.photosCollection.items[0]

    if (!cover)
        return <>[NO IMAGE ERROR]</>

    const coverUrl = cover.url
    const muralId = titleSlug(title);

    return (
        <Link href={`/murals/${muralId}`}>
            <div className="m-card">
                <Image src={coverUrl} alt="Mural Cover" width={300} height={300} />
                <h2>{title}</h2>
            </div>
        </Link>
    );
}