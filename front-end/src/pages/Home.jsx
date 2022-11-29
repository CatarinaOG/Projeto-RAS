import NavBar from "../components/NavBar"
import SearchBar from "../components/SearchBar"
import Report from "../components/Report"
import Bet from '../components/Bet'
import BetMotoGP from '../components/BetMotoGP'


import {useState} from 'react'


export default function Home(props){

    const {username,email,games,setBalance,dark} = props


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
        var sportENG = getInEnglish(game.sport)

        game.results.map( game => {
            if (game.odd === 0) notNull = false
        })

        if (sportENG === filter)
            show = true

        if(notNull && ( show || filter === 'all'))
            if(game.sport === 'motoGP'){
                return(
                    <BetMotoGP 
                        key={game.id}
                        game={game} 
                        setSelected={setSelected} 
                        selected={selected}
                        dark={dark}
                    /> 
                )
            }else{
                return(
                    <Bet 
                        key={game.id}
                        game={game} 
                        setSelected={setSelected} 
                        selected={selected}
                        dark={dark}
                    /> 
                )
            }
    }) 

    return(
        <div>
            <NavBar 
                user={username} 
                filter={filter} 
                setFilter={setFilter}
                userType="user"
                dark={dark}
            />
            <div className={`content${dark}`}>
                <div>
                    <SearchBar dark={dark}/>
                    <div className={`allBets${dark}`}>
                        {allBets}
                    </div>
                </div>
                <Report
                    games={games}
                    selected={selected}
                    email={email}
                    setBalance={setBalance}
                    setSelected={setSelected}
                    dark={dark}
                />
            </div>
        </div>
    )


}