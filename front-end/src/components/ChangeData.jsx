
import {useState} from 'react'
import { useNavigate } from "react-router-dom";

import goBackImg from "../images/goBack.png"


export default function ChangeData(props){

    const {setUsername,setShowPopUp,setDivChoice,sec,email,setSec,dark} = props

    let navigate = useNavigate();

    const [formData, setFormData] = useState(
        {name: "" , phone_num : "" , password : "" , add : ""}
    )

    //comportamento do botão goBack, que retorna o utilizador à pagina principal
    function goBack(){
        navigate('/Home', { replace: true })
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
                
		if(formData.firstName!=""){
			fetch('http://127.0.0.1:8080/api/users/change_profile', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
                    email_user: email ,
                    name : formData.name,
                    phone_num: formData.phone_num,
                    newAdd: formData.add,
                    password: formData.password})
			})
			.then(response => response.json())
			.then(data => {
                setUsername(formData.name);

            })
        }
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
        navigate('/', { replace: true })
    }

    //carrega o PopUp que pede o email ao utilizador para enviar o código de confirmaçao
    function loadPopEmail(){
        setShowPopUp('changeSec');

    }
 
    function cancelBut(){
        setSec(0);

    }

    // a variável sec determina se é renderizado o changeData normal ou o dos dados seguros
    return (
        <div className="changeDataOutDiv">
                <button className={`ftLogout${dark}`} onClick={logOut}> Log out </button>
                <button className={`fttakeOut${dark}`} onClick={withdrawPop}> Levantar </button>
                <button className={`ftdeposit${dark}`} onClick={depositPop}> Depositar </button>
                <img src = {goBackImg} className={`ftgoBack${dark}`} onClick={goBack}/>
                
                <h4 className={`clickHistory${dark}`}> Consultar Histórico de Apostas</h4>
                <button  className={`ftChangeToHist${dark}`} onClick={goToHistory}> {'>'} </button>
                <form onSubmit = {handleSubmit}>

                {sec === 0 && 
                <div>
                        <h4 className={`hName${dark}`}> Nome : </h4>
                    
                        <input className= {`ftinputName${dark}`} onChange={handleChange} type = "text" placeholder={props.userN} name="name" value = {formData.name}></input>
                            
                        <button  className={`ftConfirm${dark}`}> Confirm</button>
                </div>
                }
                {sec === 1 && 
                <div>
                        <h4 className={`fthPhoneNum${dark}`}> Número de telemovel : </h4>
                    
                        <input className= {`ftPhoneChange${dark}`} onChange={handleChange} type = "number" placeholder="Phone" name="phone_num" value = {formData.phone_num}></input>

                        <h4 className={`fthPass${dark}`}> Password : </h4>
                    
                        <input className= {`ftPasswordChange${dark}`} onChange={handleChange} type = "password" placeholder="Password" name="password" value = {formData.password}></input>
                            
                        <h4 className={`fthAddress${dark}`}> Alterar Morada : </h4>
                    
                        <input className= {`ftAddrChange${dark}`} onChange={handleChange} type = "text" placeholder="Morada" name="add" value = {formData.add}></input>

                        
                        <button  className={`ftConfirm${dark}`}> Confirm</button>
                </div>}
                </form>
                {sec === 0 && <button  className={`ftChangeSec${dark}`} onClick={loadPopEmail}> Mudar Dados Seguros</button>} 
                {sec === 1 && <button  className={`ftChangeCancel${dark}`} onClick={cancelBut}> Cancel</button>        }
                
        </div>

    )
}
