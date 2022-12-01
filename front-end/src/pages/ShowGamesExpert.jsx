import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

import NavBarProfile from "../components/NavBarProfile"

import goBackImg from '../images/goBack.png'
import podio from '../images/podio.png'

export default function ShowExperts(props){

    const {username,setExpertGame,dark} = props

    let navigate = useNavigate()
    
    const [expertGames,setExpertGames] = useState([
      {
        id: 2,
        sport: "futebol",
        home: "espanha",
        away: "portugal",
      },
      {
        id: 3,
        sport: "motoGP",
        name: "Finals2",
        participants: [
          {id: 1, name: 'Bernardo'},
          {id: 2, name: 'Fernando'},
          {id: 3, name: 'Bruno'},
          {id: 4, name: 'Pedro'},
          {id: 5, name: 'Bernardo'},
          {id: 6, name: 'Bernardo'},
          {id: 7, name: 'Bernardo'},
          {id: 8, name: 'Bernardo'},
          {id: 9, name: 'Bernardo'},
          {id: 10, name: 'Bernardo'},
          {id: 11, name: 'Bernardo'},
          {id: 12, name: 'Bernardo'},
          {id: 13, name: 'Bernardo'},
          {id: 14, name: 'Bernardo'},
          {id: 15, name: 'Bernardo'},
          {id: 16, name: 'Bernardo'},
          {id: 17, name: 'Bernardo'},
          {id: 18, name: 'Bernardo'},
          {id: 19, name: 'Bernardo'},
          {id: 20, name: 'Bernardo'},
          {id: 21, name: 'Bernardo'},
          {id: 22, name: 'Bernardo'}
        ]
      }
    ])



    function getInEnglish(type){
      switch (type) {
          case "futebol": return 'football'
          case "basquetebol": return 'basketball'
          case "motoGP": return 'motoGP'
          case "tenis": return 'tenis'
      }
    }
    

    const allGames = expertGames.map( game => {

      function handleEnd(){
        setExpertGame(game)
        navigate('/ChangeGameExpert', { replace: true })
      }

      if(getInEnglish(game.sport) === 'motoGP'){
        return(
          <div className="gameExpert">
            <div>
              <img src={podio} className='podioImg' onClick={handleEnd}/>
              <p>{game.name}</p>
            </div>
          </div>
        )
      }
      else{
        return(
          <div className="gameExpert">
            <div>
              <img src={podio} className='podioImg' onClick={handleEnd}/>
              <p>{game.home} vs {game.away}</p>
            </div>
          </div>
        )
      }
      }
    )

    function goBack(){
        navigate('/ProfileExpert', { replace: true })
    }


    return(
        <div className={dark === 'Dark' ? "backgroundBlack" : ""}>
            <NavBarProfile 
                username={username}
                dark={dark}
            />
            <div className={`ftwhiteShadow${dark}`}>
                <img src = {goBackImg} className={`goBackImg${dark}`} onClick={goBack}/>
                <h1 className = "ftAddSp">Consultar Eventos Criados</h1>
                <div className="gamesSpace">
                    {allGames}
                </div>
            </div>
        </div>
    )
}