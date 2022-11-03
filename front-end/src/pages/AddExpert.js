import NavBarProfile from "../components/NavBarProfile";
import { useState } from 'react';
import PopUpAdmin from '../components/PopUpAdmin'
import goBackImg from '../images/goBack.png'

export default function AddSpecialist(props){

    const {username,setRender} = props

    
    const [confirmed,setConfirmed] = useState(false);

    const [formData, setFormData] = useState(
        {expert_username:null ,email:null,password:null}
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

    function goBack(){
        setRender('HomeAdmin')
    }
    

    return(
        <div className='ftaddSpecialist'>
            <div>
                <NavBarProfile username={username}/>
                <img src = {goBackImg} className='ftgoBackImg' onClick={goBack}/>
                <div className='ftwhiteShadow'>
                    <h1 className = "ftAddSp">Adicionar Especialista</h1>
                    <form onSubmit = {handleSubmit}>
                        <h3 className='ftpromptUsernameSp'>Insira o username:</h3>
                        <input type="text" onChange={handleChange} placeholder='username' name = "expert_username" value = {formData.expert_username} className="ftUsernameSp"/>
                        <h3 className='ftpromptEmailSp'>Insira o email:</h3>
                        <input type="text" onChange={handleChange} placeholder='email' name = "email" value = {formData.email} className="ftemailSp"/>
                        <h3 className='ftpromptPassSp'>Insira a password:</h3>
                        <input type="text" onChange={handleChange} placeholder='password' name = "password" value = {formData.password} className ="ftpasswordSp"/>
                        <button className = "ftaddConcludeSp">Registar</button>
                    </form>
                </div>
            </div>
            {confirmed && 
                <div>
                    <div className="ftbackgroundModal"></div>
                    <PopUpAdmin 
                        email = {formData.email}
                        password = {formData.password}
                        username={formData.expert_username}
                        setConfirmed ={setConfirmed}
                    />
                </div>
            }           
        </div>            
    )
}