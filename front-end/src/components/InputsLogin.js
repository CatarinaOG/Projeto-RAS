
import '../styles/logSquare.css';
import { useState } from 'react';

import logo from '../images/logo.png'


export default function InputsLogin(props) {

	const {setUsername,setRender,setLoadReg} = props

    function changeComp(){
        setLoadReg(prevLoadReg => !prevLoadReg);
    }


	const [formData, setFormData] = useState({email: "",password:""})
    

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

		// Fazer a verificição do log in aqui e mudar username com 'setUsername'

		setRender("Home");
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
			<h4 className='ftnoAccount'>Não tem conta?</h4>
			<a onClick={changeComp} className = "ftnoAccountHyper"> Registe-se já! </a>
		</div>
    )
}