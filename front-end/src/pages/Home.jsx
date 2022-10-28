import NavBar from "../components/NavBar"
import SearchBar from "../components/SearchBar"
import Report from "../components/Report"
import Bet from '../components/Bet'


import "../styles/home.css"
import {useState} from 'react'


export default function Home(){

    const games = [{
        id : 0,
        home: 'sporting',
        away: 'varzim',
        date: 'hoje 22:00',
        results: [
            { id: 0, result : 'Sporting' , odd: '0,1'},
            { id: 1, result : 'Empate' , odd: '0,2'},
            { id: 2, result : 'Varzim' , odd: '0,3'},
        ]
    },
    {
        id : 1,
        home: 'sporting',
        away: 'varzim',
        date: 'hoje 22:00',
        results: [
            { id: 3, result : 'Sporting' , odd: '0,4'},
            { id: 4, result : 'Empate' , odd: '0,5'},
            { id: 5, result : 'Varzim' , odd: '0,6'},
        ]
    }]

    const [searching,setSearching] = useState('Todos')
    const [selected,setSelected] = useState([])

    const allBets = games.map( (game) => (
        <Bet 
            key={game.id}
            gameId={game.id}
            game={game} 
            setSelected={setSelected} 
            selected={selected}/> 
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
                <Report 
                    games={games}
                    selected={selected}
                    setSelected={setSelected}
                />

            </div>

        </div>
    )


}