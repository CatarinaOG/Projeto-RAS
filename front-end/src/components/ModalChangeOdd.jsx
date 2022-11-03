import { useState } from 'react'
import { useActionData } from 'react-router-dom'
import close from '../images/close.png'

export default function ModalChangeOdd(props){

    const {games,oddToChange,setModalChangeOdd,setModalChangeOddConfimation} = props

    const [newOdd,setNewOdd] = useState()

    function cancel(){
        setModalChangeOdd(false)
    }

    function confirm(){

        const odd = {id: oddToChange.id, odd: newOdd}

        fetch('http://127.0.0.1:8080/api/bets/changeOdd', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(odd),
        })
        .then(response => response.json())
        .then(data => {
            if(data.confirmed === 'true')
                setModalChangeOdd(false)
                setModalChangeOddConfimation(true)
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        
    }

    function changeOdd(event){

        setNewOdd(Number(event.target.value))

    }

    function getBet(){

        const game = games.find( game => game.id === oddToChange.gameId )
        const bet = game.results.find( result => result.id === oddToChange.id )

        return bet.result
    }

    return (
        <div>
            <div className="backgroundModal2">
            </div>
            <div className="boxConfirm">
                <img className='close' onClick={cancel} src={close}/>
                <h1 className="titleModal">Alteração de Odd</h1>
                <p className="paragraphModalConfirmation2">Alterar odd na aposta:</p>
                <button className='betChangeOdd'>{getBet()}</button>
                <input type='number' className='newOdd' onChange={changeOdd} placeholder='nova odd'></input>
                <div className='buttonsModal'>
                    <button onClick={confirm}>Confirmar</button>
                    <button onClick={cancel}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}