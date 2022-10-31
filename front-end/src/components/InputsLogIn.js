
import '../styles/logSquare.css';
import { useState } from 'react';


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
			setRender("AddSpecialist");
		}

	}


    return (
        <div className='inputs'>
				<img className = "ftrasbetLogo" src = {require('../images/logo.png')}/>
				<h1 className = "ftwelcomeTitle"> Bem-vindo</h1>
				<form onSubmit={handleSubmit}>
					<input onChange={handleChange} className = "ftuserNameLog" type="text" placeholder = "Email"  name = "email" value = {formData.email}/>
					<input onChange={handleChange} className = "ftpasswordLog" type="password" placeholder = "Password" name = "password" value = {formData.password} />
					<button className = "ftacederLog"> Aceder</button>
				</form>
				<a href = "" className = "ftnoPass" > Esqueci-me da palavra-passe</a>
				<h4 className='ftnoAccount'>Não tem conta?</h4>
				<a onClick={changeComp} className = "ftnoAccountHyper"> Registe-se já! </a>
		</div>
    )
}