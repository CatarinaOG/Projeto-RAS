import {useState} from 'react';
import App from '../App';
import '../styles/Profile.css';

import PopUpMethod from './PopUpMethod';
import PopUpMaestro from './PopUpMaestro';
import PopUpPaypal from './PopUpPaypal';




export default function PopUp(props){

    const {showPopUp, setShowPopUp,setBalance} = props;

    // talvez utilizar o set Balance e balance em vez deste use state local pq precisa de ser global
    // vamos precisar do balance tb para efeitos de comparação para ver se o levantar é valido
    const [formData, setFormData] = useState(
        {Valor: 0}
    )
    
    const [method , setMethod] = useState('');

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
        setShowPopUp('');
    }

    function handleSubmit(event){
        event.preventDefault();

        // tratar de verificar verificação de levantar/depositar e alterar com 'setBalance'

    }

    return(
        <div className="ftboxConfirm">
            {method==='' && <PopUpMethod showPopUp={showPopUp} setShowPopUp={setShowPopUp} setMethod={setMethod}/>}
            {method==='Maestro' && <PopUpMaestro setMethod={setMethod} showPopUp={showPopUp}/>}
            {method==='Paypal' && <PopUpPaypal setMethod={setMethod} showPopUp={showPopUp}/>}

        </div>
    )
}
/*
                    <h3 className='fth3Pop'>Escolha a quantia que quer depositar</h3>

    <input className = 'ftinputNum'type ="number" onChange={handleChange} name="Valor" value = {formData.Valor}></input>
*/


    /*
    if(!confirmated){
        return(
	    <div className="ftboxConfirm">
            <div>
                <h1 className='fth1Pop'>Especialista adicionado com sucesso!</h1>
                <h2 className='fth2Pop' >Dados adicionados:</h2>
                <button className="ftclosePop" onClick={cancel}>x</button>
            </div>
        </div>
        )
    }*/

