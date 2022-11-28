
export default function SingleBetHist(props){

    const {name,winner} = props

    // Retirar aposta de selecionada se clicar no bloco
    

    return(
        <div className = "ftSingleBetDiv" >
            <h4 >{name}</h4>
            <p>{winner}</p>
        </div>
    )
}