import logo from '../images/logo.png'

import {useState} from 'react'
import goBackImg from "../images/goBack.png"

import { useNavigate } from "react-router-dom"


export default function RegAccount(props){

	const {dark} = props

	const [formData, setFormData] = useState(
        {email: "",password:"",phone:"",name:"",nif:"",date:"",cc:"",address:""}
    )
	const [errorReg,setErrorReg]=useState(0);

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

	function handleSubmit(event){
		event.preventDefault();
		if(formData.email !="" && formData.password !="" && formData.phone !="" && formData.name !="" && formData.nif !="" && formData.date !="" && formData.cc !="" && formData.address !=""){
			setErrorReg(0);
			console.log(formData)
			fetch('http://127.0.0.1:8080/api/users/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ 
					email: formData.email,
					password:formData.password,
					telefone:formData.phone,
					nome:formData.name,
					nif:formData.nif,
					data_de_nascimento:formData.date,
					cc:formData.cc,
					morada:formData.address})
        	})
			.then(response => response.json())
			.then(data => {
				console.log(data.state)
				if (data.state === 'good'){
					navigate("/", { replace: true }); 
					
				}
				else if(data.state ==='bad'){
					setErrorReg(2);
				}
			});
		}
		else{
			setErrorReg(1);
		}        
	}


    return(
        
			<div className='regAccount'>
				<img className = "ftrasbetLogo" src = {logo}/>

				<h1 className = {`ftRegisterTitle${dark}`} > Registo</h1>
                <img src = {goBackImg} className= {`ftgoBackReg${dark}`} onClick={goBack}/>

				<form onSubmit={handleSubmit}>
					<input className = {`ftnameReg${dark}`} type="text" placeholder = "Nome" name = "name" value = {formData.name} onChange={handleChange}/>
					<input className = {`ftemailReg${dark}`} type="email" placeholder = "E-mail" name ="email" value = {formData.email} onChange={handleChange}/>
					<input className = {`ftpassswordReg${dark}`} type="password" placeholder = "Palavra-passe" name="password" value = {formData.password} onChange={handleChange}/>
					<input className = {`ftbirthdateReg${dark}`} type="date" placeholder = "Data de Nascimento" name="date" value = {formData.date} onChange={handleChange}/>
					<input className = {`ftNIFReg${dark}`} type="text" placeholder = "NIF" name="nif" value = {formData.nif} onChange={handleChange}/>
					<input className = {`ftphoneReg${dark}`} type="number" placeholder = "Telefone" name="phone" value = {formData.phone} onChange={handleChange}/>
					<input className = {`ftaddressReg${dark}`} type="text" placeholder = "Morada" name="address" value = {formData.address} onChange={handleChange}/>
					<input className = {`ftCCReg${dark}`} type="number" placeholder = "CC" name ="cc" value = {formData.cc} onChange={handleChange}/>
					<button className = {`acceder${dark}`}> Concluir</button>
					{errorReg === 1 && <p className='fterrorReg'>Dados em falta</p>}
					{errorReg === 2 && <p className='fterrorReg2'>Erro no Registo</p>}

				</form>
			</div>
    )
}

