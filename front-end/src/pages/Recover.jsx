
import '../styles/Recover.css'


import celebrating from '../images/celebrating.png'
import RetrievePass from '../components/RetrievePass';

function Recover(props){
	const {t,dark} = props
	
    return(
		<div className={`page${dark}`}>
			<div className={`mainLog${dark}`}>
					<RetrievePass t={t} dark={dark}></RetrievePass>
				<div className='logImage'>
					<img src={celebrating} className='imageRight'/>
				</div>
			</div>
		</div>
    )
}

export default Recover;