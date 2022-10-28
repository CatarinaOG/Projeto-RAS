import { useState } from "react"

import ReportBet from './ReportBet'
import SimpleInput from './SimpleInput'
import PlaceBet from './PlaceBet'


export default function Report(props){

    const {games,selected,setSelected} = props

    const [type,setType] = useState('simple')
    const [valueMultiple, setValueMultiple] = useState(0)

    function changeType(event){

        if (event.target.id == 'simple') setType('simple')
        else setType('multiple')

    }

    function getGainsSimple(){

        var sum = 0;

        selected.map( elem => {

            var game = games.find( game => game.id === elem.gameId )
            var bet = game.results.find( result => result.id === elem.id )

            sum += (elem.amount * bet.odd)
        })

        return Number(sum)
    }

    function getGainsMultiple(){

        var sumOdds = 0

        selected.map( elem => {

            var game = games.find( game => game.id === elem.gameId )
            var bet = game.results.find( result => result.id === elem.id )

            sumOdds += bet.odd
        })

        sumOdds *= 1.5

        return sumOdds * valueMultiple
    }

    function getQuotaMultiple(){

        var sumOdds = 0

        selected.map( elem => {

            var game = games.find( game => game.id === elem.gameId )
            var bet = game.results.find( result => result.id === elem.id )

            sumOdds += bet.odd
        })

        sumOdds *= 1.5

        return sumOdds;
    }

    const reportBets = selected.map( betSelected => {
        
        const {id,gameId,amount} = betSelected
        const game = games.find( game => game.id === gameId )
        const bet = game.results.find( result => result.id === id )

        return(
            <div className="fullReportBet">
                <ReportBet 
                    key={id}
                    id={id}
                    games={games}
                    game={game}
                    bet={bet}
                    type={type}
                    selected={selected}
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
            {type === 'multiple' && <SimpleInput quote={getQuotaMultiple()} setValueMultiple={setValueMultiple}/>}

            <PlaceBet gains={ type === 'simple' ? getGainsSimple() : getGainsMultiple()}/>
        </div>
    )
}