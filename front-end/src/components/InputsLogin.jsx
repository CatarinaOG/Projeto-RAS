import { useState } from 'react'
import { useNavigate } from "react-router-dom"

import logo from '../images/logo.png'


export default function InputsLogin(props) {

	const {setUsername,setBalance,setLoadReg,setEmail,balance,dark} = props

	//variavel responsavel pelo conditional rendering 
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

	//muda a pagina para a página de registo
	function changeToRegister(){
		navigate("/Register");
	}
	
	function changeToRecover(){
		navigate("/Recover");
	}

	//Função responsavel pelo submit do form
	//Começa por verificar se algum dos inputs está vazio . caso esteja, altera a variavel errorReg, 
	//de forma a ser demonstrada mensagem de erro
	//Caso estejam ambos os inputs preenchidos, envia os seus valores para a backend e processa a resposta
	//A variável type irá determinar se será mudada a página para home page do admin, especialista ou apostador.
	//Caso o type seja nulo é porque houve erro, sendo alterada a variavel errorReg de forma a ser renderizada a 
	//mensagem de erro apropriada 
	
	function handleSubmit(event){
		event.preventDefault()

		if(formData.email!="" && formData.password!=""){
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
					navigate("/HomeExpert", { replace: true }); 
				}
				else if(data.type === 'administrador'){
					navigate("/HomeAdmin", { replace: true }); 
				}
				else if(data.type === 'apostador'){
					setBalance(data.balance)
					navigate("/Home", { replace: true }); 
				}
				else if(data.type === null){
					setErrorReg(2)

				}
			})
		}		
	}

    return (
        <div className='inputs'>
			<img className = "ftrasbetLogo" src = {logo}/>
			<h1 className = {`ftwelcomeTitle${dark}`}> Bem-vindo</h1>
			<form onSubmit={handleSubmit}>
				<input onChange={handleChange} className = {`ftuserNameLog${dark}`} type="text" placeholder = "Email"  name = "email" value = {formData.email}/>
				<input onChange={handleChange} className = {`ftpasswordLog${dark}`} type="password" placeholder = "Password" name = "password" value = {formData.password} />
				<button className = {`ftacederLog${dark}`}> Aceder</button>
			</form>
			<a className = {`ftnoPass${dark}`} onClick={changeToRecover}> Esqueci-me da palavra-passe</a>
			<a className={`ftnoAccount${dark}`}>Não tem conta?</a>
			<h4 onClick={changeToRegister} className = {`ftnoAccountHyper${dark}`}> Registe-se já! </h4>
			{errorReg === 2 && <p className={`fterrorLogIn${dark}`}>Email ou password incorretos</p>}
			{errorReg === 1 && <p className={`fterrorLogIn${dark}`}>Dados incompletos</p>}
		</div>
    )
}