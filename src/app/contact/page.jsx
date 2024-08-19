import { Icons } from "@/components/info";
import { ContactCard } from "@/lib/contactInfo";

const Helloworld = () => {
    return ( <div className="p-5">
        <Icons contacts={ContactCard}/>
    </div> );
}
 
export default Helloworld;