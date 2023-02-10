import { useContext } from 'react'
import { useState } from 'react'
import { myContext } from '../context'
import close from '../images/close.png'

export default function ModalChangeOdd(props){

    const {games,oddToChange,setModalChangeOdd,setModalChangeOddConfimation,setGames} = props
    const {dark} = useContext(myContext)

    const [newOdd,setNewOdd] = useState()
    const [error,setError] = useState(0)

    function cancel(){
        setModalChangeOdd(false)
    }

    function confirm(){

        if(newOdd >= 0){
            setError(0)

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

                    fetch('http://127.0.0.1:8080/api/games/', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    })
                    .then(response => response.json())
                    .then(data => {
                        if(data.games){
                            setGames(data.games)
                        }
                    })
                    .catch((error) => {
                    console.error('Error:', error);
                    });

                    setModalChangeOdd(false)
                    setModalChangeOddConfimation(true)
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        }
        else{
            setError(1)
        }
        
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
            <div className={`backgroundModal2${dark}`}>
            </div>
            <div className={`boxConfirm${dark}`}>
                <img className='close' onClick={cancel} src={close}/>
                <h1 className="titleModal">Alteração de Odd</h1>
                <p className="paragraphModalConfirmation2">Alterar odd na aposta:</p>
                <button className='betChangeOdd'>{getBet()}</button>
                <input type='number' className='newOdd' onChange={changeOdd} placeholder='nova odd'></input>
                {error === 1 && <p className='errorChangeOdd'>Odd não pode ser negativa</p>}
                <div className='buttonsModal'>
                    <button onClick={confirm}>Confirmar</button>
                    <button onClick={cancel}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}