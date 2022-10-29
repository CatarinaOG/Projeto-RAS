import '../styles/regAccount.css';




function RegAccount({current,setFunc}){

	function changeComp(){
        if(current === 0){
			setFunc(1);
		}
		else{
			setFunc(0);
		}
    }

    return(
        
			<div className='regAccount'>
				<img className = "rasbetLogo" src = {require('../images/logo.png')}/>

				<h1 className = "Registo"> Registo</h1>
				<input className = "email" type="text" placeholder = "E-mail" />
				<input className = "passsword" type="password" placeholder = "Palavra-passe" />
				<input className = "birthdate" type="text" placeholder = "Data de Nascimento" />
				<input className = "NIF" type="text" placeholder = "NIF" />

				<button onClick = {changeComp} className = "acceder" > Concluir</button>
				
			</div>
	
    )
}

export default RegAccount;