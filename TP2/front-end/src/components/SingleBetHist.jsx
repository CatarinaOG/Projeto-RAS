
export default function SingleBetHist(props){

    const {name,winner,dark} = props

    

    return(
        <div className = "ftSingleBetDiv" >
            <h4 className={`fth4SingleBetHist${dark}`}>{name}</h4>
            <p className={`ftpSingleBetHist${dark}`}>{winner}</p>
        </div>
    )
}