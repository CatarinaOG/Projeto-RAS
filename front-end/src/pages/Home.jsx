import NavBar from "../components/NavBar"
import SearchBar from "../components/SearchBar"
import Report from "../components/Report"
import Bet from '../components/Bet'


import "../styles/home.css"
import {useState} from 'react'
import { useAsyncError } from "react-router-dom"


export default function Home(){

    const games = [{
        id : 0,
        home: 'sporting',
        away: 'varzim',
        date: 'hoje 22:00',
        results: [
            { id: 0, result : 'Sporting' , odd: 0.1, amount: 0},
            { id: 1, result : 'Empate' , odd: 0.2, amount: 0},
            { id: 2, result : 'Varzim' , odd: 0.3, amount: 0},
        ]
    },
    {
        id : 1,
        home: 'sporting',
        away: 'varzim',
        date: 'hoje 22:00',
        results: [
            { id: 3, result : 'Sporting' , odd: 0.4, amount: 0},
            { id: 4, result : 'Empate' , odd: 0.5, amount: 0},
            { id: 5, result : 'Varzim' , odd: 0.6, amount: 0},
        ]
    }]

    const [searching,setSearching] = useState('Todos')      //utilizado para saber secção atual
    const [selected,setSelected] = useState([])             //lista de apostas selecionadas [{id,gameId,odd}]


    //Mostra todas as bets do lado esquerdo
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
                    <div className="allBets">
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