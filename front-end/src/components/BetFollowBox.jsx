



export default function BetFollowBox(props){

    const {result,odd,dark} = props
    

    return(
        <div className='makeRelativa'>
            <div className={`resultBoxNotSelected${dark}`} >
                <h3>{result}</h3>
                <p>{odd}</p>
            </div>
        </div>
    )
}