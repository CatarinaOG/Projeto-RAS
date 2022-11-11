
export default function ProgressBetBox(props){

    const {nulls} = props
    var classe = 'progressBoxGreen'

    if(nulls === 0) classe = 'progressBoxGreen'
    else if(nulls === 3) classe = 'progressBoxRed'
    else classe = 'progressBoxYellow'

    return(
        <div className={classe}>
            <h1>{3-nulls}/3</h1>
        </div>

    )


}