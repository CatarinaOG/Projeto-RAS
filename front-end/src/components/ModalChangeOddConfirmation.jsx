import close from '../images/close.png'

export default function ModalChangeOddConfirmation(props){

    const {setModalChangeOddConfimation,dark} = props


    function cancel(){
        setModalChangeOddConfimation(false)
    }


    return (
        <div>
            <div className={`backgroundModal2${dark}`}>
            </div>
            <div className="boxConfirm">
                <img className='close' onClick={cancel} src={close}/>
                <h1 className="titleModal">Odd Alterada com Sucesso!</h1>
            </div>
        </div>
    )
}