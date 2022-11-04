import {useState} from 'react';

import PopUpMethod from './PopUpMethod';
import PopUpMaestro from './PopUpMaestro';
import PopUpPaypal from './PopUpPaypal';




export default function PopUpOperation(props){

    const {showPopUp, setShowPopUp,setBalance,email} = props;

    const [method , setMethod] = useState('');


    return(
        <div className="ftboxConfirmOp">
            {method==='' && <PopUpMethod showPopUp={showPopUp} setShowPopUp={setShowPopUp} setMethod={setMethod}/>}
            {method==='Maestro' && <PopUpMaestro setMethod={setMethod} showPopUp={showPopUp} email={email} setBalance={setBalance} setShowPopUp={setShowPopUp}/>}
            {method==='Paypal' && <PopUpPaypal setMethod={setMethod} showPopUp={showPopUp} email={email} setBalance={setBalance} setShowPopUp={setShowPopUp}/>}
        </div>
    )
}

