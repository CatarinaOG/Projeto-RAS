import { PureComponent } from "react";



export default function PopUpMaestro(props){

    const {showPopUp, setShowPopUp} = props;
    return(
        <div>
            <h1 className='fth1Pop'>Insira os dados</h1>
            <form>
                <input type="number" className="ftMaestroPopNum" placeholder="Número do Cartão"></input>
                <input type="number" className="ftMaestroPopCCV" placeholder="CCV"></input>
                <input type="number" className="ftMaestroValue" placeholder="Valor"></input>
                <button className="ftMaestroButton">Confirm</button>
            </form>
            <button className="ftclosePop" onClick={cancel}>x</button>
        </div>
    )
}

vou dar commit entãp, mas agr precisava do pc pode ser?
tranquilo, posso continuar amanha?yesss