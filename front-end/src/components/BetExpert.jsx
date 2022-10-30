import BetBoxExpert from './BetBoxExpert'

import { useState } from 'react'


export default function BetExpert(props){

    const {games,gameId,game,setModalWarningActive,setOddToChange,setModalChangeOdd} = props
    const {home,away,date,results} = game

    // Criação das caixas de resultado
    const resultsBoxes = results.map( ({id,result,odd}) => 
        <BetBoxExpert 
            key={id}
            id={id}
            games={games}
            gameId={gameId}
            result={result}
            odd={odd}
            setModalWarningActive={setModalWarningActive}
            setModalChangeOdd={setModalChangeOdd}
            setOddToChange={setOddToChange}
        />
    )

    return(
        <div className="bet">
            <div className="info">
                <h3>{home} vs {away}</h3>
                <p>{date}</p>
            </div>
            <div className="results">
                {resultsBoxes}
            </div>
        </div>

    )

}