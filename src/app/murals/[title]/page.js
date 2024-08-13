import { slugTitle, titleSlug } from "@/utils";
import { fetchMuralById } from "@/lib/fetchQueries"

const MuralIdPhotos = ({ photos }) => {
    return (
        <div className="mural-id-photos">
            {photos.map((photo, index) => (
                <img key={index} src={photo.url} alt={photo.title}  />
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

    return (
        <div className="border" style={{ margin: 'auto' }}>
            {ptr ? (
                <div className="mural-id-container">
                    <h1>{ptr.title}</h1>
                    <MuralIdPhotos photos={ptr.photosCollection.items} />
                    <div className="elements">
                        <p>{ptr.description} asldjlaksdja asd f asdf asfd as dfasasldjlaksdja asd f asdf asfd as dfas dasldjlaksdja asd f asdf asfd as dfas dasldjlaksdja asd f asdf asfd as dfas dasldjlaksdja asd f asdf asfd as dfas dasldjlaksdja asd f asdf asfd as dfas dasldjlaksdja asd f asdf asfd as dfas d d asldjlaksdja asd f asdf asfd as dfas d</p>
                        <p style={{minWidth: '140px', height: '42px', textAlign: 'right', border: '1px solid black', paddingRight: '2px'}}>Location: {ptr.location}</p>
                    </div>
                </div>
            ) : <h1>Not found page</h1>}
        </div>
    );
}

export default MuralId;

