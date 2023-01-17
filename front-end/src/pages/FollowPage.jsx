import { useNavigate } from "react-router-dom";

import NavBarProfile from "../components/NavBarProfile"

import goBackImg from '../images/goBack.png'
import BetFollowDiv from "../components/BetFollowDiv";

import { useContext } from "react";
import { myContext } from "../context";
import { useState, useEffect } from "react";

export default function FollowPage({email}){

    const {dark} = useContext(myContext)
    const [games,setGames] = useState([])

    let navigate = useNavigate()
    
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


    const allGames = games.map( game => {
        if(game.following==='true' && game.active==='true'){
          if(game.sport==="futebol"){
            return(<BetFollowDiv game={game} email={email}/>)
          }
          if(game.sport==="tenis" || "basquetebol"){
            return(<BetFollowDiv game={game} email={email}/>)
          }      
          if(game.sport==="motoGP"){
            return(<BetFollowDiv game={game} email={email}/>)
          }
        }
        }  
    )
    

    function goBack(){
        navigate('/Profile', { replace: true })
    }


    return(
        <div className={dark === 'Dark' ? "backgroundBlack" : ""}>
            <NavBarProfile />
            <div className={`ftwhiteShadow${dark}`}>
                <img src = {goBackImg} className={`goBackImg${dark}`} onClick={goBack}/>
                <h1 className = "ftAddSp">Eventos</h1>
                <div className="gamesSpace">
                    {allGames}
                </div>
            </div>
        </div>
    )
}