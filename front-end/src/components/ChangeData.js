
import '../styles/Profile.css'
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
                <button className='fttakeOut' onClick={levPop}> Levantar </button>
                <button className='ftdeposit' onClick={depPop}> Depositar </button>
                
                <h4 className="clickHistory" onClick={change} > Consultar Histórico de Apostas</h4>
                
                <button  className='ftChange' onClick={change}> > </button>
                <form onSubmit = {handleSubmit} >
                    <h4 className='hName'> Nome : </h4>
                
                    <input className= "ftinputName" onChange={handleChange} type = "text" placeholder={props.userN} name="firstName" value = {formData.firstName}></input>
                
                    <h4 className='hSurname'> Apelido : </h4>
                
                    <input className= "ftinputSurname" onChange={handleChange} type = "text" name="lastName"  value = {formData.lastName} ></input>
                
                    <h4 className='hPassword'> Mudar palavra passe</h4>
                
                    <input className= "ftinputPass" onChange={handleChange} type = "password" name = "password" value = {formData.password}></input>
                
                    <button  className='ftConfirm'> Confirm</button>
                </form>
        </div>
    )
}