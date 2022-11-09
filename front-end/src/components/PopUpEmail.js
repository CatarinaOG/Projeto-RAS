
import close from '../images/close.png'
import '../styles/Profile.css'


export default function PopUpEmail(props){

    const {showPopUp, setShowPopUp,setBalance,email} = props;


    function cancel(){
        setShowPopUp('');
    }

    return (
        <div className="ftboxConfirmOp">

                <div>
                    <h1 className='fth1Pop'>Insira email para onde será enviado o código</h1>
                    <form>
                        <input type = "email" name = "emailCode" className='ftemailCode' placeholder='Escreva o email'></input>
                        <h3 className='fth3PopEmail'>Usar email da conta</h3>
                        <input type = "checkbox" className='ftcheckBoxEmail'></input>
                        <button  className='ftConfirmEmail'> Confirm</button>
                    </form>
                    <img src={close} className="close" onClick={cancel}/>
                </div>
        </div>
    )
}