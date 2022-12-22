import { useNavigate } from "react-router-dom";

import NavBarProfile from "../components/NavBarProfile"

import goBackImg from '../images/goBack.png'
import BetFollowBox from "../components/BetFollowBox";

import '../styles/FollowBack.css'


export default function FollowPage(props){

    const {username,games,dark} = props

    let navigate = useNavigate()
        
    const allGames = games.map( game => {

        //if(game.following==='true'){
            
            return(<BetFollowBox game={game} dark={dark}></BetFollowBox>)
        //}
        /*
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
        */
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
                <h1 className = "ftAddSp">Eventos</h1>
                <div className="gamesSpace">
                    {allGames}
                </div>
            </div>
        </div>
    )
}