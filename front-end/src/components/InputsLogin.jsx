import { useState } from 'react'
import { useNavigate } from "react-router-dom"

import logo from '../images/logo.png'
import darkMode from '../images/moon.png'
import britFlag from '../images/british.png'
import portFlag from '../images/portugal.png'




export default function InputsLogin(props) {

	const {t,i18n,setUsername,setBalance,setEmail,setTypeUser,dark,switchDark} = props

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
		console.log(formData)
		if(formData.email!=="" && formData.password!==""){
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
					setTypeUser('expert')
				}
				else if(data.type === 'administrador'){
					navigate("/HomeAdmin", { replace: true }); 
					setTypeUser('admin')
				}
				else if(data.type === 'apostador'){
					setBalance(data.balance)
					navigate("/Home", { replace: true }); 
					setTypeUser('better')
				}
				else if(data.type === null){
					setErrorReg(2)
				}
			})
		}
		else{
			setErrorReg(1)
		}		
	}

	const [lang,setLang] = useState("en");

	function changePT(){
			setLang("pt")
			i18n.changeLanguage("pt");
			
	}

	function changeEN(){
			setLang("en")
			i18n.changeLanguage("en");
	}

    return (
        <div className='inputs'>
			<img className = "ftrasbetLogo" src = {logo} alt=""/>
			<img className = {`ftDarkLogo${dark}`} src = {darkMode} onClick={switchDark} alt=""/>
			<img className = {`ftBritLogo${dark}`} src = {britFlag} onClick={changeEN} alt=""/>
			<img className = {`ftPortLogo${dark}`} src = {portFlag} onClick={changePT} alt=""/>



			<h1 className = {`ftwelcomeTitle${dark}`}> {t("inputLoginWelcome.label")}</h1>
			<form onSubmit={handleSubmit}>
				<input onChange={handleChange} className = {`ftuserNameLog${dark}`} type="text" placeholder = "Email"  name = "email" value = {formData.email}/>
				<input onChange={handleChange} className = {`ftpasswordLog${dark}`} type="password" placeholder = "Password" name = "password" value = {formData.password} />
				<button className = {`ftacederLog${dark}`}> {t("inputLoginAccess.label")}</button>
			</form>
			<a className = {`ftnoPass${dark}`} onClick={changeToRecover}> {t("inputLoginForgotPass.label")}</a>
			<a className={`ftnoAccount${dark}`}>{t("inputLoginNoAcc.label")}</a>
			<h4 onClick={changeToRegister} className = {`ftnoAccountHyper${dark}`}> {t("inputLoginRegNow.label")} </h4>
			{errorReg === 2 && <p className={`fterrorLogIn${dark}`}>{t("inputLoginErr2.label")}</p>}
			{errorReg === 1 && <p className={`fterrorLogIn${dark}`}>{t("inputLoginErr1.label")}</p>}
		</div>
    )
}