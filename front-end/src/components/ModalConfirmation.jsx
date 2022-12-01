import { useState } from 'react'
import close from '../images/close.png'

export default function ModalConfirmation(props){

    const {amountToBet,setModalConfirmation,setModalConfirmated,setSelected,selected,email,type,amountMultiple,setBalance,dark} = props

    const [error,setError] = useState(0)

    function cancel(){
        setModalConfirmation(false)
    }

    function goToConfirmated(){

        if(selected.length === 0)
            setError(2)

        else if(type === 'simple'){

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
                        setBalance(prevBalance => prevBalance - amount)
                        setModalConfirmation(false)
                        setModalConfirmated(true)
                        setSelected([])
                    }
                    else {
                        setError(1)
                        //Adicionar outros erros
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
                    setBalance(prevBalance => prevBalance - amountMultiple)
                    setModalConfirmation(false)
                    setModalConfirmated(true)
                    setSelected([])
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
            <div className={`backgroundModal${dark}`}>
            </div>
            <div className={`boxConfirm${dark}`}>
                <img className='close' onClick={cancel} src={close}/>
                <h1 className="titleModal">Confirmação</h1>
                <p className={`paragraphModalConfirmation2${dark}`}>Confirmação do Pagamento no valor de:</p>
                <p className={`valueConfirmation${dark}`}>{amountToBet}$</p>
                <div className='errorsBox'>
                    {error === 1 && <p className='error'>Saldo insuficiente ou Aposta Múltipla Inválida</p>}
                    {error === 2 && <p className='error'>Sem apostas para apostar</p>}
                    {error === 3 && <p className='error'>Apostas com valor mínimo superior a 0</p>}
                    {error === 0 && <p className={`hide${dark}`}>Hide</p>}
                </div>
                <button className="confirmButton" onClick={goToConfirmated}>Confirmar</button>
            </div>
        </div>
    )
}