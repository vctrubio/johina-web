import { fetchAllContenful } from "@/lib/fetchQueries";
import { MuralCard } from "@/components/MuralCoverCard";

const MuralsContainer = async () => {
    const data = fetchAllContenful();
    const murals = (await data).muralCollection.items;
    // console.log(murals);

    return (<div className="m-container">
        {murals.map((mural) => (
            <div key={mural.title} className="m-item">
                <MuralCard prop={mural} />
            </div>
        ))}
        
    </div>);
}

export default MuralsContainer;


/*

    <div className="m-container">
      {murals.map((mural, index) => (
        <div key={index} className="m-item">
          <h2>title: {mural.title}</h2>
          <p>description: {mural.description}</p>
          <p>Location: {mural.location}</p>
          <p>Close Up: {mural.closeUp ? 'Yes' : 'No'}</p>
          <p>Photo count: {mural.photosCollection.items.length}</p>
          <MuralCard cover={mural.photosCollection.items[0]} />
        </div>
      ))}
    </div>

*/