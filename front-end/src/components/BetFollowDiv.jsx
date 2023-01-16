import BetFollow from "./BetFollow"
import BetFollowMotoGP from "./BetFollowMotoGP"
import trash from '../images/trash.png'
import { useContext } from "react"
import { myContext } from "../context"

export default function BetFollowDiv(props){

    const {game} = props
    const {dark} = useContext(myContext)
        
    const notNull = true

    const header = () => {
        if(game.sport === 'motoGP'){
            return(
            <div>
                <h2>{game.date}</h2>
                <h2>{game.name}</h2>
            </div>)
        }
        else{
            return(
            <div>
                <h2>{game.date}</h2>
            </div>  
            )
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
				    <img src={trash} className="fttrash" alt=""/>
                </div>
                {body()}
            </div>
        )
    }
    else{
        return(<div></div>)
    }

}