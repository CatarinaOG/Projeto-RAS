import { useState } from "react"

import ReportBet from './ReportBet'
import SimpleInput from './SimpleInput'
import PlaceBet from './PlaceBet'
import ModalConfirmation from "./ModalConfirmation"
import ModalConfirmated from "./ModalConfirmated"



export default function Report(props){

    const {games,selected,setSelected} = props

    const [type,setType] = useState('simple')                   // Utilizado para saber o tipo de aposta (simples vs multipla)
    const [amountMultiple, setAmountMultiple] = useState(0)     // Utilizado para guardar o amount da aposta múltipla

    const [modalConfirmation,setModalConfirmation] = useState(false)    // modal confirmação
    const [modalConfirmated,setModalConfirmated] = useState(false)      // modal confirmado


    // Mudança do tipo de aposta (simples vs multipla)
    function changeType(event){

        if (event.target.id == 'simple') setType('simple')
        else setType('multiple')

    }

    // Obtem o ganho de apostas simples
    function getGainsSimple(){

        var sum = 0;

        selected.map( elem => {

            var game = games.find( game => game.id === elem.gameId )
            var bet = game.results.find( result => result.id === elem.id )

            sum += (elem.amount * bet.odd)
        })

        return Number(sum)
    }

    // Obtem o ganho de aposta multipla
    function getGainsMultiple(){

        var sumOdds = 0

        selected.map( elem => {

            var game = games.find( game => game.id === elem.gameId )
            var bet = game.results.find( result => result.id === elem.id )

            sumOdds += bet.odd
        })

        sumOdds *= 1.5

        return sumOdds * amountMultiple
    }

    
    // Calcula a cota de uma aposta múltipla
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


    // Mostra todas as apostas selecionadas
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
        <div>
            {modalConfirmation && 
                <ModalConfirmation 
                    setModalConfirmation={setModalConfirmation}
                    setModalConfirmated={setModalConfirmated} 
                />
            }

            {modalConfirmated && 
                <ModalConfirmated 
                    setModalConfirmated={setModalConfirmated} 
                />
            }

            <div className="main">
                <h1 className="title">Boletim</h1>
                <div className="buttons">
                    <button id='simple' className={ type == 'simple' ? "typeSelected" : 'typeNotSelected'} onClick={changeType}>Simples</button>
                    <button id='multiple' className={ type == 'multiple' ? "typeSelected" : 'typeNotSelected'} onClick={changeType}>Múltiplas</button>
                </div>
                <div className={type == 'simple' ? "reportBetsSingle" : "reportBetsMultiple"}>
                    {reportBets}
                </div>
                {type === 'multiple' && <SimpleInput quote={getQuotaMultiple()} setAmountMultiple={setAmountMultiple}/>}

                <PlaceBet 
                    setModalConfirmation={setModalConfirmation} 
                    gains={ type === 'simple' ? getGainsSimple() : getGainsMultiple()}
                />
            </div>

        </div>
    )
}