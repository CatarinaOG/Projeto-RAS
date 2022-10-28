import BetBox from './BetBox'

import { useState } from 'react'


export default function Bet(props){

    const {type,game,date,results} = props.game
    const changeBets = props.changeBets
    const bets = props.bets



    function changeSelected(id){

        changeBets( prevSelected => {
            return prevSelected.map( result => {
                return result.id === id ? {...result,selected: !result.selected} : result
            })
        })

    }

    const resultsBoxes = bets.map( ({id,result,odd,selected}) => 
        <BetBox 
            key={id}
            id={id}
            result={result}
            odd={odd}
            selected={selected}
            changeSelected={changeSelected}
        />
    )

    return(
        <div className="bet">
            <div className="info">
                <h3>{game}</h3>
                <p>{date}</p>
            </div>
            <div className="results">
                {resultsBoxes}
            </div>
        </div>

    )

}