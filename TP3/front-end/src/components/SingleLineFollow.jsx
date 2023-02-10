
export default function SingleLineFollow(props){

    const {result1,result2,result3,dark} = props

    

    return(
        <div className = "ftSingleBetDiv" >
            <h4 className={`fth4SingleBetHist${dark}`}>{result1.result}</h4>
            <p className={`ftpSingleBetHist${dark}`}></p>
        </div>
    )
}