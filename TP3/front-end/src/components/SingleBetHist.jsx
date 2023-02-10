import { useContext } from "react"
import { myContext } from "../context"

export default function SingleBetHist(props){

    const {name,winner} = props
    const {dark} = useContext(myContext)
    

    return(
        <div className = "ftSingleBetDiv" >
            <h4 className={`fth4SingleBetHist${dark}`}>{name}</h4>
            <p className={`ftpSingleBetHist${dark}`}>{winner}</p>
        </div>
    )
}