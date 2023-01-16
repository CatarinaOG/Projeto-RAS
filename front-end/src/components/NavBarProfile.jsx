
import { useContext } from 'react'
import { myContext } from '../context'
import logo from '../images/logo.png'

export default function NavBarProfile(props){
    
    const {dark} = props
    const {username} = useContext(myContext)

    return (
        <div className={`NavBar${dark}`}>
            <img src={logo} className='logo'/>
            <h3 className='welcomeUser'> Welcome, {username} </h3>
        </div>
    )
}


