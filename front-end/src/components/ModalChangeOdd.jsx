import close from '../images/close.png'

export default function ModalChangeOdd(props){

    const {games,oddToChange,setModalChangeOdd,setModalChangeOddConfimation} = props


    function cancel(){
        setModalChangeOdd(false)
    }

    function confirm(){

        console.log("enviar alteração de odd")
        setModalChangeOdd(false)
        setModalChangeOddConfimation(true)
        
        
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
                <input type='number' className='newOdd' placeholder='nova odd'></input>
                <div className='buttonsModal'>
                    <button onClick={confirm}>Confirmar</button>
                    <button onClick={cancel}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}