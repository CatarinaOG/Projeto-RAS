import close from '../images/close.png'

export default function ModalConfirmation(props){

    const {setModalWarningActive,setModalChangeOdd} = props

    function cancel(){
        setModalWarningActive(false)
    }

    function confirm(){
        setModalWarningActive(false)
        setModalChangeOdd(true)
    }

    return (
        <div>
            <div className="backgroundModal2">
            </div>
            <div className="boxConfirm">
                <img className='close' onClick={cancel} src={close}/>
                <h1 className="titleModal">Alteração de Odd de Jogo Ativo</h1>
                <div className='buttonsModal'>
                    <button onClick={confirm}>Confirmar</button>
                    <button onClick={cancel}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}