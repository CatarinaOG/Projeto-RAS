import { useState } from 'react'

import BetFollowBoxMotoGP from './BetFollowBoxMotoGP'
import star from '../images/favorite.png'
import yellowstar from '../images/star.png'
import { useContext } from 'react'
import { myContext } from '../context'

export default function BetFollowMotoGP(props){

    const {name,date,results} = props
    const {dark} = useContext(myContext)

    // Criação das caixas de resultado
    const resultsBoxes = results.map( ({id,result,odd}) => 
        <BetFollowBoxMotoGP
            result={result}
            odd={odd}
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