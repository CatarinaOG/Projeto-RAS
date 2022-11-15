import pencil from '../images/pencil.png'

export default function BetBoxExpert(props){

    const {id,games,gameId,result,odd,setModalWarningActive,setOddToChange,setModalChangeOdd} = props

    function editOdd(){

        var game = games.find(game => game.id === gameId)

        /*if(game.active){
            setModalWarningActive(true)
            setOddToChange({
                id: id,
                gameId: gameId,
                odd: 0
            })
        }
        else*/
        
        setModalChangeOdd(true)
        setOddToChange({id: id,gameId: gameId})

    }

    return(

        <div className="resultBoxExpert" >
            <h3>{result}</h3>
            {odd !== 0 ? 
                <div className='resultBoxOdd'>
                    <p>{odd}</p>
                    <img src={pencil} onClick={editOdd} />
                </div> 
                :
                <button onClick={editOdd}>Insert Odd</button>
            }
        </div>
    )
}