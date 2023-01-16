import { useContext } from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { myContext } from '../context'
import goBackImg from "../images/goBack.png"

import logo from '../images/logo.png'


export default function RetrievePass() {

	const {dark} = useContext(myContext)
	
	//variavel responsavel pelo conditional rendering da mensagem
	const [message,setMessage]=useState(0)

	const [formData, setFormData] = useState({email: "",password:""})
    

    function handleChange(event) {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name] : event.target.value
            }
        })
    }

	let navigate = useNavigate();


	function goBack(){
        navigate('/', { replace: true })
    }
    

	/**
	 * Handle submit irá verificar se foi fornecido um email e fazer um pedido HTTP POST para o endpoint recover_password
	 * Consoante o resultado irá fazer setMessage de forma a mostrar a mensagem apropriada, seja esta de erro ou de sucesso de envio de email
	 * @param {} event 
	 */
	function handleSubmit(event){
		event.preventDefault()
        
		if(formData.email!=""){
			fetch('http://127.0.0.1:8080/api/users/recover_password', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email_user: formData.email })
			})
			.then(response => response.json())
			.then(data => {
				console.log("data response is:", data)
				if(data.confirmed === "true")
					setMessage(1)
				else{
					setMessage(2)
				}
			})
		}
		else{
			setMessage(3);
		}
        	
	}
    

    return (
        <div className='inputs'>
			<img className = "ftrasbetLogo" src = {logo}/>
			<h1 className = {`ftwelcomeTitle${dark}`}> Inserir Email</h1>
            <img src = {goBackImg} className={`ftgoBackReg${dark}`} onClick={goBack}/>

			<form onSubmit={handleSubmit}>
				<input onChange={handleChange} className = {`ftEmailRecover${dark}`} type="text" placeholder = "Email"  name = "email" value = {formData.email}/>
				<button className = {`ftacederLog${dark}`}> Inserir Email</button>
			</form>
			{message === 1 && <p className='fterrorRecover'>Email enviado</p>}
			{message === 2 && <p className='fterrorRecover'>Email não existe</p>}
			{message === 3 && <p className='fterrorRecover'>Inserir um Email</p>}


		</div>
    )
}