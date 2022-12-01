import close from '../images/close.png'

export default function ModalConfirmedChange(props){

    const {setConfirmed} = props

    function cancel(){
        setConfirmed(false)
    }


    return (
        <div>
            <div className="backgroundModalExpert"></div>
            <div className="boxConfirmExpert">
                <img className='close' onClick={cancel} src={close}/>
                <h1 className="titleModal">Confirmado</h1>
                <p className="paragraphModalConfirmated">Finalização do jogo efetuada com sucesso!</p>
            </div>
        </div>
    )
}