import NavBar from "../components/NavBar"
import SearchBar from "../components/SearchBar"
import Report from "../components/Report"
import Bet from '../components/Bet'

import {useState} from 'react'


export default function Home(props){

    const {username,games,setRender} = props


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
                user={username} 
                searching={searching} 
                setSearching={setSearching} 
                setRender={setRender}
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