import NavBar from "../components/NavBar"
import SearchBar from "../components/SearchBar"
import BetExpert from '../components/BetExpert'
import ModalWarningActive from '../components/ModalWarningActive'
import ModalChangeOdd from '../components/ModalChangeOdd'
import ModalChangeOddConfirmation from '../components/ModalChangeOddConfirmation'
import Progress from '../components/Progress'
import BetExpertMotoGP from '../components/BetExpertMotoGP'

import "../styles/home.css"
import {useState} from 'react'
import { useEffect } from "react"


export default function HomeExpert(props){

    const {username,dark} = props

    const [filter,setFilter] = useState('all')              //utilizado para saber secção atual

    const [modalWarningActive,setModalWarningActive] = useState(false)
    const [modalChangeOdd,setModalChangeOdd] = useState(false)
    const [modalChangeOddConfimation,setModalChangeOddConfimation] = useState(false)

    const [oddToChange,setOddToChange] = useState()   // {id,gameId}

    const [search,setSearch] = useState([])
    const [text,setText] = useState('')
    const [games,setGames] = useState([])


    useEffect(() => {

        const user = {
            email : "user@user"
        }

        console.log(JSON.stringify(user))

        const interval = setInterval(() => {
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
    },[])

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

        if(text === ''){
            if( getInEnglish(game.sport) === filter || filter === 'all')
                if(game.sport === 'motoGP'){
                    return(
                        <BetExpertMotoGP 
                            key={game.id}
                            games={games}
                            gameId={game.id}
                            game={game} 
                            setModalWarningActive={setModalWarningActive}
                            setModalChangeOdd={setModalChangeOdd}
                            setOddToChange={setOddToChange}
                            setGames={setGames}
                            dark={dark}
                        />
                    )
                }else{
                    return(
                        <BetExpert 
                            key={game.id}
                            games={games}
                            gameId={game.id}
                            game={game} 
                            setModalWarningActive={setModalWarningActive}
                            setModalChangeOdd={setModalChangeOdd}
                            setOddToChange={setOddToChange}
                            setGames={setGames}
                            dark={dark}
                        />
                    )
                }
            }
        else{
            if(search.length > 0){
                if(search.find(elem => elem === game.id)){
                    if( getInEnglish(game.sport) === filter || filter === 'all'){
                        if(game.sport === 'motoGP'){
                            return(
                                <BetExpertMotoGP 
                                    key={game.id}
                                    games={games}
                                    gameId={game.id}
                                    game={game} 
                                    setModalWarningActive={setModalWarningActive}
                                    setModalChangeOdd={setModalChangeOdd}
                                    setOddToChange={setOddToChange}
                                    setGames={setGames}
                                    dark={dark}
                                />
                            )
                        }else{
                            return(
                                <BetExpert 
                                    key={game.id}
                                    games={games}
                                    gameId={game.id}
                                    game={game} 
                                    setModalWarningActive={setModalWarningActive}
                                    setModalChangeOdd={setModalChangeOdd}
                                    setOddToChange={setOddToChange}
                                    setGames={setGames}
                                    dark={dark}
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

            {modalWarningActive && 
                <ModalWarningActive 
                    setModalWarningActive={setModalWarningActive}
                    setModalChangeOdd={setModalChangeOdd}
                    dark={dark}
                />
            }
            {modalChangeOdd && 
                <ModalChangeOdd 
                    games={games}
                    oddToChange={oddToChange}
                    setModalChangeOdd={setModalChangeOdd}
                    setModalChangeOddConfimation={setModalChangeOddConfimation}
                    setGames={setGames}
                    dark={dark}
                />
            }
            {modalChangeOddConfimation && 
                <ModalChangeOddConfirmation
                    setModalChangeOddConfimation={setModalChangeOddConfimation} 
                    dark={dark}
                />
            }

            <NavBar 
                user={username}
                filter={filter} 
                setFilter={setFilter} 
                userType='expert'
                dark={dark}
            />

            <div className={`content${dark}`}>
                <div>
                    <SearchBar 
                        dark={dark}
                        setSearch={setSearch}
                        setText={setText}
                    />
                    <div className="allBetsExpert">
                        {allBets}
                    </div>
                </div>
                <Progress
                    games={games}
                    dark={dark}
                />
            </div>

        </div>
    )


}