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
        id: 1,
        sport: "motoGP",
        name: "Finals",
      },
      {
        id: 2,
        sport: "futebol",
        home: "espanha",
        away: "portugal",
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
        console.log("seee game with id:",game.id)
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
        <div>
            <NavBarProfile 
                username={username}
                dark={dark}
            />
            <div className='ftwhiteShadow'>
                <img src = {goBackImg} className='goBackImg' onClick={goBack}/>
                <h1 className = "ftAddSp">Consultar Eventos Criados</h1>
                <div className="gamesSpace">
                    {allGames}
                </div>
            </div>
        </div>
    )
}