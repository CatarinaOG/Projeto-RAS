import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

import NavBarProfile from "../components/NavBarProfile"

import goBackImg from '../images/goBack.png'
import podio from '../images/podio.png'

export default function ShowExperts(props){

    const {username,setExpertGame,dark} = props

    let navigate = useNavigate()
    
    const [expertGames,setExpertGames] = useState([/*
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
          'Bernardo1',
          'Bernardo2',
          'Bernardo3',
          'Bernardo4',
          'Bernardo5',
          'Bernardo6',
          'Bernardo7',
          'Bernardo8',
          'Bernardo9',
          'Bernardo10',
          'Bernardo11',
          'Bernardo12',
          'Bernardo13',
          'Bernardo14',
          'Bernardo15',
          'Bernardo16',
          'Bernardo17',
          'Bernardo18',
          'Bernardo19',
          'Bernardo20',
          'Bernardo21',
          'Bernardo22'
        ]
      }
    */])

    useEffect( () => {

      fetch('http://127.0.0.1:8080/api/expert/getGames', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
      })
      .then(response => response.json())
      .then(data => {
        setExpertGames(data)
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    },[] )


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