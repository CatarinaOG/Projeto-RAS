import { useState } from "react";

import closeImg from '../images/close.png'
import PopUpMessage from "./PopUpMessagePayment";

export default function PopUpMaestro(props){

    const {setMethod,showPopUp,email,setBalance,setShowPopUp,dark} = props;
    const [stateOp,setStateOp] = useState("");
    const [message,setMessage] = useState("");
    
    

    const [formData, setFormData] = useState(
        {operation: showPopUp, cardNum: 0,cardCCV:0 ,operationValue:""}
    )
    
    function handleChange(event) {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name] : event.target.value
            }
        })
    }

    // fecha o popUp de método de pagamento
    function close(){
        setMethod('');
    }

    //Comportamento após submissão do form. Começa por verificar o tamanho do input do CCV e do CardNum
    //Caso estes valores tenham o tamanho certo, é enviado um pedido POST com os dados inseridos
    //Caso estes valores não tenham o tamanho certo é alterado o valor da variável que determina as mensagens de erro
    //Caso a resposta ao pedido fetch seja de valor true, é alterado o balance mostrado no ecrã e apresentada uma mensagem PopUp de sucesso
    //Caso a resposta seja um false, então é mostrada uma mensagem de erro.
    function handleSubmit(event){
        event.preventDefault();
        
        var lengthcardCCV = Math.log(formData.cardCCV) * Math.LOG10E + 1 | 0;

        var lengthcardNum = Math.log(formData.cardNum) * Math.LOG10E + 1 | 0;
        
        

            if(lengthcardCCV === 3 && lengthcardNum === 9){
                
                fetch('http://127.0.0.1:8080/api/transactions/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json ',
                    },
                    body: JSON.stringify({ 
                        operation: formData.operation,
                        cardNum : formData.cardNum,
                        cardCCV : formData.cardCCV,
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
            else if(lengthcardCCV < 3 && lengthcardNum <8){
                setStateOp("error")
                setMessage("Dados incorretos, volte a tentar")
            }
        
    }

    return(
        <div>
            {stateOp=== "" && 
                <div>
                    <h1 className={`fth1Pop${dark}`}>Insira os dados</h1>
                    <form onSubmit={handleSubmit}>
                        <input onChange={handleChange} value={formData.cardNum} name="cardNum" type="number" className={`ftMaestroPopNum${dark}`} placeholder="Número do Cartão"></input>
                        <input onChange={handleChange} value={formData.cardCCV} name="cardCCV" type="number" className={`ftMaestroPopCCV${dark}`} placeholder="CCV"></input>
                        <h4 className={`ftOperationValuePrompt${dark}`}>Valor a transferir</h4>
                        <input onChange={handleChange} value={formData.operationValue} name="operationValue" type="number" className={`ftOperationValue${dark}`} placeholder="Valor"></input>
                        <button className={`ftOperationButton${dark}`}>Confirm</button>
                    </form>
                    <img src = {closeImg} className='close' onClick={close}/>
                
                </div>}
            {stateOp === "success" && <PopUpMessage setStateOp={setStateOp} message={message} setMethod={setMethod} setShowPopUp={setShowPopUp} dark={dark}></PopUpMessage>}
            {stateOp === "error" && <PopUpMessage setStateOp={setStateOp} message={message} setMethod={setMethod} setShowPopUp={setShowPopUp} dark={dark}></PopUpMessage>}

        </div>
    )
}
