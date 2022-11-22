import BetBoxExpert from './BetBoxExpert'
import ProgressBox from './ProgressBetBox'

import pause from '../images/pause.png'
import play from '../images/play.png'

export default function BetExpert(props){

    const {games,gameId,game,setModalWarningActive,setOddToChange,setModalChangeOdd} = props
    const {home,away,date,results} = game

    // Criação das caixas de resultado
    const resultsBoxes = results.map( ({id,result,odd}) => 
        <BetBoxExpert 
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
                <img src={pause} alt="" className='icon' onClick={changeState}/>
            </div>
            )
        }else{
            return(
                <div>
                    <img src={play} alt="" className='icon' onClick={changeState}/>
                </div>
            )
        }
    }

    // Saber o progresso
    var nulls = 0
    
    results.map( ({id,result,odd}) => {if(odd == 0) nulls++})

    return(
        <div className='betWithProgress'>
            <div className="bet">
                <div className="info">
                    <h3>{home} vs {away}</h3>
                    <p>{date}</p>
                        {icons()}
                </div>
                <div className="results">
                    {resultsBoxes}
                </div>
            </div>
            <div>
                <ProgressBox 
                    nulls={nulls}
                />
            </div>
        </div>
    )
}