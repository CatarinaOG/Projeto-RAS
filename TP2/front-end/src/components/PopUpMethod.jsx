import visa from '../images/visa.jpeg'
import PayPal from '../images/PayPal.jpeg'
import close from '../images/close.png'

export default function PopUpMethod(props){

    const {showPopUp, setShowPopUp ,setMethod,dark} = props;

    function cancel(){
        setShowPopUp('');
    }

    //Caso seja premido o botão do paypal, é alterada a variavel method que irá determinar qual o popup renderizado a seguir
    function defPaypal(){
        setMethod("Paypal");
    }

    //Caso seja premido o botão do maestro, é alterada a variavel method que irá determinar qual o popup renderizado a seguir

    function defMaestro(){
        setMethod("Maestro");
    }

    return (
        <div>
            {showPopUp === 'transfer' && <h1 className={`fth1Pop${dark}`}>Levantar</h1>}
            {showPopUp === 'deposit' && <h1 className={`fth1Pop${dark}`}>Depositar</h1>}
            <img src={close} className="close" onClick={cancel}/>
            <img src={PayPal} onClick={defPaypal} className = 'ftbuttonPaypal'></img>
            <img src={visa} onClick={defMaestro} className = 'ftImgMaestro'></img>
            <h3 className={`ftselectWay${dark}`}>Selecione a forma de transferência</h3>
        </div>
    )
}