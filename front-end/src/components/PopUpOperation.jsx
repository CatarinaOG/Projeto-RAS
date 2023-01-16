import {useState} from 'react';

import PopUpMethod from './PopUpMethod';
import PopUpMaestro from './PopUpMaestro';
import PopUpPaypal from './PopUpPaypal';
import { useContext } from 'react';
import { myContext } from '../context';




export default function PopUpOperation(props){

    const {showPopUp, setShowPopUp,setBalance,email} = props;
    const {dark} = useContext(myContext)

    const [method , setMethod] = useState('');


    return(
        <div className={`ftboxConfirmOps${dark}`}>
            {method==='' && <PopUpMethod showPopUp={showPopUp} setShowPopUp={setShowPopUp} setMethod={setMethod} dark={dark}/>}
            {method==='Maestro' && <PopUpMaestro showPopUp={showPopUp} email={email} setBalance={setBalance} setShowPopUp={setShowPopUp} dark={dark}/>}
            {method==='Paypal' && <PopUpPaypal showPopUp={showPopUp} email={email} setBalance={setBalance} setShowPopUp={setShowPopUp} dark={dark}/>}
        </div>
    )
}

