import { useContext } from "react"
import { myContext } from "../context"




export default function BetBox(props){

    const {id,sport,gameId,result,odd,selected,changeSelected} = props
    const {dark} = useContext(myContext)
    
    function changeSelectedResults(){

        changeSelected(sport,id,gameId)

    }

    
    
    return(
        <div className='makeRelativa'>
            <div className={ selected ? `resultBoxSelected${dark}` : `resultBoxNotSelected${dark}`} onClick={changeSelectedResults}>
                <h3>{result}</h3>
                <p>{odd}</p>
            </div>
        </div>
    )
}