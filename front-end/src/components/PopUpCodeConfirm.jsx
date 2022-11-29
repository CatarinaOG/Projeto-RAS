
import close from '../images/close.png'
import '../styles/Profile.css'
import {useState} from 'react'


//PopUp que surge pedindo ao utilizador o código que terá recebido por email.
export default function PopUpConfirm(props){

    const {setShowPopUp,setSec,safeCode,dark} = props;
    const [errorMsg, setErrorMsg] = useState(0)

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
        if(formData.code === safeCode){
            setSec(1);
            setShowPopUp('');  
        }
        else{
            setErrorMsg(1)
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
        <div className={`ftboxCode${dark}`}>

                <div>
                    <h2 className={`fth2Pop${dark}`}>Insira o código recebido</h2>
                    <form onSubmit={handleSubmit}>
                        <input onChange = {handleChange} type = "code" name = "code" className={`ftCode${dark}`} placeholder='Escreva o código' value = {formData.code}></input>
                        <button  className={`ftConfirmCode${dark}`} > Confirm</button>
                    </form>
                    <button  onClick = {changeBack} className={`ftResend${dark}`} > Reenviar código</button>
			        {errorMsg===1 && <p className='ftErrorMsgCode'>Código errado</p>}
                    
                    <img src={close} className="close" onClick={cancel}/>
                </div>
        </div>
    )
}