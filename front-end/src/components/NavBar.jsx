
import logo from '../images/logo.png'
import Link from '../components/Link'

import { myContext } from '../context';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';

export default function NavBar(props){

    const {filter,userType,setFilter,dark} = props
    const { username } = useContext(myContext)


    let navigate = useNavigate();

    function goToProfile(){
        if(userType === 'expert') navigate("/ProfileExpert", { replace: true })
        else navigate('/Profile', { replace: true })
    }

    return(

        <div className={`NavBar${dark}`}>
            <img src={logo} className='logo'/>

                <div className='search'>
                    <Link 
                        search='all' 
                        setFilter={setFilter}
                        highlight={filter === 'all' ? true : false}
                        dark={dark}
                        />
                    <Link 
                        search='football' 
                        setFilter={setFilter}
                        highlight={filter === 'football' ? true : false}
                        dark={dark}
                        />
                    <Link 
                        search='basketball' 
                        setFilter={setFilter}
                        highlight={filter === 'basketball' ? true : false}
                        dark={dark}
                        />
                    <Link 
                        search='tenis' 
                        setFilter={setFilter}
                        highlight={filter === 'tenis' ? true : false}
                        dark={dark}
                        />
                    <Link 
                        search='motoGP' 
                        setFilter={setFilter}
                        highlight={filter === 'motoGP' ? true : false}
                        dark={dark}
                        />
                </div>
            <h3 className='welcomeUser' onClick={goToProfile}> Welcome, {username} </h3>
        </div>




    )
}