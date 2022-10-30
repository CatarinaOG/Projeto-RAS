
import '../styles/inputsLogIn.css';
import { useState } from 'react';
import Profile from '../pages/Profile.js'


export default function InputsLogIn({setRender,current,setFunc}) {



    function changeComp(){
        if(current === 0){
			setFunc(1);
		}
		else{
			setFunc(0);
		}
    }

	


	const [formData, setFormData] = useState(
        {email: "",password:""}
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

	function handleSubmit(event){
		event.preventDefault();
		if(formData.email == "abc@gmail.com" && formData.password == "123"){
			setRender("Profile");
		}

	}


    return (
        <div className='inputs'>
				<img className = "rasbetLogo" src = {require('../images/logo.png')}/>
				<h1 className = "BemVindo"> Bem-vindo</h1>
				<form onSubmit={handleSubmit}>
					<input onChange={handleChange} className = "userName" type="text" placeholder = "Email"  name = "email" value = {formData.email}/>
					<input onChange={handleChange} className = "password" type="password" placeholder = "Password" name = "password" value = {formData.password} />
					<button className = "aceder"> Aceder</button>
				</form>
				<a href = "https://www.youtube.com/watch?v=dQw4w9WgXc" className = "noPass" > Esqueci-me da palavra-passe</a>
				<h4 className='noAccount'>Não tem conta?</h4>
				<a onClick={changeComp} className = "noAccountHyper"> Registe-se já! </a>
		</div>
    )
}