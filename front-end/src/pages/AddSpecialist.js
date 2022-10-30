import '../styles/AddSpecialist.css';
import NavBarProfile from "../components/NavBarProfile";
import IdSaldo from '../components/IdSaldo';
import { useState } from 'react';
import PopUp from '../components/PopUp'

export default function AddSpecialist(){

    const [username,setUsername] = useState("Francisco Toldy");
    const [val,setVal] = useState(0);
    const [confirmed,setConfirmed] = useState(0);
    const confirmation =  0;
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
        setConfirmed(1);
	}
    

    return(
        <div className='addSpecialist'>
            <div>
                <NavBarProfile userN = {username}/>
                <div className='whiteShadow'>
                    <h1 className = "title">Adicionar Especialista</h1>
                    <form onSubmit = {handleSubmit}>
                        <h3 className='promptEmail'>Insira o email:</h3>
                        <input type="text" onChange={handleChange} placeholder='email' name = "email" value = {formData.email} className="emailSp"/>
                        <h3 className='promptPass'>Insira a password:</h3>
                        <input type="text" onChange={handleChange} placeholder='password' name = "password" value = {formData.password} className ="passwordSp"/>
                        <button className = "conclude" > Concluir</button>
                    </form>
                </div>
            </div>
            {confirmed !=0 && <div><div  className="backgroundModal"></div><PopUp val = {val} setVal = {setVal} confirmation ={confirmation} setConfirmed={setConfirmed}/></div>} 

        </div>    
    )
}