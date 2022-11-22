import SingleBetHist from "./SingleBetHist"

export default function BetHistoryBox(){

    //const {results,ammount,winnings} = props.game

    
    // Criação das caixas de resultado
    

    var notNull = true
    
    //cada results será uma lista de result em que 
    // -> temos participant A
    // -> temos participant B
    // OU
    // -> temos nome do evento
    // e temos o vencedor
    // montante apostado e total de ganhos
    /*
    const betResults = results.map(({result}) => 
        <SingleBetHist
            name = {result.name}
            winner = {result.winner}
        />
    )*/

    const bet1 = <SingleBetHist name = "Sporting vs Varzim" winner = "Sporting" />
    const bet2 = <SingleBetHist name = "Malasya GP 2022" winner = "M. Oliveira" />

    const ammount = 4;
    const winnings = 10;

    if(notNull){
        return(
            <div className="ftbetHistBox">
                <div className="ftbetHistInfo">
                    {bet1}
                    {bet2}
                    {bet2}

                </div>
                <div className="ftResultsInfo">
                    <h3>Montante apostado :{ammount}</h3>
                    <h3>Total ganho : {winnings}</h3>

                </div>
            </div>
        )
    }
    else{
        return(<div></div>)
    }

}