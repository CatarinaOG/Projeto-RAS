import BetFollow from "./BetFollow"
import BetFollowMotoGP from "./BetFollowMotoGP"
import trash from '../images/trash.png'

export default function BetFollowDiv(props){

    const {game,dark} = props

        
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
            return(<BetFollow game={game} dark={dark}></BetFollow>)
        }
        if (game.sport === "tenis"){
            return(<BetFollow game={game} dark={dark}></BetFollow>)
        }
        if (game.sport === "motoGP"){
            return(<BetFollowMotoGP name = {game.name} date = {game.date} results = {game.results} dark = {dark}></BetFollowMotoGP>)
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