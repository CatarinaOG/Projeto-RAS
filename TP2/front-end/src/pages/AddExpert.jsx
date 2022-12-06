import { useState } from 'react'
import { useNavigate } from "react-router-dom"

import PopUpAdmin from '../components/PopUpAdmin'
import goBackImg from '../images/goBack.png'
import NavBarProfile from "../components/NavBarProfile"


export default function AddSpecialist(props){

    const {username,dark} = props

	const [errorReg,setErrorReg]=useState(0)
    
    const [confirmed,setConfirmed] = useState(false)

    let navigate = useNavigate()

    const [formData, setFormData] = useState(
        {expert_username:"" ,email:"",password:""}
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
		event.preventDefault()

        // Verificar o se o formulario está nas condições corretas. caso esteja, enviar o pedido http adequado com a informação num json
        // caso não esteja, mostrar a mensagem de erro 1. 
        // caso a resposta ao pedido seja algo diferente de true, mostrar a mensagem de erro 2.

        if(formData.expert_username!= "" && formData.email!= "" && formData.password!=""){
            fetch('http://127.0.0.1:8080/api/admin/newExpert', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ nome : formData.expert_username , email: formData.email , password : formData.password})
        	})
			.then(response => response.json())
			.then(data => {
				if (data.state === 'good'){
			        setErrorReg(0)
                    setConfirmed(true)
				}
                else{
                    setErrorReg(2)
                }
			})
        }
        else{
			setErrorReg(1)
            
        }

        

	}

    function goBack(){
        navigate('/HomeAdmin', { replace: true })
    }
    

    return(
        <div className={`ftaddSpecialist${dark}`}>
            <div>
                <NavBarProfile 
                    username={username}
                    dark={dark}
                />
                <img src = {goBackImg} className={`ftgoBackImg${dark}`}onClick ={goBack}/>
                <div className={`ftwhiteShadow${dark}`}>
                    <h1 className = {`ftAddSp${dark}`}>Adicionar Especialista</h1>
                    <form onSubmit = {handleSubmit}>
                        <h3 className={`ftpromptUsernameSp${dark}`}>Insira o username:</h3>
                        <input type="text" onChange={handleChange} placeholder='username' name = "expert_username" value = {formData.expert_username} className={`ftUsernameSp${dark}`}/>
                        <h3 className={`ftpromptEmailSp${dark}`}>Insira o email:</h3>
                        <input type="text" onChange={handleChange} placeholder='email' name = "email" value = {formData.email} className={`ftemailSp${dark}`}/>
                        <h3 className={`ftpromptPassSp${dark}`}>Insira a password:</h3>
                        <input type="password" onChange={handleChange} placeholder='password' name = "password" value = {formData.password} className ={`ftpasswordSp${dark}`}/>
                        <button className = {`ftaddConcludeSp${dark}`}>Registar</button>
					    {errorReg === 1 && <p className='fterrorAddEx'>Dados em falta</p>}
					    {errorReg === 2 && <p className='fterrorAddEx'>Erro: email em uso</p>}
                    </form>
                </div>
            </div>
            {confirmed && 
                <div>
                    <div className={`ftbackgroundModal${dark}`}>
                    </div>
                    <PopUpAdmin 
                        email = {formData.email}
                        password = {formData.password}
                        username={formData.expert_username}
                        dark={dark}
                    />
                </div>
            }           
        </div>            
    )
}