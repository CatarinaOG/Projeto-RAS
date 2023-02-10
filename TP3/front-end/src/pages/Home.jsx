import NavBar from "../components/NavBar"
import SearchBar from "../components/SearchBar"
import Report from "../components/Report"
import Bet from '../components/Bet'
import BetMotoGP from '../components/BetMotoGP'


import {useState} from 'react'
import { useEffect } from "react"
import { useContext } from "react"
import { myContext } from "../context"


export default function Home(props){

    const {email,setBalance} = props
    const {dark} = useContext(myContext)

    const [selected,setSelected] = useState([])             //lista de apostas selecionadas [{id,gameId,odd}]
    const [filter,setFilter] = useState('all')              //utilizado para saber secção atual
    const [search,setSearch] = useState([])
    const [text,setText] = useState('')
    const [games,setGames] = useState([])

    function getInEnglish(type){
        switch (type) {
            case "futebol": return 'football' 
            case "basquetebol": return 'basketball'
            case "motoGP": return 'motoGP'
            case "tenis": return 'tenis'
            default: return false
        }
    }


    useEffect(() => {

        const interval = setInterval(() => {
            const user = {
                email : email
            }
            
            fetch('http://127.0.0.1:8080/api/games/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            })
            .then(response => response.json())
            .then(data => {
                if(data.games){
                    setGames(data.games)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }, 1000);

        return () => clearInterval(interval);
    })

    function getGames(){
        
        const user = {
            email : email
        }

        fetch('http://127.0.0.1:8080/api/games/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(data => {
            if(data.games){
                setGames(data.games)
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    //Mostra todas as bets do lado esquerdo
    const allBets = games.map( (game) => {

        var notNull = true
        var sportENG = getInEnglish(game.sport)

        game.results.map( game => {
            if (game.odd === 0) notNull = false
        })

        if(text === ''){
            if(notNull && ( sportENG === filter || filter === 'all') && game.active === 'true'){
                if(game.sport === 'motoGP'){
                    return(
                        <BetMotoGP 
                            email={email}
                            getGames={getGames}
                            key={game.id}
                            game={game} 
                            setSelected={setSelected} 
                            selected={selected}
                        /> 
                    )
                }else{
                    return(
                        <Bet 
                            email={email}
                            getGames={getGames}
                            key={game.id}
                            game={game} 
                            setSelected={setSelected} 
                            selected={selected}
                        /> 
                    )
                }
            }
        }
        else{
            if(search.length > 0){
                if(search.find(elem => elem === game.id)){
                    if(notNull && ( sportENG === filter || filter === 'all') && game.active === 'true'){
                        if(game.sport === 'motoGP'){
                            return(
                                <BetMotoGP 
                                    key={game.id}
                                    game={game} 
                                    setSelected={setSelected} 
                                    selected={selected}
                                /> 
                            )
                        }else{
                            return(
                                <Bet 
                                    key={game.id}
                                    game={game} 
                                    setSelected={setSelected} 
                                    selected={selected}
                                /> 
                            )
                        }
                    }
                }
            }
        }
    }) 

    return(
        <div>
            <NavBar 
                filter={filter} 
                setFilter={setFilter}
                userType="user"
            />
            <div className={`content${dark}`}>
                <div>
                    <SearchBar 
                        setText={setText}
                        setSearch={setSearch}
                    />
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
                />
            </div>
        </div>
    )


}