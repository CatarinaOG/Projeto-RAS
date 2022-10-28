import { useState } from "react"

import ReportBet from './ReportBet'
import SimpleInput from './SimpleInput'
import PlaceBet from './PlaceBet'


export default function Report(props){

    const {games,selected,setSelected} = props

    const [type,setType] = useState('simple')


    function changeType(event){

        if (event.target.id == 'simple') setType('simple')
        else setType('multiple')

    }

    const reportBets = selected.map( betSelected => {
        
        const {id,gameId} = betSelected
        const bet = games[gameId].results.find( result => result.id === id )

        return(
            <div className="fullReportBet">
                <ReportBet 
                    key={id}
                    id={id}
                    game={games[gameId]}
                    bet={bet}
                    type={type}
                    setSelected={setSelected}
                />
            </div>
        )


            
    } )

    return(

        <div className="main">
            <h1 className="title">Boletim</h1>
            <div className="buttons">
                <button id='simple' className={ type == 'simple' ? "typeSelected" : 'typeNotSelected'} onClick={changeType}>Simples</button>
                <button id='multiple' className={ type == 'multiple' ? "typeSelected" : 'typeNotSelected'} onClick={changeType}>Múltiplas</button>
            </div>
            <div className={type == 'simple' ? "reportBetsSingle" : "reportBetsMultiple"}>
                {reportBets}
            </div>
            {type === 'multiple' && <SimpleInput quote='1,19'/>}

            <PlaceBet gains='2,30'/>
        </div>
    )
}