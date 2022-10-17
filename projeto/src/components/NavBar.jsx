import {useState} from 'react'

import '../styles/navBar.css'
import logo from '../images/logo.png'
import Link from '../components/Link'

export default function NavBar({user,search}){

    return(

        <div className="NavBar">
            <img src={logo} className='logo'/>

                <div className='search'>
                    <Link 
                        search='Todos' 
                        highlight={search === 'All' ? true : false}/>
                    <Link 
                        search='Futebol' 
                        highlight={search === 'Football' ? true : false}/>
                    <Link 
                        search='Basquetebol' 
                        highlight={search === 'Basketball' ? true : false}/>
                    <Link 
                        search='Tenis' 
                        highlight={search === 'Tenis' ? true : false}/>
                    <Link 
                        search='MotoG' 
                        highlight={search === 'MotoGP' ? true : false}/>
                </div>
            <h3 className='welcomeUser'> Welcome, {user} </h3>
        </div>




    )
}