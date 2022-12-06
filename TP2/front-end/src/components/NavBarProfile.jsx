
import logo from '../images/logo.png'

export default function NavBarProfile(props){
    
    const {username,dark} = props

    return (
        <div className={`NavBar${dark}`}>
            <img src={logo} className='logo'/>
            <h3 className='welcomeUser'> Welcome, {username} </h3>
        </div>
    )
}


