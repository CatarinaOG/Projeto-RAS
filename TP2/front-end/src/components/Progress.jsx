import ProgressSection from './ProgressSection'

export default function Progress(props){

    const {games,dark} = props

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

    var tennis = {
        total: 0,
        greens: 0,
        yellows:0,
        reds: 0
    }

    var motoGP = {
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

        else if (game.sport === 'basquetebol'){
            var nulls = 0

            game.results.map( result => {if(result.odd == 0) nulls++})

            if(nulls === 0) basketball.greens++
            else if(nulls === 3) basketball.reds++
            else basketball.yellows++

            basketball.total++
        }

        else if (game.sport === 'tenis'){
            var nulls = 0

            game.results.map( result => {if(result.odd == 0) nulls++})

            if(nulls === 0) tennis.greens++
            else if(nulls === 3) tennis.reds++
            else tennis.yellows++

            tennis.total++
        }

        else {
            var nulls = 0

            game.results.map( result => {if(result.odd == 0) nulls++})

            if(nulls === 0) motoGP.greens++
            else if(nulls === 3) motoGP.reds++
            else motoGP.yellows++

            motoGP.total++
        }
    })



    return(
        <div className={`progress${dark}`}>
            <h1 className="title">Progresso</h1>
            <div className="displaySections">
                <ProgressSection  
                    type='Futebol'
                    total={football.total}
                    green ={football.greens}
                    yellow ={football.yellows}
                    red ={football.reds}
                    dark={dark}
                />
                <ProgressSection  
                    type='Basquetebol'
                    total={basketball.total}
                    green ={basketball.greens}
                    yellow ={basketball.yellows}
                    red ={basketball.reds}
                    dark={dark}
                />
                <ProgressSection  
                    type='Tenis'
                    total={tennis.total}
                    green ={tennis.greens}
                    yellow ={tennis.yellows}
                    red ={tennis.reds}
                    dark={dark}
                />
                <ProgressSection  
                    type='MotoGP'
                    total={motoGP.total}
                    green ={motoGP.greens}
                    yellow ={motoGP.yellows}
                    red ={motoGP.reds}
                    dark={dark}
                />
            </div>
        </div>
    )

}