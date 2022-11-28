
import RegAccount from '../components/RegAccount';
import InputsLogin from '../components/InputsLogin';

import { useState } from 'react';

import celebrating from '../images/celebrating.png'

function Login(props){

	const [loadReg,setLoadReg] = useState(true);
	const {setUsername,setBalance,setRender,setEmail,balance,dark} = props;

	
    return(
		<div className={`page${dark}`}>
			<div className={`mainLog${dark}`}>
					<InputsLogin 
						setUsername={setUsername}	
						setBalance={setBalance}
						setRender = {setRender} 
						setLoadReg = {setLoadReg}
						setEmail={setEmail}
						balance={balance}
						dark={dark}
					/> 
				<div className='logImage'>
					<img src={celebrating} className='imageRight'/>
				</div>
			</div>
		</div>
       
    )
}

export default Login;