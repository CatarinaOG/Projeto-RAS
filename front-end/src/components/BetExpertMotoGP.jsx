import BetBoxExpertMotoGP from './BetBoxExpertMotoGP'
import ProgressBetBox from './ProgressBetBox'

import pause from '../images/pause.png'
import play from '../images/play.png'

export default function BetExpertMotoGP(props){

    const {games,gameId,game,setModalWarningActive,setOddToChange,setModalChangeOdd,setGames} = props
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

    function getNewGames(){
        fetch('http://127.0.0.1:8080/api/games/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
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
    }


    function changeState(){

        fetch('http://127.0.0.1:8080/api/expert/changeBetState', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({gameId: Number(gameId)})
        })
        .then(response => {
            getNewGames()
        })
        .catch((error) => {
            console.error('Error:', error);
        });
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