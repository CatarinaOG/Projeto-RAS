
import '../styles/NavBarProfile.css';

export default function NavBarProfile  (props){
    
    const nome = props.userN;

    return (
        <div className='navBar'>
		    <img className = "rasbetLogoProf" src = {require('../images/logo.png')}/>

            <h3 className='welcomeMessage'> Bem-vindo , {nome}</h3>
        </div>
    )
}


