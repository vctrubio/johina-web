'use client'
import Image from "next/image";

export const MuralCard = ({ cover }) => {
    if (!cover)
        return <>[NO IMAGE ERROR]</>
    
    window.cover = cover
    const coverUrl = cover.url
    window.cover = coverUrl

    return (<div className="m-card">

    </div>);
}
