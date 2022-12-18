
import RegAccount from '../components/RegAccount';
import InputsLogin from '../components/InputsLogin';

import { useState } from 'react';

import celebrating from '../images/celebrating.png'

function Login(props){

	const {setUsername,setBalance,setRender,setEmail,setTypeUser,dark,switchDark} = props;

	
    return(
		<div className={`page${dark}`}>
			<div className={`mainLog${dark}`}>
					<InputsLogin 
						setUsername={setUsername}	
						setBalance={setBalance}
						setRender = {setRender} 
						setEmail={setEmail}
						setTypeUser={setTypeUser}
						dark={dark}
						switchDark={switchDark}
					/> 
				<div className='logImage'>
					<img src={celebrating} className='imageRight'/>
				</div>
			</div>
		</div>
       
    )
}

export default Login;