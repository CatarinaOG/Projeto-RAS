
import close from '../images/close.png'
import '../styles/Profile.css'
import {useState} from 'react'


export default function PopUpEmail(props){

    const {setShowPopUp,email,setSafeCode,safeCode,dark} = props;

    const [checked, setChecked] = useState(false)

    const [formData, setFormData] = useState(
        {email: ""}
    )
    
    const [errorMsg, setErrorMsg] = useState(0)

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
            fetch('http://127.0.0.1:8080/api/users/get_code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json ',
                },
                body: JSON.stringify({ email_user : formData.email})
                
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setSafeCode(data.code);
                setShowPopUp('confirm');
            })
            setShowPopUp('confirm');

        }
        else if (checked){
            console.log("ENTROU AQUI")
            /*
            fetch('http://127.0.0.1:8080/api/users/get_code', {
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
                console.log(data);
                setSafeCode(data.code);
                setShowPopUp('confirm');
            })
            */
            setShowPopUp('confirm');

        }
        else{
            setErrorMsg(1)
        }

    }

    return (
        <div className={`ftboxConfirmOp${dark}`}>

                <div>
                    <h2 className={`fth2Pop${dark}`}>Insira email para onde será enviado o código</h2>
                    <form onSubmit = {handleSubmit}>
                        <input onChange={handleChange} type = "email" name = "email" className={`ftemailCode${dark}`} placeholder='Escreva o email' value={formData.email}></input>
                        <h3 className={`fth3PopEmail${dark}`}>Usar email da conta</h3>
                        <input onChange={handleChangeCheck} type = "checkbox" className={`ftcheckBoxEmail${dark}`}></input>
                        <button  className={`ftConfirmEmail${dark}`} > Confirm</button>
                    </form>
                    <img src={close} className="close" onClick={cancel}/>
			        {errorMsg===1 && <p className='ftErrorMsgEmail'>Selecione uma opção</p>}

                </div>
        </div>
    )
}