import { useContext } from "react"
import { myContext } from "../context"
import SingleBetHist from "./SingleBetHist"

export default function BetHistoryBox(props){

    const {bet,ammount,winnings} = props
    const {dark} = useContext(myContext)

    
    // variavel cujo valor é obtido ao percorrer a variavel bet, criando instancias do componente SingleBetHist para cada uma das apostas
    const betResults = bet.map(result => 
        <SingleBetHist
            name = {result.name}
            winner = {result.winner}
        />
    )
    const notNull = true

    const winnin = () => {
        if(winnings===-1)
            return "pending"
        else return winnings
    }

    if(notNull){
        return(
            <div className={`ftbetHistBox${dark}`}>
                <div className={`ftbetHistInfo${dark}`}>
                    {betResults}
                </div>
                <div className="ftResultsInfo">
                    <h3 className={`fth3SingleBetHist${dark}`}>Montante apostado :{ammount}</h3>
                    <h3 className={`fth3SingleBetHist${dark}`}>Total ganho : {winnin()}</h3>
                </div>
            </div>
        )
    }
    else{
        return(<div></div>)
    }

}