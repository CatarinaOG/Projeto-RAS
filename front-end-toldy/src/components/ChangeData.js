
import '../styles/ChangeData.css'
import {useState} from 'react'

export default function ChangeData(props){

    const defUser = props.username;

    const setVal = props.setVal;

    function change(){
        props.setCompLoad("history");
    }

    const [formData, setFormData] = useState(
        {firstName: "", lastName: "",password:""}
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
        props.setUser(formData.firstName);
 
    }

    function levPop(){
       setVal(1);
    }

    function depPop(x){
        setVal(2);
     }
 

    return (
        <div className="changeDataOutDiv">
                <button className='takeOut' onClick={levPop}> Levantar </button>
                <button className='deposit' onClick={depPop}> Depositar </button>
                <h3 className="clickHistory" onClick={change} > Consultar Histórico de Apostas</h3>
                <button  className='Change' onClick={change}> </button>
                <form onSubmit = {handleSubmit} >
                    <h3 className='hName'> Nome : </h3>
                    <input className= "inputName" onChange={handleChange} type = "text" placeholder={props.userN} name="firstName" value = {formData.firstName}></input>
                    <h3 className='hSurname'> Apelido : </h3>
                    <input className= "inputSurname" onChange={handleChange} type = "text" name="lastName"  value = {formData.lastName} ></input>
                    <h3 className='hPassword'> Mudar palavra passe</h3>
                    <input className= "inputPass" onChange={handleChange} type = "password" name = "password" value = {formData.password}></input>
                    <button  className='Confirm'> Confirm</button>
                </form>
        </div>
    )
}