
import {useState} from 'react'
import goBackImg from "../images/goBack.png"

export default function ChangeData(props){

    const {setUsername,setShowPopUp,setDataOrHistory,setRender} = props

    function goBack(){
        setRender('Home')
    }

    function goToHistory(){
        setDataOrHistory("history");
    }

    const [formData, setFormData] = useState(
        {firstName: "", lastName: "",password:""}
    )
    
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

        // Tratar do pedido e verificação

        setUsername(formData.firstName);
    }

    function withdrawPop(){
        setShowPopUp('transfer');
    }

    function depositPop(x){
        setShowPopUp('deposit');
    }

    function logOut(){
        setRender('Login')
    }
 

    return (
        <div className="changeDataOutDiv">
                <button className='ftLogout' onClick={logOut}> Log out </button>
                <button className='fttakeOut' onClick={withdrawPop}> Levantar </button>
                <button className='ftdeposit' onClick={depositPop}> Depositar </button>
                <img src = {goBackImg} className="ftgoBack" onClick={goBack}/>
                
                <h4 className="clickHistory"> Consultar Histórico de Apostas</h4>
                
                <button  className='ftChange' onClick={goToHistory}> {'>'} </button>
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