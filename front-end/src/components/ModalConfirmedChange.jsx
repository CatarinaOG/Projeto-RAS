import close from '../images/close.png'

import { useNavigate } from 'react-router-dom'

export default function ModalConfirmedChange(props){

    const {setConfirmed,dark} = props

    let navigate = useNavigate()

    function cancel(){
        setConfirmed(false)
        navigate('/ShowGamesExpert', { replace: true })
    }


    return (
        <div>
            <div className={`backgroundModalExpert${dark}`}></div>
            <div className={`boxConfirmExpert${dark}`}>
                <img className='close' onClick={cancel} src={close}/>
                <h1 className="titleModal">Confirmado</h1>
                <p className="paragraphModalConfirmated">Finalização do jogo efetuada com sucesso!</p>
            </div>
        </div>
    )
}