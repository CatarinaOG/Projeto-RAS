
import '../styles/logSquare.css';
import RegAccount from './RegAccount';
import InputsLogIn from './InputsLogIn';

import { useState } from 'react';

function LogSquare(){

	const [loadReg,setLoadReg] = useState(0);
	
    return(
        <div className='mainLog'>
			{loadReg === 0 ? <InputsLogIn current = {loadReg} setFunc = {setLoadReg}/> : <RegAccount current = {loadReg} setFunc = {setLoadReg}/>}
			<div className='logImage'>
				<img src = {require('../images/celebrating.png')} className='imageRight'/>

			</div>
			

        </div>
    )
}

export default LogSquare;