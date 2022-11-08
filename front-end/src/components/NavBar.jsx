
import logo from '../images/logo.png'
import Link from '../components/Link'

import { useNavigate } from "react-router-dom";

export default function NavBar(props){

    const {user,searching,setSearching,userType} = props

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
                        search='Todos' 
                        setSearching={setSearching}
                        highlight={searching === 'Todos' ? true : false}/>
                    <Link 
                        search='Futebol' 
                        setSearching={setSearching}
                        highlight={searching === 'Futebol' ? true : false}/>
                    <Link 
                        search='Basquetebol' 
                        setSearching={setSearching}
                        highlight={searching === 'Basquetebol' ? true : false}/>
                    <Link 
                        search='Tenis' 
                        setSearching={setSearching}
                        highlight={searching === 'Tenis' ? true : false}/>
                    <Link 
                        search='MotoGP' 
                        setSearching={setSearching}
                        highlight={searching === 'MotoGP' ? true : false}/>
                </div>
            <h3 className='welcomeUser' onClick={goToProfile}> Welcome, {user} </h3>
        </div>




    )
}