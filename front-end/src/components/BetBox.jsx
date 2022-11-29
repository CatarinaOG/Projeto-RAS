
export default function BetBox(props){

    const {id,sport,gameId,result,odd,selected,changeSelected,dark} = props

    // Retirar aposta de selecionada se clicar no bloco
    function changeSelectedResults(){

        changeSelected(sport,id,gameId)

    }

    return(

        <div className={ selected ? `resultBoxSelected${dark}` : `resultBoxNotSelected${dark}`} onClick={changeSelectedResults}>
            <h3>{result}</h3>
            <p>{odd}</p>
        </div>
    )
}