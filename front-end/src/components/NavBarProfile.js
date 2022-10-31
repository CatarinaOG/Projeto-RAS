
import logo from '../images/logo.png'

export default function NavBarProfile  (props){
    
    const nome = props.userN;

    return (
        <div className="NavBar">
            <img src={logo} className='logo'/>
            <h3 className='welcomeUser'> Welcome, {nome} </h3>
        </div>
    )
}


