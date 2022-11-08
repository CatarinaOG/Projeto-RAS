import close from '../images/close.png'

export default function ModalConfirmated(props){

    const {setModalConfirmated} = props

    function cancel(){

        setModalConfirmated(false)

    }


    return (
        <div>
            <div className="backgroundModal">
            </div>
            <div className="boxConfirm">
                <img className='close' onClick={cancel} src={close}/>
                <h1 className="titleModal">Confirmado</h1>
                <p className="paragraphModalConfirmated">Aposta realizada com sucesso!</p>

            </div>
        </div>
    )
}