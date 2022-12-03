import BetBoxExpertMotoGP from './BetBoxExpertMotoGP'
import ProgressBetBox from './ProgressBetBox'

import pause from '../images/pause.png'
import play from '../images/play.png'

export default function BetExpertMotoGP(props){

    const {games,gameId,game,setModalWarningActive,setOddToChange,setModalChangeOdd} = props
    const {name,sport,date,results} = game

    // Criação das caixas de resultado
    const resultsBoxes = results.map( ({id,result,odd}) => 
        <BetBoxExpertMotoGP 
            key={id}
            id={id}
            games={games}
            gameId={gameId}
            result={result}
            odd={odd}
            setModalWarningActive={setModalWarningActive}
            setModalChangeOdd={setModalChangeOdd}
            setOddToChange={setOddToChange}
        />
    )

    function changeState(){

        console.log("trocar estado")

    }


    function icons(){

        if(game.active === true){
            return(
            <div>
                <img src={pause} alt="" className='iconMotoGP' onClick={changeState}/>
            </div>
            )
        }else{
            return(
                <div>
                    <img src={play} alt="" className='iconMotoGP' onClick={changeState}/>
                </div>
            )
        }
    }

    // Saber o progresso
    var nulls = 0
    
    results.map( ({id,result,odd}) => {if(odd == 0) nulls++})

    return(
        <div className='betWithProgress'>
            <div className="betMotoGP">
                <div className="infoMotoGP">
                    <div>
                        <h3>{name}</h3>
                        <p>{date}</p>
                            {icons()}
                    </div>
                </div>
                <div className="resultsMotoGP">
                    {resultsBoxes}
                </div>
            </div>
            <div>
                <ProgressBetBox 
                    nulls={nulls}
                    sport={sport}
                />
            </div>
        </div>
    )
}