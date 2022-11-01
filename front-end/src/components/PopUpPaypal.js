import { useState } from "react";

import closeImg from '../images/close.png'

export default function PopUpPaypal(props){

    const {setMethod,showPopUp} = props;

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

        // Tratar do pedido e verificação
        close();
    }

    return(
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
    )
}
