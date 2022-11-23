
import RegAccount from '../components/RegAccount';
import InputsLogin from '../components/InputsLogin';
import '../styles/Recover.css'

import { useState } from 'react';

import celebrating from '../images/celebrating.png'
import RetrievePass from '../components/RetrievePass';

function Recover(){

	
    return(
		<div className='page'>
			<div className='mainLog'>
					<RetrievePass></RetrievePass>
				<div className='logImage'>
					<img src={celebrating} className='imageRight'/>
				</div>
			</div>
		</div>
       
    )
}

export default Recover;