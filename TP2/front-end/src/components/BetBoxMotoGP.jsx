
export default function BetBoxMotoGP(props){

    const {sport,name,id,gameId,result,odd,selected,changeSelected,dark} = props

    // Retirar aposta de selecionada se clicar no bloco
    function changeSelectedResults(){

        changeSelected(sport,id,gameId)

    }

    return(

        <div className={ selected ? `resultBoxSelectedMotoGP${dark}` : `resultBoxNotSelectedMotoGP${dark}`} onClick={changeSelectedResults}>
            <h3>{result}</h3>
            <p>{odd}</p>
        </div>
    )
}