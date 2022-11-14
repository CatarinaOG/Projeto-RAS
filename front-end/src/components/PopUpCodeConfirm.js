
import close from '../images/close.png'
import '../styles/Profile.css'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

export default function PopUpConfirm(props){

    const {setShowPopUp,setSec} = props;

    const [formData, setFormData] = useState(
        {code: ""}
    )
    
    let navigate = useNavigate();

	
    function handleChange(event) {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name] : event.target.value
            }
        })
    }

    function handleSubmit(){
        setSec(1);
        setShowPopUp('');

    }



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