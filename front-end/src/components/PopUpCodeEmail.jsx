
import close from '../images/close.png'
import '../styles/Profile.css'
import {useState} from 'react'


export default function PopUpEmail(props){

    const {setShowPopUp,email} = props;

    const [checked, setChecked] = useState(false)

    const [formData, setFormData] = useState(
        {email: ""}
    )
    
    function handleChange(event) {
        setFormData(prevFormData => {
            console.log(formData.email)

            return {
                ...prevFormData,
                [event.target.name] : event.target.value
            }
        })
    }

    function handleChangeCheck(){
        setChecked(!checked);
    }

    //Faz desaprecer o popUp
    function cancel(){
        setShowPopUp('');
    }

    function handleSubmit(event){
        event.preventDefault();

        if (formData.email != ""){
            fetch('http://127.0.0.1:8080/api/expert/newGame', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json ',
                },
                body: JSON.stringify({ email_user : formData.email})
                
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'true'){
                    setShowPopUp('confirm');
                }
            })
        }
        else if (checked){
            
            fetch('http://127.0.0.1:8080/api/expert/newGame', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json ',
                },
                body: JSON.stringify({
                    email_user : email
                })
                
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'true'){
                    setShowPopUp('confirm');
                }
            })
        }
        setShowPopUp('confirm');
    }

    return (
        <div className="ftboxConfirmOp">

                <div>
                    <h1 className='fth1Pop'>Insira email para onde será enviado o código</h1>
                    <form onSubmit = {handleSubmit}>
                        <input onChange={handleChange} type = "email" name = "email" className='ftemailCode' placeholder='Escreva o email' value={formData.email}></input>
                        <h3 className='fth3PopEmail'>Usar email da conta</h3>
                        <input onChange={handleChangeCheck} type = "checkbox" className='ftcheckBoxEmail'></input>
                        <button  className='ftConfirmEmail' > Confirm</button>
                    </form>
                    <img src={close} className="close" onClick={cancel}/>
                </div>
        </div>
    )
}