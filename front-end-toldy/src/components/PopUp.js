import '../styles/PopUp.css'
import {useState} from 'react';



export default function PopUp(props){

    const {val, setVal} = props;

    const [formData, setFormData] = useState(
        {Valor: 0}
    )
    
    function handleChange(event) {
        setFormData(prevFormData => {
            console.log(event.target.value)
            return {
                ...prevFormData,
                [event.target.name] : event.target.value
                
            }
        })
    }

    function cancel(){
        setVal(0);
    }

    function handleSubmit(event){
        event.preventDefault();
    }

    return(
	    <div className="boxConfirm">
		    {val === 1 && <h1>Levantar</h1>}
            {val === 2 && <h1>Depositar</h1>}

            <button className="close" onClick={cancel}>x</button>
            <h3>Escolha a quantia que quer depositar</h3>
        <form onSubmit={handleSubmit}>
            <input className = 'inputNum'type ="number" onChange={handleChange} name="Valor" value = {formData.Valor}></input>
            <input type = "button" className = 'buttonPaypal'></input>
            <input type = "button" className = 'buttonMaestro'></input>
        </form>
            <h3 className='selecioneForma'>Selecione a forma de transferência</h3>
	    </div>
    )
/*
    return (
        <div>
            <div className="backgroundModal">
            </div>
            <div className="boxConfirm">
                <img className='close' onClick={cancel} src={close}/>
                <h1 className="titleModal">Confirmação</h1>
                <p className="paragraphModalConfirmation">Confirmação do Pagamento no valor de:</p>
                <p className="valueConfirmation">{amount}$</p>
                <button className="confirmButton" onClick={goToConfirmated}>Confirmar</button>
            </div>
        </div>
    )
*/
}