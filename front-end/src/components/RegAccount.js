import '../styles/logSquare.css';

import logo from '../images/logo.png'

import {useState} from 'react'


export default function RegAccount(props){

	const {setLoadReg} = props

	const [formData, setFormData] = useState(
        {email: "",password:"",phone:"",name:"",nif:"",date:"",cc:"",address:""}
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

		// Verificação aqui se conta registada

        setLoadReg(prevLoadReg => !prevLoadReg)
	}


    return(
        
			<div className='regAccount'>
				<img className = "ftrasbetLogo" src = {logo}/>

				<h1 className = "ftRegisterTitle"> Registo</h1>
				<form onSubmit={handleSubmit}>
					<input className = "ftnameReg" type="text" placeholder = "Nome" name = "name" value = {formData.name} onChange={handleChange}/>
					<input className = "ftemailReg" type="text" placeholder = "E-mail" name ="email" value = {formData.email} onChange={handleChange}/>
					<input className = "ftpassswordReg" type="password" placeholder = "Palavra-passe" name="password" value = {formData.password} onChange={handleChange}/>
					<input className = "ftbirthdateReg" type="date" placeholder = "Data de Nascimento" name="date" value = {formData.date} onChange={handleChange}/>
					<input className = "ftNIFReg" type="text" placeholder = "NIF" name="nif" value = {formData.nif} onChange={handleChange}/>
					<input className = "ftphoneReg" type="number" placeholder = "Telefone" name="phone" value = {formData.phone} onChange={handleChange}/>
					<input className = "ftaddressReg" type="text" placeholder = "Morada" name="address" value = {formData.address} onChange={handleChange}/>
					<input className = "ftCCReg" type="text" placeholder = "CC" name ="cc" value = {formData.cc} onChange={handleChange}/>
					<button className = "acceder"> Concluir</button>
				</form>
			</div>
    )
}

