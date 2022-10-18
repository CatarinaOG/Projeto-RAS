import NavBar from "../components/NavBar"
import SearchBar from "../components/SearchBar"
import Report from "../components/Report"

import "../styles/home.css"
import {useState} from 'react'


export default function Home(){

    const [searching,setSearching] = useState('Todos')

    return(
        <div>
            <NavBar 
                user='Carlos' 
                searching={searching} 
                setSearching={setSearching} 
            />
            <div className="content">
                <SearchBar />
                <Report />
            </div>

        </div>
    )


}