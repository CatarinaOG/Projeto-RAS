import { useNavigate } from "react-router-dom";

import NavBarProfile from "../components/NavBarProfile"

import goBackImg from '../images/goBack.png'
import BetFollowDiv from "../components/BetFollowDiv";

import { useContext } from "react";
import { myContext } from "../context";

export default function FollowPage(props){

    const {games} = props
    const {dark} = useContext(myContext)

    let navigate = useNavigate()
        
    const allGames = games.map( game => {

        if(game.following==='true'){
          if(game.sport==="futebol"){
            return(<BetFollowDiv game={game} />)
          }
          if(game.sport==="tenis" && "basquetebol"){
            return(<BetFollowDiv game={game}/>)
          }      
          if(game.sport==="motoGP"){
            return(<BetFollowDiv game={game}/>)
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