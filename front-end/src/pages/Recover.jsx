
import '../styles/Recover.css'


import celebrating from '../images/celebrating.png'
import RetrievePass from '../components/RetrievePass';
import { useContext } from 'react';
import { myContext } from '../context';

function Recover(){
	const {dark} = useContext(myContext)

    return(
		<div className={`page${dark}`}>
			<div className={`mainLog${dark}`}>
					<RetrievePass />
				<div className='logImage'>
					<img src={celebrating} className='imageRight'/>
				</div>
			</div>
		</div>
    )
}

export default Recover;