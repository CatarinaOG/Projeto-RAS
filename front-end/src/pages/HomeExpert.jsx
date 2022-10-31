import NavBar from "../components/NavBar"
import SearchBar from "../components/SearchBar"
import Report from "../components/Report"
import BetExpert from '../components/BetExpert'
import ModalWarningActive from '../components/ModalWarningActive'
import ModalChangeOdd from '../components/ModalChangeOdd'
import ModalChangeOddConfirmation from '../components/ModalChangeOddConfirmation'


import "../styles/home.css"
import {useState} from 'react'


export default function HomeExpert(props){

    const {username} = props

    const games = [{
        id : 0,
        home: 'sporting',
        away: 'varzim',
        date: 'hoje 22:00',
        active: false,
        results: [
            { id: 0, result : 'Sporting' , odd: 'null', amount: 0},
            { id: 1, result : 'Empate' , odd: 0.2, amount: 0},
            { id: 2, result : 'Varzim' , odd: 0.3, amount: 0},
        ]
    },
    {
        id : 1,
        home: 'sporting',
        away: 'varzim',
        date: 'hoje 22:00',
        active: true,
        results: [
            { id: 3, result : 'Sporting' , odd: 0.4, amount: 0},
            { id: 4, result : 'Empate' , odd: 0.5, amount: 0},
            { id: 5, result : 'Varzim' , odd: 0.6, amount: 0},
        ]
    }]

    const [searching,setSearching] = useState('Todos')      //utilizado para saber secção atual

    const [modalWarningActive,setModalWarningActive] = useState(false)
    const [modalChangeOdd,setModalChangeOdd] = useState(false)
    const [modalChangeOddConfimation,setModalChangeOddConfimation] = useState(false)

    const [oddToChange,setOddToChange] = useState()


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
            />
            <div className="content">
                <div>
                    <SearchBar />
                    <div className="allBets">
                        {allBets}
                    </div>
                </div>
            </div>

        </div>
    )


}