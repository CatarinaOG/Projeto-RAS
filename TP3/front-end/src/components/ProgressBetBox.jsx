
export default function ProgressBetBox(props){

    const {nulls,sport} = props
    var classe = 'progressBoxGreen'

    if(sport === 'motoGP'){
        if(nulls === 0) classe = 'progressBoxGreen'
        else if(nulls === 22) classe = 'progressBoxRed'
        else classe = 'progressBoxYellow'

        return(
            <div className={classe}>
                <h1>{22-nulls}/22</h1>
            </div>

        )
    }
    else if (sport === 'basquetebol'){
        if(nulls === 0) classe = 'progressBoxGreen'
        else if(nulls === 2) classe = 'progressBoxRed'
        else classe = 'progressBoxYellow'

        return(
            <div className={classe}>
                <h1>{2-nulls}/2</h1>
            </div>
        )
    }
    else if (sport === 'tennis'){
        if(nulls === 0) classe = 'progressBoxGreen'
        else if(nulls === 2) classe = 'progressBoxRed'
        else classe = 'progressBoxYellow'

        return(
            <div className={classe}>
                <h1>{2-nulls}/2</h1>
            </div>
        )
    }
    else{
        if(nulls === 0) classe = 'progressBoxGreen'
        else if(nulls === 3) classe = 'progressBoxRed'
        else classe = 'progressBoxYellow'

        return(
            <div className={classe}>
                <h1>{3-nulls}/3</h1>
            </div>
        )
    }


}