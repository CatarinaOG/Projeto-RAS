import RegAccount from '../components/RegAccount';


import { useState } from 'react';

import celebrating from '../images/celebrating.png'

export function RegisterPage(){


	
    return(
		<div className='page'>
			<div className='mainLog'>
					<RegAccount 
					/>
				<div className='logImage'>
					<img src={celebrating} className='imageRight'/>
				</div>
			</div>
		</div>
       
    )
}

export default RegisterPage;