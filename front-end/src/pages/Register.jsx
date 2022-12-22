import RegAccount from '../components/RegAccount';
import celebrating from '../images/celebrating.png'


export function RegisterPage(props){

	const {t,dark} = props

    return(
		<div className={`page${dark}`}>
			<div className={`mainLog${dark}`}>
					<RegAccount
						t = {t}
						dark={dark}	 
					/>
				<div className='logImage'>
					<img src={celebrating} className='imageRight'/>
				</div>
			</div>
		</div>
    )
}

export default RegisterPage;