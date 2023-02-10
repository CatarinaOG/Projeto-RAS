import { useContext } from "react"
import { myContext } from "../context"


export default function BetFollowBox(props){

    const {result,odd} = props
    const {dark} = useContext(myContext)

    return(
        <div className='makeRelativa'>
            <div className={`resultBoxNotSelected${dark}`} >
                <h3>{result}</h3>
                <p>{odd}</p>
            </div>
        </div>
    )
}