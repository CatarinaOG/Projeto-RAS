
import '../styles/inputsLogIn.css';
import { useState } from 'react';



export default function InputsLogIn({current,setFunc}) {

    function changeComp(){
        if(current === 0){
			setFunc(1);
		}
		else{
			setFunc(0);
		}
    }


    return (
        <div className='inputs'>
				<img className = "rasbetLogo" src = {require('../images/logo.png')}/>
				<h1 className = "BemVindo"> Bem-vindo</h1>
				<input className = "userName" type="text" placeholder = "Username" />
				<input className = "password" type="text" placeholder = "Password" />
				<button className = "aceder"> Aceder</button>
				<a href = "https://www.youtube.com/watch?v=dQw4w9WgXc" className = "noPass" > Esqueci-me da palavra-passe</a>
				<h4 className='noAccount'>Não tem conta?</h4>
				<a onClick={changeComp} className = "noAccountHyper"> Registe-se já! </a>
		</div>
    )
}