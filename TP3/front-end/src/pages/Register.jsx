import { useContext } from 'react';
import RegAccount from '../components/RegAccount';
import { myContext } from '../context';
import celebrating from '../images/celebrating.png'


export function RegisterPage(props){

	const {dark} = useContext(myContext)

    return(
		<div className={`page${dark}`}>
			<div className={`mainLog${dark}`}>
				<RegAccount/>
				<div className='logImage'>
					<img src={celebrating} className='imageRight'/>
				</div>
			</div>
		</div>
    )
}

export default RegisterPage;