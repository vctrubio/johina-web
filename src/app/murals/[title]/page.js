import { slugTitle, titleSlug } from "@/utils";
import { fetchMuralById } from "@/lib/fetchQueries"

const MuralId = async ({ params }) => {
    let ptr;

    try {
        ptr = await fetchMuralById(slugTitle(params.title))
        ptr = ptr['muralCollection']['items'][0];
    } catch (e) {
        return <>NO data found</>
    }

    return (
        <div className="border ">
            {ptr ? (
                <>
                    <h1>Title: {ptr.title}</h1>
                    <p>Description: {ptr.description}</p>
                    <p>Location: {ptr.location}</p>
                    <p>Close Up: {ptr.closeUp}</p>
                    <p>Photos Count: {ptr.photosCollection.items.length}</p>
                </>
            ) : <h1>Not found page</h1>}
        </div>
    );
}

export default MuralId;


/*
singular call to contentful and get by id

*/