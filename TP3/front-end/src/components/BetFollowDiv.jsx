import BetFollow from "./BetFollow"
import BetFollowMotoGP from "./BetFollowMotoGP"
import trash from '../images/trash.png'
import { useContext } from "react"
import { myContext } from "../context"

export default function BetFollowDiv(props){

    const {game,email} = props
    const {dark} = useContext(myContext)
        
    const notNull = true

    function changeFollowing(){

        const send = {
            email: email,
            id_game: String(game.id)
        }
  
        if(game.following == "false"){
  
            fetch('http://127.0.0.1:8080/api/users/follow_game/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(send)
            })
            .then(response => response.json())
            .then(data => {
                if(data.confirmed == 'true'){
                    //props.getGames()
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
        else{
  
            fetch('http://127.0.0.1:8080/api/users/unfollow_game/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(send)
            })
            .then(response => response.json())
            .then(data => {
                if(data.confirmed == 'true'){
                    //props.getGames()
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
  
        }
        
    }




    const body = () => {
        
        if (game.sport === "futebol"){
            return(<BetFollow game={game}/>)
        }
        if (game.sport === "tenis" || game.sport==="basquetebol"){
            return(<BetFollow game={game}/>)
        }
        
        if (game.sport === "motoGP"){
            return(
                <BetFollowMotoGP 
                    name = {game.name} 
                    date = {game.date} 
                    results = {game.results} 
                />
            )
        }
    }

    if(notNull){
        return(
            <div className={`ftbetFollowBox${dark}`}>
                <div className={`betFollowTrash${dark}`}>
				    <img src={trash} className="fttrash" alt="" onClick={changeFollowing}/>
                </div>
                {body()}
            </div>
        )
    }
    else{
        return(<div></div>)
    }

}