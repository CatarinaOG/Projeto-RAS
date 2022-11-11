
import {useState} from 'react'
import { useNavigate } from "react-router-dom";

import goBackImg from "../images/goBack.png"


export default function ChangeData(props){

    const {setUsername,setShowPopUp,setDivChoice} = props

    let navigate = useNavigate();

    function goBack(){
        navigate('/Home')
    }

    function goToHistory(){
        setDivChoice("BetHistory");
    }

    const [formData, setFormData] = useState(
        {firstName: "", lastName: "",password:""}
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

        setUsername(formData.firstName);
    }

    function withdrawPop(){
        setShowPopUp('transfer');
    }

    function depositPop(){
        setShowPopUp('deposit');
    }

    function logOut(){
        navigate('/')
    }

    function loadPopEmail(){
        setShowPopUp('changeSec');

    }
 

    return (
        <div className="changeDataOutDiv">
                <button className='ftLogout' onClick={logOut}> Log out </button>
                <button className='fttakeOut' onClick={withdrawPop}> Levantar </button>
                <button className='ftdeposit' onClick={depositPop}> Depositar </button>
                <img src = {goBackImg} className="ftgoBack" onClick={goBack}/>
                
                <h4 className="clickHistory"> Consultar Histórico de Apostas</h4>
                
                <button  className='ftChange' onClick={goToHistory}> {'>'} </button>
                <form onSubmit = {handleSubmit} >
                    <h4 className='hName'> Nome : </h4>
                
                    <input className= "ftinputName" onChange={handleChange} type = "text" placeholder={props.userN} name="firstName" value = {formData.firstName}></input>
                        
                    <button  className='ftConfirm'> Confirm</button>
                </form>
                <button  className='ftChangeSec' onClick={loadPopEmail}> Mudar Dados Seguros</button>
        </div>

    )
}