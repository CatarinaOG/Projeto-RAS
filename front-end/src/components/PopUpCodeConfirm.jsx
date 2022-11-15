
import close from '../images/close.png'
import '../styles/Profile.css'
import {useState} from 'react'


//PopUp que surge pedindo ao utilizador o código que terá recebido por email.
export default function PopUpConfirm(props){

    const {setShowPopUp,setSec} = props;

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
    function handleSubmit(){
        setSec(1);
        setShowPopUp('');

    }


    //Faz desaprecer o popUp
    function cancel(){
        setShowPopUp('');
    }

    return (
        <div className="ftboxCode">

                <div>
                    <h1 className='fth1Pop'>Insira o código recebido</h1>
                    <form onSubmit={handleSubmit}>
                        <input onChange = {handleChange} type = "code" name = "code" className='ftCode' placeholder='Escreva o código' value = {formData.code}></input>
                        <button  className='ftConfirmEmail'> Confirm</button>
                    </form>
                    <button  className='ftResend'> Reenviar código</button>

                    <img src={close} className="close" onClick={cancel}/>
                </div>
        </div>
    )
}