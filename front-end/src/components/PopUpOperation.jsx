import {useState} from 'react';

import PopUpMethod from './PopUpMethod';
import PopUpMaestro from './PopUpMaestro';
import PopUpPaypal from './PopUpPaypal';




export default function PopUpOperation(props){

    const {showPopUp, setShowPopUp,setBalance,email,dark} = props;

    const [method , setMethod] = useState('');


    return(
        <div className={`ftboxConfirmOps${dark}`}>
            {method==='' && <PopUpMethod showPopUp={showPopUp} setShowPopUp={setShowPopUp} setMethod={setMethod} dark={dark}/>}
            {method==='Maestro' && <PopUpMaestro setMethod={setMethod} showPopUp={showPopUp} email={email} setBalance={setBalance} setShowPopUp={setShowPopUp} dark={dark}/>}
            {method==='Paypal' && <PopUpPaypal setMethod={setMethod} showPopUp={showPopUp} email={email} setBalance={setBalance} setShowPopUp={setShowPopUp} dark={dark}/>}
        </div>
    )
}

