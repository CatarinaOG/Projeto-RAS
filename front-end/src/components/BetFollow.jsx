
import { useContext } from 'react'
import { myContext } from '../context'
import star from '../images/favorite.png'
import yellowstar from '../images/star.png'
import BetFollowBox from './BetFollowBox'

export default function BetFollow(props){

    const {sport,home,away,date,results} = props.game
    const {dark} = useContext(myContext)

    // Criação das caixas de resultado
    const resultsBoxes = results.map( ({result,odd}) => 
        <BetFollowBox
            result={result}
            odd={odd}
        />
    )

    /*
    var notNull = true
    
    results.map( ({id,result,odd,amount}) =>{
        if(odd === 'null')
            notNull = false
    })
*/

  //  if(notNull){
        return(
            <div className={`betFollow${dark}`}>
                <div className={`info${dark}`}>
                    <div>
                        <h3>{home} vs {away}</h3>
                        <p>{date}</p>
                    </div>
                </div>
                <div className="results">
                    {resultsBoxes}
                </div>
            </div>
        )
    //}
    //else{
      //  return(<div></div>)
    //}

}