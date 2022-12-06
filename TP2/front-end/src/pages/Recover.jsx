
import RegAccount from '../components/RegAccount';
import InputsLogin from '../components/InputsLogin';
import '../styles/Recover.css'

import { useState } from 'react';

import celebrating from '../images/celebrating.png'
import RetrievePass from '../components/RetrievePass';

function Recover(props){
	const {dark} = props
	
    return(
		<div className={`page${dark}`}>
			<div className={`mainLog${dark}`}>
					<RetrievePass dark={dark}></RetrievePass>
				<div className='logImage'>
					<img src={celebrating} className='imageRight'/>
				</div>
			</div>
		</div>
       
    )
}

export default Recover;