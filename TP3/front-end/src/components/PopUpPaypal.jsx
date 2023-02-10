import { useState } from "react";

import closeImg from '../images/close.png'
import PopUpMessagePayment from "./PopUpMessagePayment";

export default function PopUpPaypal(props){

    const {showPopUp,email,setBalance,setShowPopUp,dark} = props;

    //variaveis responsaveis por definir o popUp de confirmação ou erro
    const [stateOp,setStateOp] = useState("");
    const [message,setMessage] = useState("");

    //função que define showPopUp como '' de forma a fechar o popUp
    function close(){
        setShowPopUp('')
    }

    //form com informação a submeter no pedido HTTP POST
    const [formData, setFormData] = useState(
        {operation: showPopUp, email: "" ,operationValue:""}
    )
    
    function handleChange(event) {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name] : event.target.value
            }
        })
    }

    /**
     * É feita uma verificação do conteudo do form antes de efetuar o pedido HTTP POST, consoante a resposta, o valor de balance é alterado na front-end
     * @param {} event 
     */
    function handleSubmit(event){
        event.preventDefault();

        if(formData.email !== "" && formData.operationValue!== ""){           
            fetch('http://127.0.0.1:8080/api/transactions/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json ',
                },
                body: JSON.stringify({ 
                    operation: formData.operation,
                    email:formData.email,
                    email_user: email,
                    operationValue:formData.operationValue,
                    cardNum:0
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.confirmed === 'true'){
                setStateOp("success");
                setMessage("Operação bem sucedida!");
                if(formData.operation === 'transfer'){
                    setBalance(oldBalance => oldBalance - Number(formData.operationValue))
                }
                else{
                    setBalance(oldBalance => oldBalance + Number(formData.operationValue))
                }
            }
            else{
                setStateOp("error");
                setMessage("Erro! Verifique valor da conta");
            }
        });
        
    }
    else{
        setStateOp("error")
        setMessage("Dados incorretos, volte a tentar")
    }
}

    return(
        <div>
            {stateOp==="" && 
                <div>
                    <h1 className={`fth1Pop${dark}`}>Insira os dados</h1>
                    <form onSubmit={handleSubmit}>
                        <input onChange={handleChange} value={formData.email} name="email" type="email" className={`ftPaypalEmail${dark}`} placeholder="E-mail"></input>
                        <h4 className={`ftOperationValuePrompt${dark}`}>Valor a transferir</h4>
                        <input onChange={handleChange} value={formData.operationValue} name="operationValue" type="number" className={`ftOperationValue${dark}`} placeholder="Valor"></input>
                        <button className={`ftOperationButton${dark}`}>Confirm</button>
                    </form>
                    <img src = {closeImg} className='close' onClick={close}/>
                </div>
            }
            {stateOp === "success" && 
                <PopUpMessagePayment  message={message} setShowPopUp={setShowPopUp} dark={dark}></PopUpMessagePayment>}
            {stateOp === "error" && 
                <PopUpMessagePayment  message={message} setShowPopUp={setShowPopUp} dark={dark}></PopUpMessagePayment>}

        </div>
    )
}
