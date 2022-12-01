import { useState } from "react"

import ReportBet from './ReportBet'
import SimpleInput from './SimpleInput'
import PlaceBet from './PlaceBet'
import ModalConfirmation from "./ModalConfirmation"
import ModalConfirmated from "./ModalConfirmated"
import ReportBetMotoGP from "./ReportBetMotoGP"



export default function Report(props){

    const {games,selected,email,setBalance,setSelected,dark} = props

    const [type,setType] = useState('simple')                   // Utilizado para saber o tipo de aposta (simples vs multipla)
    const [amountMultiple, setAmountMultiple] = useState(0)     // Utilizado para guardar o amount da aposta múltipla

    const [modalConfirmation,setModalConfirmation] = useState(false)    // modal confirmação
    const [modalConfirmated,setModalConfirmated] = useState(false)      // modal confirmado


    // Mudança do tipo de aposta (simples vs multipla)
    function changeType(event){

        if (event.target.id == 'simple') setType('simple')
        else setType('multiple')

    }

    // Obtem valor total a apostar
    function getAmountToBet(){

        var sum = 0;

        if(type == 'simple') selected.map( elem => {sum += Number(elem.amount)})
        else sum = amountMultiple

        return Number(sum)
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

        var quota = getQuotaMultiple()
        return quota * amountMultiple

    }

    
    // Calcula a cota de uma aposta múltipla
    function getQuotaMultiple(){

        var sumOdds = 1

        selected.map( elem => {

            var game = games.find( game => game.id === elem.gameId )
            var bet = game.results.find( result => result.id === elem.id )

            sumOdds *= bet.odd
        })

        if (selected.length === 0) return 0
        return sumOdds;
    }


    // Mostra todas as apostas selecionadas
    const reportBets = selected.map( betSelected => {
        
        const {sport,id,gameId,amount} = betSelected
        const game = games.find( game => game.id === gameId )
        const bet = game.results.find( result => result.id === id )

        if(sport === 'motoGP'){
            return(
                <div className={`fullReportBet${dark}`} >
                <ReportBetMotoGP
                    key={id}
                    id={id}
                    games={games}
                    game={game}
                    bet={bet}
                    type={type}
                    selected={selected}
                    setSelected={setSelected}
                    dark={dark}
                />
            </div>
            )
        }else{
            return(
                <div className={`fullReportBet${dark}`} >
                    <ReportBet 
                        key={id}
                        id={id}
                        games={games}
                        game={game}
                        bet={bet}
                        type={type}
                        selected={selected}
                        setSelected={setSelected}
                        dark={dark}
                    />
                </div>
            )
        }
    } )


    return(
        <div>
            {modalConfirmation && 
                <ModalConfirmation 
                    amountToBet={getAmountToBet()}
                    setModalConfirmation={setModalConfirmation}
                    setModalConfirmated={setModalConfirmated} 
                    selected={selected}
                    setSelected={setSelected}
                    email={email}
                    type={type}
                    amountMultiple={amountMultiple}
                    setBalance={setBalance}
                    dark={dark}
                />
            }

            {modalConfirmated && 
                <ModalConfirmated 
                    setModalConfirmated={setModalConfirmated} 
                    dark={dark}
                />
            }

            <div className={`main${dark}`}>
                <h1 className="title">Boletim</h1>
                <div className="buttons">
                    <button id='simple' className={ type == 'simple' ? "typeSelected" : 'typeNotSelected'} onClick={changeType}>Simples</button>
                    <button id='multiple' className={ type == 'multiple' ? "typeSelected" : 'typeNotSelected'} onClick={changeType}>Múltiplas</button>
                </div>
                <div className={type == 'simple' ? "reportBetsSingle" : "reportBetsMultiple"}>
                    {reportBets}
                </div>
                {type === 'multiple' && 
                    <SimpleInput 
                        quote={getQuotaMultiple()} 
                        setAmountMultiple={setAmountMultiple}
                        dark={dark}
                    />
                }
                <PlaceBet 
                    setModalConfirmation={setModalConfirmation} 
                    gains={ type === 'simple' ? getGainsSimple() : getGainsMultiple()}
                    dark={dark}
                />
            </div>

        </div>
    )
}