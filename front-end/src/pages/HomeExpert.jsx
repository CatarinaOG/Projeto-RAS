import NavBar from "../components/NavBar"
import SearchBar from "../components/SearchBar"
import BetExpert from '../components/BetExpert'
import ModalWarningActive from '../components/ModalWarningActive'
import ModalChangeOdd from '../components/ModalChangeOdd'
import ModalChangeOddConfirmation from '../components/ModalChangeOddConfirmation'
import Progress from '../components/Progress'

import "../styles/home.css"
import {useState} from 'react'


export default function HomeExpert(props){

    const {username,games,setGames} = props

    const [searching,setSearching] = useState('Todos')      //utilizado para saber secção atual

    const [modalWarningActive,setModalWarningActive] = useState(false)
    const [modalChangeOdd,setModalChangeOdd] = useState(false)
    const [modalChangeOddConfimation,setModalChangeOddConfimation] = useState(false)

    const [oddToChange,setOddToChange] = useState()   // {id,gameId}


    //Mostra todas as bets do lado esquerdo
    const allBets = games.map( (game) => (
        <BetExpert 
            key={game.id}
            games={games}
            gameId={game.id}
            game={game} 
            setModalWarningActive={setModalWarningActive}
            setModalChangeOdd={setModalChangeOdd}
            setOddToChange={setOddToChange}
        />
    )) 

    return(
        <div>

            {modalWarningActive && 
                <ModalWarningActive 
                    setModalWarningActive={setModalWarningActive}
                    setModalChangeOdd={setModalChangeOdd}
                />
            }
            {modalChangeOdd && 
                <ModalChangeOdd 
                    games={games}
                    oddToChange={oddToChange}
                    setModalChangeOdd={setModalChangeOdd}
                    setModalChangeOddConfimation={setModalChangeOddConfimation}
                    setGames={setGames}
                />
            }
            {modalChangeOddConfimation && 
                <ModalChangeOddConfirmation
                    setModalChangeOddConfimation={setModalChangeOddConfimation} 
                />
            }

            <NavBar 
                user={username}
                searching={searching} 
                setSearching={setSearching} 
                userType='expert'
            />

            <div className="content">
                <div>
                    <SearchBar />
                    <div className="allBetsExpert">
                        {allBets}
                    </div>
                </div>
                <Progress
                    games={games}
                />
            </div>

        </div>
    )


}