import BetBox from './BetBox'

import { useState } from 'react'


export default function Bet(props){

    const {type,game,date,results} = props

    const selectedResultsDefault = results.map( result => ({...result,selected:false}))
    const [selectedResults,setSelectedResults] = useState(selectedResultsDefault)

    function changeSelected(id){

        setSelectedResults( prevSelected => {
            return prevSelected.map( result => {
                return result.id === id ? {...result,selected: !result.selected} : result
            })
        })

    }

    const resultsBoxes = selectedResults.map( ({id,result,odd,selected}) => 
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