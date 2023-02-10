
import close from '../images/close.png'
import '../styles/Profile.css'
import {useState} from 'react'
import { useContext } from 'react';
import { myContext } from '../context';


export default function PopUpEmail(props){

    const {setShowPopUp,email,setSafeCode} = props;
    const {dark} = useContext(myContext)

    //variavel que controla o estado da checkbox
    const [checked, setChecked] = useState(false)

    const [formData, setFormData] = useState(
        {email: ""}
    )
    
    //variavel que controla o conditional rendering do botão de confirmação
    const [waiting,setWaiting] = useState(0)


    //variavel que controla o conditional rendering da mensagem de erro
    const [errorMsg, setErrorMsg] = useState(0)

    function handleChange(event) {
        setFormData(prevFormData => {
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

    /**
     * Define a variável waiting de forma a mostrar ao user que o pedido está a ser processado
     * caso o input do email esteja preenchido é enviado o pedido, sendo que a resposta é armazenada recorrendo ao método setSafeCode
     * caso o a checkbox esteja ativa é enviado um pedido semelhante mas em que o corpo é o email passado como prop, sendo o comportamento em
     * relação à resposta igual
     * @param {*} event 
     */
    function handleSubmit(event){
        event.preventDefault();
        setWaiting(1)
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
                setSafeCode(data.code);
                setShowPopUp('confirm');
                setWaiting(0)
            })

        }
        else if (checked){
            
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
                setWaiting(0)

            })
            

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
                        <button  className={ waiting === 0 ? `ftConfirmEmail${dark}` : `ftConfirmEmailSelected${dark}`} > Confirm</button>
                    </form>
                    <img src={close} className="close" onClick={cancel}/>
			        {errorMsg===1 && <p className='ftErrorMsgEmail'>Selecione uma opção</p>}

                </div>
        </div>
    )
}