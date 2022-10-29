import close from '../images/close.png'

export default function ModalConfirmation(props){

    var value = 89
    const {setModalConfirmation,setModalConfirmated} = props

    function cancel(){

        setModalConfirmation(false)

    }

    function goToConfirmated(){

        setModalConfirmation(false)
        setModalConfirmated(true)
    }

    return (
        <div>
            <div className="backgroundModal">
            </div>
            <div className="boxConfirm">
                <img className='close' onClick={cancel} src={close}/>
                <h1 className="titleModal">Confirmação</h1>
                <p className="paragraphModalConfirmation">Confirmação do Pagamento no valor de:</p>
                <p className="valueConfirmation">{value}$</p>
                <button className="confirmButton" onClick={goToConfirmated}>Confirmar</button>
            </div>
        </div>
    )
}