
export default function BetFollowBoxMotoGP(props){

    const {result,odd,dark} = props

    return(

        <div className={`resultBoxFollowMotoGP${dark}`} >
            <h3>{result}</h3>
            <p>{odd}</p>
        </div>
    )
}