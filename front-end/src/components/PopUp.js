import '../styles/PopUp.css'
import {useState} from 'react';



export default function PopUp(props){

    const {val, setVal,confirmation,setConfirmed} = props;

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
        setConfirmed(0);
    }

    function handleSubmit(event){
        event.preventDefault();
    }

    if(confirmation === 1){
        return(
	        <div className="boxConfirm">
                <div>
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
            </div>

        )
    }
    if(confirmation===0){
        return(
	    <div className="boxConfirm">
            <div>
                <h1>Especialista adicionado com sucesso!</h1>
                <h2>Dados adicionados:</h2>
                <h3></h3>
                <button className="close" onClick={cancel}>x</button>
            </div>
        </div>
        )
    }
    /* 
    return(
	    <div className="boxConfirm">
		    
            {confirmation &&  <div><h1>Depositar</h1><button className="close" onClick={cancel}>x</button></div>}


            {confirmation ===false && <div>{val === 1 && <h1>Levantar</h1>}
            {val === 2 && <h1>Depositar</h1>}

            <button className="close" onClick={cancel}>x</button>
            <h3>Escolha a quantia que quer depositar</h3>
        <form onSubmit={handleSubmit}>
            <input className = 'inputNum'type ="number" onChange={handleChange} name="Valor" value = {formData.Valor}></input>
            <input type = "button" className = 'buttonPaypal'></input>
            <input type = "button" className = 'buttonMaestro'></input>
        </form>
            <h3 className='selecioneForma'>Selecione a forma de transferência</h3></div>}
	    </div>

    )
    */

}