import {useState} from 'react'
import { useNavigate } from "react-router-dom";

import goBackImg from "../images/goBack.png"


export default function ChangeData(props){

    const {setUsername,setShowPopUp,setDataOrHistory} = props

    let navigate = useNavigate();

    function goBack(){
        navigate('/Home')
    }

    function goToHistory(){
        setDataOrHistory("history");
    }

    const [formData, setFormData] = useState(
        {address: "", phoneNum: "",password:""}
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
                    <h4 className='hName'> Número de telemovel : </h4>
                
                    <input className= "ftPassword" onChange={handleChange} type = "password" placeholder={props.password} name="passowrd" value = {formData.password}></input>

                    <h4 className='hName'> Password : </h4>
                
                    <input className= "ftPassword" onChange={handleChange} type = "password" placeholder={props.password} name="passowrd" value = {formData.password}></input>
                        
                    <h4 className='hName'> Alterar Morada : </h4>
                
                    <input className= "ftPassword" onChange={handleChange} type = "password" placeholder={props.password} name="passowrd" value = {formData.password}></input>

                    
                    <button  className='ftConfirm'> Confirm</button>
                </form>
                <button  className='ftChangeSec' > Cancel</button>
        </div>

    )
}