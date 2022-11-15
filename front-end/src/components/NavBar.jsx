
import logo from '../images/logo.png'
import Link from '../components/Link'

import { useNavigate } from "react-router-dom";

export default function NavBar(props){

    const {user,filter,userType,setFilter} = props

    let navigate = useNavigate();

    function goToProfile(){
        if(userType === 'expert') navigate("/ProfileExpert")
        else navigate('/Profile')
    }

    return(

        <div className="NavBar">
            <img src={logo} className='logo'/>

                <div className='search'>
                    <Link 
                        search='all' 
                        setFilter={setFilter}
                        highlight={filter === 'all' ? true : false}/>
                    <Link 
                        search='football' 
                        setFilter={setFilter}
                        highlight={filter === 'football' ? true : false}/>
                    <Link 
                        search='basketball' 
                        setFilter={setFilter}
                        highlight={filter === 'basketball' ? true : false}/>
                    <Link 
                        search='tenis' 
                        setFilter={setFilter}
                        highlight={filter === 'tenis' ? true : false}/>
                    <Link 
                        search='motoGP' 
                        setFilter={setFilter}
                        highlight={filter === 'motoGP' ? true : false}/>
                </div>
            <h3 className='welcomeUser' onClick={goToProfile}> Welcome, {user} </h3>
        </div>




    )
}