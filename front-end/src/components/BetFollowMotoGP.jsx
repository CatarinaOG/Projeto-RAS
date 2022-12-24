import { useState } from 'react'

import BetFollowBoxMotoGP from './BetFollowBoxMotoGP'
import star from '../images/favorite.png'
import yellowstar from '../images/star.png'

export default function BetFollowMotoGP(props){

    const {name,date,results,dark} = props


    // Criação das caixas de resultado
    const resultsBoxes = results.map( ({id,result,odd}) => 
        <BetFollowBoxMotoGP
            result={result}
            odd={odd}
            dark={dark}
        />
    )

    var notNull = true

    if(notNull){
        return(
            <div className={`betFollowMotoGP${dark}`}>
                <div className={`infoMotoGP${dark}`}>
                    <div>
                        <h3>{name}</h3>
                        <p>{date}</p>
                    </div>
                </div>
                <div className={`resultsFollowMotoGP${dark}`}>
                    {resultsBoxes}
                </div>
            </div>
        )
    }
    else{
        return(<div></div>)
    }

}