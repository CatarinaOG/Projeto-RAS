import BetBox from './BetBox'

export default function Bet(props){

    const {sport,home,away,date,results} = props.game
    const setSelected = props.setSelected
    const selected = props.selected
    const dark = props.dark

    // Adicionar bet a lista de selecionadas
    function changeSelected(sport,id,gameId){

        var amount = 0

        if (!selected.find(bet => bet.id === id))
            setSelected( prevSelected => [...prevSelected,{sport,id,gameId,amount}])
        
    }

    // Verificar se está selecionada
    function getIfSelected(id){ 

        return (selected.find(bet => bet.id === id)) ? true : false
    }

    // Criação das caixas de resultado
    const resultsBoxes = results.map( ({id,result,odd}) => 
        <BetBox
            key={id}
            sport={sport}
            id={id}
            gameId={props.game.id}
            result={result}
            odd={odd}
            selected={getIfSelected(id)}
            changeSelected={changeSelected}
            dark={dark}
        />
    )

    var notNull = true
    
    results.map( ({id,result,odd,amount}) =>{
        if(odd === 'null')
            notNull = false
    })

    if(notNull){
        return(
            <div className={`bet${dark}`}>
                <div className={`info${dark}`}>
                    <div>
                        <h3>{home} vs {away}</h3>
                        <p>{date}</p>
                    </div>
                </div>
                <div className="results">
                    {resultsBoxes}
                </div>
            </div>
        )
    }
    else{
        return(<div></div>)
    }

}