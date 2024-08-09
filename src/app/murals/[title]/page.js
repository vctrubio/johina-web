import { slugTitle, titleSlug } from "@/utils";
import { fetchMuralById } from "@/lib/fetchQueries"

const MuralId = ({params}) => {
    const titleId = slugTitle(params.title);
    console.log('params', titleId);
    let ptr;
    
    try {
        ptr = fetchMuralById(titleId).then(data => {
            
            console.log('hello...', data['muralCollection']['items']);
            return data['muralCollection']['items'];
        })
    } catch (e) {
        console.log(e);
        return <>NO data found</>
    }

    return (
        <>
            you have hit the g spot
        </>
    );
}

export default MuralId;


/*
singular call to contentful and get by id

*/