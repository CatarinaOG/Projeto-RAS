import '../styles/regAccount.css';

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
				<img className = "rasbetLogo" src = {require('../images/logo.png')}/>

				<h1 className = "Registo"> Registo</h1>
				<form onSubmit={handleSubmit}>
					<input className = "name" type="text" placeholder = "Nome" name = "name" value = {formData.name}/>
					<input className = "email" type="text" placeholder = "E-mail" name ="email" value = {formData.email}/>
					<input className = "passsword" type="password" placeholder = "Palavra-passe" name="password" value = {formData.password}/>
					<input className = "birthdate" type="date" placeholder = "Data de Nascimento" name="date" value = {formData.date}/>
					<input className = "NIF" type="text" placeholder = "NIF" name="nif" value = {formData.nif}/>
					<input className = "phone" type="number" placeholder = "Telefone" name="phone" value = {formData.phone}/>
					<input className = "address" type="text" placeholder = "Morada" name="address" value = {formData.address}/>
					<input className = "CC" type="text" placeholder = "CC" name ="cc" value = {formData.cc}/>
					<button onClick = {changeComp} className = "acceder" > Concluir</button>
				</form>
				
				
			</div>
	
    )
}

export default RegAccount;