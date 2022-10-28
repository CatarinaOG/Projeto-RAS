import BetBox from './BetBox'

import { useState } from 'react'


export default function Bet(props){

    const {home,away,date,results} = props.game
    const setSelected = props.setSelected
    const selected = props.selected


    function changeSelected(id,gameId){

        var amount = 0

        if (!selected.find(bet => bet.id === id))
            setSelected( prevSelected => [...prevSelected,{id,gameId,amount}])
        
    }

    function getIfSelected(id){ 

        return (selected.find(bet => bet.id === id)) ? true : false
    }

    const resultsBoxes = results.map( ({id,result,odd}) => 
        <BetBox 
            key={id}
            id={id}
            gameId={props.gameId}
            result={result}
            odd={odd}
            selected={getIfSelected(id)}
            changeSelected={changeSelected}
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