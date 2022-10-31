import '../styles/AddSpecialist.css';
import NavBarProfile from "../components/NavBarProfile";
import { useState } from 'react';
import PopUp from '../components/PopUp'

export default function AddSpecialist(props){

    const {username} = props

    //state para retirar
    const [val,setVal] = useState(0);
    
    const [confirmed,setConfirmed] = useState(false);

    const [formData, setFormData] = useState(
        {email: "",password:""}
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

        // Mandar pedido e esperar por verificação

        setConfirmed(true);
	}
    

    return(
        <div className='ftaddSpecialist'>
            <div>
                <NavBarProfile userN = {username}/>
                <div className='ftwhiteShadow'>
                    <h1 className = "ftAddSp">Adicionar Especialista</h1>
                    <form onSubmit = {handleSubmit}>
                        <h3 className='ftpromptEmailSp'>Insira o email:</h3>
                        <input type="text" onChange={handleChange} placeholder='email' name = "email" value = {formData.email} className="ftemailSp"/>
                        <h3 className='ftpromptPassSp'>Insira a password:</h3>
                        <input type="text" onChange={handleChange} placeholder='password' name = "password" value = {formData.password} className ="ftpasswordSp"/>
                        <button className = "ftaddConcludeSp" > Concluir</button>
                    </form>
                </div>
            </div>
            {confirmed && 
                <div>
                    <div className="ftbackgroundModal"></div>
                    <PopUp 
                        val={val} 
                        setVal={setVal} 
                        setConfirmed={setConfirmed}
                    />
                </div>
            }           
        </div>            
    )
}