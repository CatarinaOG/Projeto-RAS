
import '../styles/logSquare.css';
import RegAccount from '../components/RegAccount';
import InputsLogIn from '../components/InputsLogIn';

import { useState } from 'react';

function LogSquare(props){

	const [loadReg,setLoadReg] = useState(0);
	const {rendered, setRender} = props;

	
	
    return(
		<div className='page'>
			<div className='mainLog'>
				{loadReg === 0 ? <InputsLogIn setRender = {setRender} current = {loadReg} setFunc = {setLoadReg}/> : <RegAccount current = {loadReg} setFunc = {setLoadReg}/>}
				<div className='logImage'>
					<img src = {require('../images/celebrating.png')} className='imageRight'/>

				</div>
			</div>
		</div>
       
    )
}

export default LogSquare;