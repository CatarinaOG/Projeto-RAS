import { useState } from 'react'
import { useNavigate } from "react-router-dom"

import logo from '../images/logo.png'


export default function InputsLogin(props) {

	const {setUsername,setBalance,setLoadReg,setEmail,balance} = props

    function changeComp(){
        setLoadReg(prevLoadReg => !prevLoadReg)
    }

	const [errorReg,setErrorReg]=useState(0)

	const [formData, setFormData] = useState({email: "",password:""})
    
	let navigate = useNavigate();

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

		fetch('http://127.0.0.1:8080/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: formData.email , pass:formData.password })
        })
        .then(response => response.json())
        .then(data => {
			setUsername(data.username)
			setEmail(formData.email)
			if (data.type === 'especialista'){
				navigate("/HomeExpert"); 
			}
			else if(data.type === 'administrador'){
				navigate("/HomeAdmin"); 
			}
			else if(data.type === 'apostador'){
				setBalance(data.balance)
				navigate("/Home"); 
			}
			else if(data.type === null){
				setErrorReg(2)

			}
		})
		
		
	}

    return (
        <div className='inputs'>
			<img className = "ftrasbetLogo" src = {logo}/>
			<h1 className = "ftwelcomeTitle"> Bem-vindo</h1>
			<form onSubmit={handleSubmit}>
				<input onChange={handleChange} className = "ftuserNameLog" type="text" placeholder = "Email"  name = "email" value = {formData.email}/>
				<input onChange={handleChange} className = "ftpasswordLog" type="password" placeholder = "Password" name = "password" value = {formData.password} />
				<button className = "ftacederLog"> Aceder</button>
			</form>
			<a className = "ftnoPass" > Esqueci-me da palavra-passe</a>
			<a className='ftnoAccount'>Não tem conta?</a>
			<h4 onClick={changeComp} className = "ftnoAccountHyper"> Registe-se já! </h4>
			{errorReg === 2 && <p className='fterrorLogIn'>Email ou password incorretos</p>}

		</div>
    )
}