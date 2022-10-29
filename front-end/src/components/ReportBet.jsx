import { useState } from 'react'

import close from '../images/close.png'

export default function ReportBet(props){

    const {id,games,game,bet,type,selected,setSelected} = props
    const {home,away,date,results} = game

    // Remove uma aposta das selecionadas
    function removeBet() {

        setSelected( prevSelected => prevSelected.filter( s => s.id !== id))

    }
    
    // Altera o valor apostado numa aposta na lista de selecionadas
    function changeAmount(event){

        setSelected( selected.map( elem => {

                if(elem.id === id)
                    return {...elem,amount: event.target.value}
                else
                    return elem
            })
        )

    }

    return(

        <div>
            <div className='top'>
                <p className='game'>{home} vs {away}</p>
                <img className='close' onClick={removeBet} src={close}/>
            </div>

            <div className='bottom'>
                <p className='reportBet'>Aposta: {bet.result}</p>
                <p className='quote'>Cota: {bet.odd}</p>
                {type === 'simple' && <input className='amount' type='number' placeholder='Valor' onChange={changeAmount}></input>}
            </div>
        </div>

    )


}