
import { useContext } from 'react';
import InputsLogin from '../components/InputsLogin';
import { myContext } from '../context';
import celebrating from '../images/celebrating.png'

function Login(props){

	const {setUsername,setBalance,setRender,setEmail,setTypeUser,switchDark} = props;
	const {dark} = useContext(myContext)

    return(
		<div className={`page${dark}`}>
			<div className={`mainLog${dark}`}>
					<InputsLogin
						setUsername={setUsername}	
						setBalance={setBalance}
						setRender = {setRender} 
						setEmail={setEmail}
						setTypeUser={setTypeUser}
						switchDark={switchDark}
					/> 
				<div className='logImage'>
					<img src={celebrating} className='imageRight' alt=""/>
				</div>
			</div>
		</div>
    )
}

export default Login;