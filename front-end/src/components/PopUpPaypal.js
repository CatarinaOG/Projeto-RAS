import { cleanup } from "@testing-library/react";
import { PureComponent } from "react";
import { useState } from "react";


export default function PopUpPaypal(props){

    const {setMethod,showPopUp} = props;

    function cancel(){
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
        cancel();
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
            <button className="ftclosePop" onClick={cancel}>x</button>
        </div>
    )
}
