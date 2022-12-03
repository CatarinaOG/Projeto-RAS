import { useState } from "react";

import closeImg from '../images/close.png'

//PopUp de mensagem de sucesso ou insucesso do pagamento 
export default function PopUpMessage(props){
    const {message,setShowPopUp,dark} = props;

    function close(){
        setShowPopUp('')
    }
    return(
        <div>
            <h1 className={`fth1Pop${dark}`}>{message}</h1>     
            <img src = {closeImg} className='close' onClick={close}/>

        </div>
    )
}
