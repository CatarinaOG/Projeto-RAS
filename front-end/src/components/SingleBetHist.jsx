
export default function SingleBetHist(props){

    const {name,winner} = props

    // Retirar aposta de selecionada se clicar no bloco
    

    return(
        <div className = "ftSingleBetDiv" >
            <h3 >{name}</h3>
            <p>{winner}</p>
        </div>
    )
}