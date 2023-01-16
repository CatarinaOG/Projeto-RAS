import { useContext } from "react"
import { myContext } from "../context"

export default function BetBoxMotoGP(props){

    const {sport,name,id,gameId,result,odd,selected,changeSelected} = props
    const {dark} = useContext(myContext)
    
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