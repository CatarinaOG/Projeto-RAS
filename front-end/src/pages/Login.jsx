
import InputsLogin from '../components/InputsLogin';
import celebrating from '../images/celebrating.png'

function Login(props){

	const {t,i18n,setUsername,setBalance,setRender,setEmail,setTypeUser,dark,switchDark} = props;

	
    return(
		<div className={`page${dark}`}>
			<div className={`mainLog${dark}`}>
					<InputsLogin
						t={t}
						i18n={i18n} 
						setUsername={setUsername}	
						setBalance={setBalance}
						setRender = {setRender} 
						setEmail={setEmail}
						setTypeUser={setTypeUser}
						dark={dark}
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