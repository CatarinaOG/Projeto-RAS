import '../styles/logSquare.css';

import {useState} from 'react'


function RegAccount({current,setFunc}){




	function changeComp(){
        if(current === 0){
			setFunc(1);
		}
		else{
			setFunc(0);
		}
    }

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
	}


    return(
        
			<div className='regAccount'>
				<img className = "ftrasbetLogo" src = {require('../images/logo.png')}/>

				<h1 className = "ftRegisterTitle"> Registo</h1>
				<form onSubmit={handleSubmit}>
					<input className = "ftnameReg" type="text" placeholder = "Nome" name = "name" value = {formData.name}/>
					<input className = "ftemailReg" type="text" placeholder = "E-mail" name ="email" value = {formData.email}/>
					<input className = "ftpassswordReg" type="password" placeholder = "Palavra-passe" name="password" value = {formData.password}/>
					<input className = "ftbirthdateReg" type="date" placeholder = "Data de Nascimento" name="date" value = {formData.date}/>
					<input className = "ftNIFReg" type="text" placeholder = "NIF" name="nif" value = {formData.nif}/>
					<input className = "ftphoneReg" type="number" placeholder = "Telefone" name="phone" value = {formData.phone}/>
					<input className = "ftaddressReg" type="text" placeholder = "Morada" name="address" value = {formData.address}/>
					<input className = "ftCCReg" type="text" placeholder = "CC" name ="cc" value = {formData.cc}/>
					<button onClick = {changeComp} className = "acceder" > Concluir</button>
				</form>
				
				
			</div>
	
    )
}

export default RegAccount;