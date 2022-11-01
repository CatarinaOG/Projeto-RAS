import visa from '../images/visa.jpeg'
import PayPal from '../images/PayPal.jpeg'
import '../styles/Profile.css'
import NavBarProfile from './NavBarProfile';

export default function PopUpMethod(props){

    const {showPopUp, setShowPopUp ,setMethod} = props;
    function cancel(){
        setShowPopUp('');
    }

    function defPaypal(){
        setMethod("Paypal");
    }

    function defMaestro(){
        setMethod("Maestro");
    }

    return (
        <div>
                {showPopUp === 'withdraw' && <h1 className='fth1Pop'>Levantar</h1>}
                {showPopUp === 'deposit' && <h1 className='fth1Pop'>Depositar</h1>}
                <button className="ftclosePop" onClick={cancel}>x</button>
                <img src={PayPal} onClick={defPaypal} className = 'ftbuttonPaypal'></img>
                <img src={visa} onClick={defMaestro} className = 'ftImgMaestro'></img>
                <h3 className='ftselectWay'>Selecione a forma de transferência</h3>
        </div>
    )
}