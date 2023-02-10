import { useContext } from 'react'
import { useState } from 'react'
import { myContext } from '../context'
import close from '../images/close.png'

export default function ModalConfirmation(props){

    const {amountToBet,setModalConfirmation,setModalConfirmated,setSelected,selected,email,type,amountMultiple,setBalance} = props
    const {dark} = useContext(myContext)

    const [error,setError] = useState(0)

    function cancel(){
        setModalConfirmation(false)
    }

    function goToConfirmated(){

        if(selected.length === 0)
            setError(3)

        else if(type === 'simple'){

            var bets = []

            selected.map(({id,gameId,amount}) => {
                bets = [...bets,{id: id,amount: amount}]
            })

            const bet = { user: email, type: type, bets: bets }

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
                    setBalance(prevBalance => prevBalance - amountToBet)
                    setModalConfirmation(false)
                    setModalConfirmated(true)
                    setSelected([])
                }
                else if(data.confirmed == '1'){
                    setError(1)
                }
                else{
                    setError(2)
                }
            })
            .catch((error) => {
                console.error('Error:', error)
            })
        }
        
        else{
            var ids = []

            selected.map(({id,gameId,amount}) => {
                ids = [...ids,{id: id}]
            })

            if(ids.length < 20){

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
                    else if(data.confirmed == '1'){
                        setError(1)
                    }
                    else{
                        setError(2)
                    }
                })
                .catch((error) => {
                    console.error('Error:', error)
                })
            }
            else{
                setError(4)
            }
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
                    {error === 1 && <p className='error'>Aposta Múltipla no mesmo jogo proibida</p>}
                    {error === 2 && <p className='error'>Saldo insuficiente</p>}
                    {error === 3 && <p className='error'>Sem apostas para apostar</p>}
                    {error === 4 && <p className='error'>Máximo de 20 apostas numa aposta múltipla</p>}
                    {error === 0 && <p className={`hide${dark}`}>Hide</p>}
                </div>
                <button className="confirmButton" onClick={goToConfirmated}>Confirmar</button>
            </div>
        </div>
    )
}