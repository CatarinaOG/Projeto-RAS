import NavBar from "../components/NavBar"
import SearchBar from "../components/SearchBar"
import Report from "../components/Report"
import Bet from '../components/Bet'

import {useState} from 'react'


export default function Home(props){

    const {username,email,games,setBalance} = props


    const [selected,setSelected] = useState([])             //lista de apostas selecionadas [{id,gameId,odd}]
    const [filter,setFilter] = useState('all')              //utilizado para saber secção atual

    function getInEnglish(type){
        switch (type) {
            case "futebol": return 'football'
            case "basquetebol": return 'basketball'
            case "motoGP": return 'motoGP'
            case "tenis": return 'tenis'
        }
    }


    //Mostra todas as bets do lado esquerdo
    const allBets = games.map( (game) => {

        var notNull = true
        var show = false
        var sportPT = getInEnglish(game.sport)

        game.results.map( game => {
            if (game.odd === 0) notNull = false
        })

        if (sportPT === filter)
            show = true

        

        if(notNull && ( show || filter === 'all'))
            return(
            <Bet 
                key={game.id}
                gameId={game.id}
                game={game} 
                setSelected={setSelected} 
                selected={selected}
            /> 
            )
    }) 

    return(
        <div>
            <NavBar 
                user={username} 
                filter={filter} 
                setFilter={setFilter}
                userType="user"
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
                    email={email}
                    setBalance={setBalance}
                    setSelected={setSelected}
                />
            </div>

        </div>
    )


}