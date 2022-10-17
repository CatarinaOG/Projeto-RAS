
import { useNavigate } from "react-router-dom";
import '../styles/navBar.css'

export default function Link({search,highlight}){

    const navigate = useNavigate();
    const link = "";

    function goToNewSearch(){
        navigate(link)
    }

    return(

        <h3 
            className={highlight ? 'searchItemHighlighted' : 'searchItem'}
            onClick={goToNewSearch}>{search}</h3>


    )
}