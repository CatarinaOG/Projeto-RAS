
import {useState} from 'react'
import { useNavigate } from "react-router-dom";

import goBackImg from "../images/goBack.png"


export default function ChangeData(props){

    const {setUsername,setShowPopUp,setDivChoice,sec} = props

    let navigate = useNavigate();

    const [formData, setFormData] = useState(
        {firstName: "", lastName: "",password:""}
    )    

    //comportamento do botão goBack, que retorna o utilizador à pagina principal
    function goBack(){
        navigate('/Home')
    }

    //utiliza setDivChoice para alterar a variavel usada no conditional rendering do profile
    function goToHistory(){
        setDivChoice("BetHistory");
    }

    
    
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

        setUsername(formData.firstName);
    }

    //ativa o popUp de escolha de método de levantamento
    function withdrawPop(){
        setShowPopUp('transfer');
    }

    //ativa o popUp de escolha de método de depósito
    function depositPop(){
        setShowPopUp('deposit');
    }

    function logOut(){
        navigate('/')
    }

    //carrega o PopUp que pede o email ao utilizador para enviar o código de confirmaçao
    function loadPopEmail(){
        setShowPopUp('changeSec');

    }
 
    // a variável sec determina se é renderizado o changeData normal ou o dos dados seguros
    return (
        <div className="changeDataOutDiv">
                <button className='ftLogout' onClick={logOut}> Log out </button>
                <button className='fttakeOut' onClick={withdrawPop}> Levantar </button>
                <button className='ftdeposit' onClick={depositPop}> Depositar </button>
                <img src = {goBackImg} className="ftgoBack" onClick={goBack}/>
                
                <h4 className="clickHistory"> Consultar Histórico de Apostas</h4>
                <button  className='ftChange' onClick={goToHistory}> {'>'} </button>

                {sec === 0 && 
                <div>
                    <form onSubmit = {handleSubmit} >
                        <h4 className='hName'> Nome : </h4>
                    
                        <input className= "ftinputName" onChange={handleChange} type = "text" placeholder={props.userN} name="firstName" value = {formData.firstName}></input>
                            
                        <button  className='ftConfirm'> Confirm</button>
                    </form>
                    <button  className='ftChangeSec' onClick={loadPopEmail}> Mudar Dados Seguros</button>
                </div>
                }
                {sec === 1 && 
                <div>

                    <form onSubmit = {handleSubmit} >
                        <h4 className='fthPhoneNum'> Número de telemovel : </h4>
                    
                        <input className= "ftPhoneChange" onChange={handleChange} type = "number" placeholder="Phone" name="phoneNum" value = {formData.phoneNum}></input>

                        <h4 className='fthPass'> Password : </h4>
                    
                        <input className= "ftPasswordChange" onChange={handleChange} type = "password" placeholder="Password" name="password" value = {formData.password}></input>
                            
                        <h4 className='fthAddress'> Alterar Morada : </h4>
                    
                        <input className= "ftAddrChange" onChange={handleChange} type = "text" placeholder="Morada" name="address" value = {formData.address}></input>

                        
                        <button  className='ftConfirm'> Confirm</button>
                    </form>
                    <button  className='ftChangeSec' > Cancel</button>        
                </div>}
        </div>

    )
}