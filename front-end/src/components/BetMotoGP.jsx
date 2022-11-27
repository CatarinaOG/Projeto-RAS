import BetBoxMotoGP from './BetBoxMotoGP'


export default function BetMotoGP(props){

    const {sport,name,date,results} = props.game
    const setSelected = props.setSelected
    const selected = props.selected

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
        <BetBoxMotoGP
            key={id}
            sport={sport}
            id={id}
            gameId={props.game.id}
            result={result}
            odd={odd}
            selected={getIfSelected(id)}
            changeSelected={changeSelected}
        />
    )

    var notNull = true
    
    results.map( ({id,result,odd,amount}) =>{
        if(odd === 'null')
            notNull = false
    })

    if(notNull){
        return(
            <div className="betMotoGP">
                <div className="infoMotoGP">
                    <div>
                        <h3>{name}</h3>
                        <p>{date}</p>
                    </div>
                </div>
                <div className="resultsMotoGP">
                    {resultsBoxes}
                </div>
            </div>
        )
    }
    else{
        return(<div></div>)
    }

}