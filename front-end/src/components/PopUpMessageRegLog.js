import { useState } from "react";

import closeImg from '../images/close.png'

export default function PopUpMessage(props){
    const {setStateOp,message,setMethod,setShowPopUp} = props;
    function close(){
        
    }
    return(
        <div>
            <h1 className='fth1Pop'>{message}</h1>     
            <img src = {closeImg} className='close' onClick={close}/>

        </div>
    )
}
