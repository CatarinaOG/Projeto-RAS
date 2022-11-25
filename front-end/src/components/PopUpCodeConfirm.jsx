
import close from '../images/close.png'
import '../styles/Profile.css'
import {useState} from 'react'


//PopUp que surge pedindo ao utilizador o código que terá recebido por email.
export default function PopUpConfirm(props){

    const {setShowPopUp,setSec, email} = props;

    const [formData, setFormData] = useState(
        {code: ""}
    )
    

    function handleChange(event) {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name] : event.target.value
            }
        })
    }

    //Comportamento após submissão do form com o código
    function handleSubmit(event){
        event.preventDefault();

        if(formData.code != ""){
            fetch('http://127.0.0.1:8080/api/expert/race', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json ',
                    },
                    body: JSON.stringify({
                        email_user : email,
                        code : formData.code
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'true'){
                        setSec(1);
                        setShowPopUp('');   
                    }
                })  
        }
    }


    //Faz desaprecer o popUp
    function cancel(){
        setShowPopUp('');
    }

    function changeBack(){
        setShowPopUp('changeSec');
    }

    return (
        <div className="ftboxCode">

                <div>
                    <h1 className='fth1Pop'>Insira o código recebido</h1>
                    <form onSubmit={handleSubmit}>
                        <input onChange = {handleChange} type = "code" name = "code" className='ftCode' placeholder='Escreva o código' value = {formData.code}></input>
                        <button  className='ftConfirmEmail'> Confirm</button>
                    </form>
                    <button  onClick = {changeBack} className='ftResend'> Reenviar código</button>

                    <img src={close} className="close" onClick={cancel}/>
                </div>
        </div>
    )
}