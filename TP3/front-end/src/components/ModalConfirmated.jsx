import { useContext } from 'react'
import { myContext } from '../context'
import close from '../images/close.png'

export default function ModalConfirmated(props){

    const {setModalConfirmated} = props
    const {dark} = useContext(myContext)

    function cancel(){

        setModalConfirmated(false)

    }

    return (
        <div>
            <div className={`backgroundModal${dark}`}>
            </div>
            <div className={`boxConfirm${dark}`}>
                <img className='close' onClick={cancel} src={close}/>
                <h1 className="titleModal">Confirmado</h1>
                <p className="paragraphModalConfirmated">Aposta realizada com sucesso!</p>

            </div>
        </div>
    )
}