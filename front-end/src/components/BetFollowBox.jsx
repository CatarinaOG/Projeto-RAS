import SingleBetHist from "./SingleBetHist"
import SingleLineFollow from "./SingleLineFollow"


export default function BetFollowBox(props){

    const {game,dark} = props

    
    // variavel cujo valor é obtido ao percorrer a variavel bet, criando instancias do componente SingleBetHist para cada uma das apostas
    
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
        const result1=""
        const result2=""
        const result3=""
        if (game.sport != 'motoGP'){
            var results = game.result
            if(game.sport!= 'futebol'){
                result1=results[0]
                result3=results[1]
                return(
                    <SingleLineFollow result1={result1} result2={result2} result3={result3} dark={dark}></SingleLineFollow>
                )
            }
            else{
                result1=results[0]
                result2=results[1]
                result3=results[2]
                return(
                    <SingleLineFollow result1={result1} result2={result2} result3={result3} dark={dark}></SingleLineFollow>
                )
            }  
        }
    }

    if(notNull){
        return(
            <div className={`ftbetHistBox${dark}`}>
                {header()}
                {body()}
            </div>
        )
    }
    else{
        return(<div></div>)
    }

}