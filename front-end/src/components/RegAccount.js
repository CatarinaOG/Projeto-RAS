import logo from '../images/logo.png'

import {useState} from 'react'


export default function RegAccount(props){

	const {setLoadReg} = props

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


	function handleSubmit(event){
		event.preventDefault();
		if(formData.email !="" && formData.password !="" && formData.phone !="" && formData.name !="" && formData.nif !="" && formData.date !="" && formData.cc !="" && formData.address !=""){
			setErrorReg(0);
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
					data:formData.date,
					cc:formData.cc,
					morada:formData.address})
        	})
			.then(response => response.json())
			.then(data => {
				if (data.state === 'good'){
					setLoadReg(prevLoadReg => !prevLoadReg)
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

				<h1 className = "ftRegisterTitle"> Registo</h1>
				<form onSubmit={handleSubmit}>
					<input className = "ftnameReg" type="text" placeholder = "Nome" name = "name" value = {formData.name} onChange={handleChange}/>
					<input className = "ftemailReg" type="email" placeholder = "E-mail" name ="email" value = {formData.email} onChange={handleChange}/>
					<input className = "ftpassswordReg" type="password" placeholder = "Palavra-passe" name="password" value = {formData.password} onChange={handleChange}/>
					<input className = "ftbirthdateReg" type="date" placeholder = "Data de Nascimento" name="date" value = {formData.date} onChange={handleChange}/>
					<input className = "ftNIFReg" type="text" placeholder = "NIF" name="nif" value = {formData.nif} onChange={handleChange}/>
					<input className = "ftphoneReg" type="number" placeholder = "Telefone" name="phone" value = {formData.phone} onChange={handleChange}/>
					<input className = "ftaddressReg" type="text" placeholder = "Morada" name="address" value = {formData.address} onChange={handleChange}/>
					<input className = "ftCCReg" type="number" placeholder = "CC" name ="cc" value = {formData.cc} onChange={handleChange}/>
					<button className = "acceder"> Concluir</button>
					{errorReg === 1 && <h3 className='fterrorReg'>Dados em falta</h3>}
				</form>
			</div>
    )
}

