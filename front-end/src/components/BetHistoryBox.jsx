import SingleBetHist from "./SingleBetHist"

export default function BetHistoryBox(props){

    const {bet,ammount,winnings,dark} = props

    
    
    const betResults = bet.map(result => 
        <SingleBetHist
            name = {result.name}
            winner = {result.winner}
            dark = {dark}
        />
    )
    const notNull = true


    if(notNull){
        return(
            <div className={`ftbetHistBox${dark}`}>
                <div className={`ftbetHistInfo${dark}`}>
                    {betResults}
                </div>
                <div className="ftResultsInfo">
                    <h3 className={`fth3SingleBetHist${dark}`}>Montante apostado :{ammount}</h3>
                    <h3 className={`fth3SingleBetHist${dark}`}>Total ganho : {winnings}</h3>

                </div>
            </div>
        )
    }
    else{
        return(<div></div>)
    }

}