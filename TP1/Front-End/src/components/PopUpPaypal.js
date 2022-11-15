import { useState } from "react";

import closeImg from '../images/close.png'
import PopUpMessagePayment from "./PopUpMessagePayment";

export default function PopUpPaypal(props){

    const {setMethod,showPopUp,email,setBalance,setShowPopUp} = props;
    const [stateOp,setStateOp] = useState("");
    const [message,setMessage] = useState("");

    function close(){
        setMethod('');
    }

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

    function handleSubmit(event){
        event.preventDefault();
    

           
        fetch('http://127.0.0.1:8080/api/transactions/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json ',
            },
            body: JSON.stringify({ 
                operation: formData.operation,
                email:formData.email,
                email_user: email,
                operationValue:formData.operationValue
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.confirmed === 'true'){
                setStateOp("success");
                setMessage("Operação bem sucedida!");
                if(formData.operation === 'transfer'){
                    setBalance(oldBalance => oldBalance - Number(formData.operationValue)); 
                }
                else{
                    setBalance(oldBalance => oldBalance + Number(formData.operationValue)); 

                }
            }
            else{
                setStateOp("error");
                setMessage("Erro! Verifique valor da conta");
                
            }
        });
    }

    return(
        <div>
            {stateOp==="" && 
                <div>
                    <h1 className='fth1Pop'>Insira os dados</h1>
                    <form onSubmit={handleSubmit}>
                        <input onChange={handleChange} value={formData.cardNum} name="cardNum" type="email" className="ftPaypalEmail" placeholder="E-mail"></input>
                        <h4 className="ftOperationValuePrompt">Valor a transferir</h4>
                        <input onChange={handleChange} value={formData.operationValue} name="operationValue" type="number" className="ftOperationValue" placeholder="Valor"></input>
                        <button className="ftOperationButton">Confirm</button>
                    </form>
                    <img src = {closeImg} className='close' onClick={close}/>
                </div>
            }
            {stateOp === "success" && 
                <PopUpMessagePayment setStateOp={setStateOp} message={message} setMethod={setMethod} setShowPopUp={setShowPopUp}></PopUpMessagePayment>}
            {stateOp === "error" && 
                <PopUpMessagePayment setStateOp={setStateOp} message={message} setMethod={setMethod} setShowPopUp={setShowPopUp}></PopUpMessagePayment>}

        </div>
    )
}
