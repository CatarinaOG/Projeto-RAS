import { useState } from 'react'
import close from '../images/close.png'

export default function ModalConfirmation(props){

    const {amountToBet,setModalConfirmation,setModalConfirmated,selected,email,type,amountMultiple,setBalance} = props

    const [error,setError] = useState(0)

    function cancel(){
        setModalConfirmation(false)
    }

    function goToConfirmated(){

        if(type === 'simple'){

            selected.map(({id,gameId,amount}) => {

                const value = Number(amount)
                const bet = { user: email, type: type, multipleAmount: value, bets: [{id: id}] }

                fetch('http://127.0.0.1:8080/api/bets/placeBet',  {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bet),
                })
                .then(response => response.json(bet))
                .then(data => {
                    if(data.confirmed == 'true'){
                        console.log(amountToBet)
                        setBalance(prevBalance => prevBalance - amount)
                        setModalConfirmation(false)
                        setModalConfirmated(true)
                    }
                    else {
                        setError(1)
                    }
                })
                .catch((error) => {
                console.error('Error:', error)
                })
            })
        }
        else{

            var ids = []

            selected.map(({id,gameId,amount}) => {
                ids = [...ids,{id: id}]
            })

            const bet = { user: email, type: type, multipleAmount: amountMultiple, bets: ids }

            fetch('http://127.0.0.1:8080/api/bets/placeBet',  {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bet),
            })
            .then(response => response.json(bet))
            .then(data => {
                if(data.confirmed == 'true'){
                    setModalConfirmation(false)
                    setModalConfirmated(true)
                }
                else{
                    setError(1)
                }
            })
            .catch((error) => {
            console.error('Error:', error)
            })
            
        }
    }

    return (
        <div>
            <div className="backgroundModal">
            </div>
            <div className="boxConfirm">
                <img className='close' onClick={cancel} src={close}/>
                <h1 className="titleModal">Confirmação</h1>
                <p className="paragraphModalConfirmation2">Confirmação do Pagamento no valor de:</p>
                <p className="valueConfirmation">{amountToBet}$</p>
                {error === 1 && <p className='error'>Saldo insuficiente ou Aposta Múltipla Inválida</p>}
                <button className="confirmButton" onClick={goToConfirmated}>Confirmar</button>
            </div>
        </div>
    )
}