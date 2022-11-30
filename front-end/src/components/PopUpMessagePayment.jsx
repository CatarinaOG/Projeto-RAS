import { useState } from "react";

import closeImg from '../images/close.png'

//PopUp de mensagem de sucesso ou insucesso do pagamento 
export default function PopUpMessage(props){
    const {setStateOp,message,setMethod,setShowPopUp,dark} = props;

    function close(){
        if(message==="Operação bem sucedida!"){
            setMethod('');
        }
        else{
            setStateOp("");
        }
    }
    return(
        <div>
            <h1 className='fth1Pop'>{message}</h1>     
            <img src = {closeImg} className='close' onClick={close}/>

        </div>
    )
}
