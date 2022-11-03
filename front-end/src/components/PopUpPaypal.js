import { useState } from "react";

import closeImg from '../images/close.png'
import PopUpMessage from "./PopUpMessagePayment";

export default function PopUpPaypal(props){

    const {setMethod,showPopUp} = props;
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
        
        var lengthcardCCV = Math.log(formData.cardCCV) * Math.LOG10E + 1 | 0;

        var lengthcardNum = Math.log(formData.cardNum) * Math.LOG10E + 1 | 0;
        console.log(lengthcardCCV);
        console.log(lengthcardNum);

            if(lengthcardCCV === 3 && lengthcardNum === 9){
                setStateOp("success");
                /*
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ operation : showPopUp ,email : email ,cardNum : formData.cardNum, cardCCV : formData.cardCCV, operationValue : formData.operationValue})
                };
                fetch('', requestOptions)
                    .then(response => response.json())
                    .then(data => this.setState({ postId: data.id }));
                
                */
                setMessage("Operação bem sucedida!");
            }
            else if(lengthcardCCV < 3 && lengthcardNum <8){
                setStateOp("error")
                setMessage("Dados incorretos, volte a tentar")
            }
        
        // Tratar do pedido e verificação
        //close();
    }

    return(
        <div>
            {stateOp==="" && 
                <div>
                    <h1 className='fth1Pop'>Insira os dados</h1>
                    <form onSubmit={handleSubmit}>
                        <input onChange={handleChange} value={formData.cardNum} name="cardNum" type="number" className="ftPaypalEmail" placeholder="E-mail"></input>
                        <h4 className="ftOperationValuePrompt">Valor a transferir</h4>
                        <input onChange={handleChange} value={formData.operationValue} name="operationValue" type="number" className="ftOperationValue" placeholder="Valor"></input>
                        <button className="ftOperationButton">Confirm</button>
                    </form>
                    <img src = {closeImg} className='close' onClick={close}/>
                </div>
            }
            {stateOp === "success" && <PopUpMessage setStateOp={setStateOp} message={message} setMethod={setMethod}></PopUpMessage>}
            {stateOp === "error" && <PopUpMessage setStateOp={setStateOp} message={message} setMethod={setMethod}></PopUpMessage>}

        </div>
    )
}
