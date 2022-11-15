import ProgressSection from './ProgressSection'

export default function Progress(props){

    const {games} = props

    var football = {
        total: 0,
        greens: 0,
        yellows:0,
        reds: 0
    }

    var basketball = {
        total: 0,
        greens: 0,
        yellows:0,
        reds: 0
    }


    games.map( game => {
    
        if (game.sport === 'futebol'){
            var nulls = 0

            game.results.map( result => { if(result.odd == 0) nulls++ })
            
            if(nulls === 0) football.greens++
            else if(nulls === 3) football.reds++
            else football.yellows++

            football.total++
        }

        if (game.sport === 'basquetebol'){
            var nulls = 0

            game.results.map( result => {if(result.odd == 0) nulls++})

            if(nulls === 0) basketball.greens++
            else if(nulls === 3) basketball.reds++
            else basketball.yellows++

            basketball.total++
        }
    })



    return(
        <div className="progress">
            <h1 className="title">Progresso</h1>
            <div className="displaySections">
                <ProgressSection  
                    type='futebol'
                    total={football.total}
                    green ={football.greens}
                    yellow ={football.yellows}
                    red ={football.reds}
                />
                <ProgressSection  
                    type='basquetebol'
                    total={basketball.total}
                    green ={basketball.greens}
                    yellow ={basketball.yellows}
                    red ={basketball.reds}
                />
            </div>
        </div>
    )

}