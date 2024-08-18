'use client'
import { slugTitle, titleSlug } from "@/utils";
import { fetchMuralById } from "@/lib/fetchQueries"
import Image from "next/image";
import SVG from 'react-inlinesvg';
import Location from "@/svgs/location.svg";

import { WhatsappShareButton, EmailShareButton, WhatsappIcon, EmailIcon } from 'react-share';

const MuralIdPhotos = ({ photos }) => {
    return (
        <div className="mural-id-photos">
            {photos.map((photo, index) => (
                <img key={index} src={photo.url} alt={photo.title} />
            ))}
        </div>
    );
}

const MuralId = async ({ params }) => {
    let ptr;

    try {
        ptr = await fetchMuralById(slugTitle(params.title))
        ptr = ptr['muralCollection']['items'][0];
    } catch (e) {
        return <>NO data found</>
    }

    // const shareUrl = window.location.href; // Current page URL
    const shareUrl = "1234"
    const title = ptr ? ptr.title : 'Check this out!';

    return (
        <div style={{ margin: 'auto', borderRadius: '10px', width: '90%' }}>
            {ptr ? (
                <div className="mural-id-container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h1>{ptr.title}</h1>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            {/* <WhatsappShareButton url={shareUrl} title={title}>
                                <WhatsappIcon size={34} round />
                            </WhatsappShareButton>
                            <EmailShareButton url={shareUrl} subject={title} body="Check this out!">
                                <EmailIcon size={34} round />
                            </EmailShareButton> */}
                            <div style={{ marginTop: '10px' }}>
                                <Image
                                    src="/share.svg"
                                    alt="Share"
                                    width={34}
                                    height={34}
                                />
                            </div>
                        </div>
                    </div>
                    <MuralIdPhotos photos={ptr.photosCollection.items} />
                    <div className="elements">
                        <p>{ptr.description} asldjlaksdja asd f asdf asfd as dfasasldjlaksdja asd f asdf asfd as dfas dasldjlaksdja asd f asdf asfd as dfas dasldjlaksdja asd f asdf asfd as dfas dasldjlaksdja asd f asdf asfd as dfas dasldjlaksdja asd f asdf asfd as dfas dasldjlaksdja asd f asdf asfd as dfas dasldjlaksdja asd f asdf asfd as dfas dasldjlaksdja asd f asdf asfd as dfas d d asldjlaksdja asd f asdf asfd as dfas d</p>
                        <div className="elements-info">
                            <div>
                                {ptr.location}
                                <SVG src={Location.src} width={20} height={20} />
                            </div>
                            <div >
                                "Category"
                            </div>
                        </div>
                    </div>
                </div>
            ) : <h1>Not found page</h1>}
        </div>
    );
}

export default MuralId;

