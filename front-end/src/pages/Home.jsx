import NavBar from "../components/NavBar"
import SearchBar from "../components/SearchBar"
import Report from "../components/Report"
import Bet from '../components/Bet'

import "../styles/home.css"
import {useState} from 'react'


export default function Home(){

    const games = [{
        home: 'sporting',
        away: 'varzim',
        date: 'hoje 22:00',
        results: [
            { id: '0', result : 'Sporting' , odd: '0,34', selected: false },
            { id: '1', result : 'Empate' , odd: '0,1' , selected: false },
            { id: '2', result : 'Varzim' , odd: '0,98', selected: false },
        ]
    },
    {
        home: 'Benfica',
        away: 'Porto',
        date: 'hoje 22:00',
        results: [
            { id: '3', result : 'Benfica' , odd: '0,34', selected: false },
            { id: '4', result : 'Empate' , odd: '0,1' , selected: false },
            { id: '5', result : 'Porto' , odd: '0,98', selected: false },
        ]
    }]

    const [searching,setSearching] = useState('Todos')
    const [bets,setBets] = useState(defaultBets)

    const allBets = games.map( (game) => (
        <Bet 
            game={game} 
            changeBets={setBets} 
            bets={bets}/> 
    )) 

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
                        {allBets}
                    </div>
                </div>
                <Report />
            </div>

        </div>
    )


}