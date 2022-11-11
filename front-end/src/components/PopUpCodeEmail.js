
import close from '../images/close.png'
import '../styles/Profile.css'
import {useState} from 'react'


export default function PopUpEmail(props){

    const {setShowPopUp,} = props;


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


    function cancel(){
        setShowPopUp('');
    }

    function handleSubmit(){
        if (formData.email != ""){
            
            setShowPopUp('confirm');
        }
    }

    return (
        <div className="ftboxConfirmOp">

                <div>
                    <h1 className='fth1Pop'>Insira email para onde será enviado o código</h1>
                    <form onSubmit = {handleSubmit}>
                        <input onChange={handleChange} type = "email" name = "email" className='ftemailCode' placeholder='Escreva o email' value={formData.email}></input>
                        <h3 className='fth3PopEmail'>Usar email da conta</h3>
                        <input onChange={handleChange} type = "checkbox" className='ftcheckBoxEmail'></input>
                        <button  className='ftConfirmEmail' > Confirm</button>
                    </form>
                    <img src={close} className="close" onClick={cancel}/>
                </div>
        </div>
    )
}