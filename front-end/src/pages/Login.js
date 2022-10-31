
import RegAccount from '../components/RegAccount';
import InputsLogin from '../components/InputsLogin';

import { useState } from 'react';

import celebrating from '../images/celebrating.png'

function Login(props){

	const [loadReg,setLoadReg] = useState(true);
	const {setUsername,setBalance,setRender} = props;

	
    return(
		<div className='page'>
			<div className='mainLog'>
				{loadReg ? 
					<InputsLogin 
						setUsername={setUsername}	
						setBalance={setBalance}
						setRender = {setRender} 
						setLoadReg = {setLoadReg}
					/> 
					: 
					<RegAccount 
						setLoadReg = {setLoadReg}
					/>
				}
				<div className='logImage'>
					<img src={celebrating} className='imageRight'/>
				</div>
			</div>
		</div>
       
    )
}

export default Login;