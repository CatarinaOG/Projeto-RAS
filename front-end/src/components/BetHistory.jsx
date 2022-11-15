import goBack from "../images/goBack.png"

export default function BetHistory(props){

    const {setDivChoice} = props

    //comportamento do botão para voltar para tras
    function goToData(){
        setDivChoice("Data");
    }

    return(
        <div className="betHistoryDiv">
           <button className='ftsimpleBet'>Simples</button>
           <button className='ftmultipleBet'>Múltiplas</button>
           <img onClick={goToData} src = {goBack} className="ftgoBack"/>
           <div className="ftBetList">
           <ul>
                <li>Aposta Placeholder</li>
           </ul>
           </div>
        </div>
    )
}