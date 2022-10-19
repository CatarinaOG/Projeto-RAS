import NavBar from "../components/NavBar"
import SearchBar from "../components/SearchBar"
import Report from "../components/Report"
import Bet from '../components/Bet'

import "../styles/home.css"
import {useState} from 'react'


export default function Home(){

    const [searching,setSearching] = useState('Todos')

    const results = [
        { id: '0', result : 'Sporting' , odd: '0,34' },
        { id: '1', result : 'Empate' , odd: '0,1' },
        { id: '2', result : 'Varzim' , odd: '0,98' },
    ]

    const results2 = [
        { id: '3', result : 'Benfica' , odd: '1' },
        { id: '4', result : 'Empate' , odd: '0' },
        { id: '5', result : 'Porto' , odd: '0' },

    ]



    return(
        <div>
            <NavBar 
                user='Carlos' 
                searching={searching} 
                setSearching={setSearching} 
            />
            <div className="content">
                <div>
                    <SearchBar />
                    <div>
                        <Bet 
                            type='<4'
                            game='Sporting vs Varzim'
                            date='Hoje 22:00'
                            results={results}
                        />
                        <Bet 
                            type='<4'
                            game='Porto vs Benfica'
                            date='Hoje 23:00'
                            results={results2}
                        />
                    </div>
                </div>
                <Report />
            </div>

        </div>
    )


}