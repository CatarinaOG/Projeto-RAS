import BetBoxExpert from './BetBoxExpert'
import ProgressBox from './ProgressBetBox'

export default function BetExpert(props){

    const {games,gameId,game,setModalWarningActive,setOddToChange,setModalChangeOdd,setRerender} = props
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

    // Saber o progresso
    var nulls = 0
    
    results.map( ({id,result,odd}) => {if(odd == 0) nulls++})

    return(
        <div className='betWithProgress'>
            <div className="bet">
                <div className="info">
                    <h3>{home} vs {away}</h3>
                    <p>{date}</p>
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