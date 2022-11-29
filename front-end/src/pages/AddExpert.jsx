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

        // Mandar pedido e esperar por verificação

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
        <div className='ftaddSpecialist'>
            <div>
                <NavBarProfile 
                    username={username}
                    dark={dark}
                />
                <img src = {goBackImg} className='ftgoBackImg' onClick={goBack}/>
                <div className='ftwhiteShadow'>
                    <h1 className = "ftAddSp">Adicionar Especialista</h1>
                    <form onSubmit = {handleSubmit}>
                        <h3 className='ftpromptUsernameSp'>Insira o username:</h3>
                        <input type="text" onChange={handleChange} placeholder='username' name = "expert_username" value = {formData.expert_username} className="ftUsernameSp"/>
                        <h3 className='ftpromptEmailSp'>Insira o email:</h3>
                        <input type="text" onChange={handleChange} placeholder='email' name = "email" value = {formData.email} className="ftemailSp"/>
                        <h3 className='ftpromptPassSp'>Insira a password:</h3>
                        <input type="text" onChange={handleChange} placeholder='password' name = "password" value = {formData.password} className ="ftpasswordSp"/>
                        <button className = "ftaddConcludeSp">Registar</button>
					    {errorReg === 1 && <p className='fterrorAddEx'>Dados em falta</p>}
					    {errorReg === 2 && <p className='fterrorAddEx'>Erro: email em uso</p>}
                    </form>
                </div>
            </div>
            {confirmed && 
                <div>
                    <div className="ftbackgroundModal"></div>
                    <PopUpAdmin 
                        email = {formData.email}
                        password = {formData.password}
                        username={formData.expert_username}
                        setConfirmed ={setConfirmed}
                    />
                </div>
            }           
        </div>            
    )
}