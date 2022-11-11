import ProgressSection from './ProgressSection'

export default function Progress(props){

    const {allGames} = props

    var footballTotal = 0
    var footballGreens = 0
    var footballYellow = 0
    var footballRed = 0


    var basketballTotal = 0
    var basketballGreens = 0
    var basketballYellow = 0
    var basketballRed = 0

    allGames.map( ({type,results}) => {
    
        if (type === 'futebol'){
            var nulls = 0

            results.map( odd => {if(odd == 0) nulls++})
            
            if(nulls === 0) footballGreens++
            else if(nulls === 3) footballRed++
            else footballYellow++

            footballTotal++
        }

        if (type === 'basquetebol'){
            var nulls = 0

            results.map( odd => {if(odd == 0) nulls++})

            if(nulls === 0) basketballGreens++
            else if(nulls === 3) basketballRed++
            else basketballYellow++

            basketballTotal++

        }
    })


    return(
        <div className="progress">
            <h1 className="title">Progresso</h1>
            <div className="displaySections">
                <ProgressSection  
                    type='futebol'
                    total={footballTotal}
                    green ={footballGreens}
                    yellow ={footballYellow}
                    red ={footballRed}
                />
                <ProgressSection  
                    type='basquetebol'
                    total={basketballTotal}
                    green ={basketballGreens}
                    yellow ={basketballYellow}
                    red ={basketballRed}
                />
            </div>
        </div>
    )

}