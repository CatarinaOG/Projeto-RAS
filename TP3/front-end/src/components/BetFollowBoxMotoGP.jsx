import { useContext } from "react"
import { myContext } from "../context"

export default function BetFollowBoxMotoGP(props){

    const {result,odd} = props
    const {dark} = useContext(myContext)

    return(

        <div className={`resultBoxFollowMotoGP${dark}`} >
            <h3>{result}</h3>
            <p>{odd}</p>
        </div>
    )
}