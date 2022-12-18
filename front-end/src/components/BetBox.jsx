import { useState } from 'react'
import star from '../images/favorite.png'
import yellowstar from '../images/star.png'



export default function BetBox(props){

    const {id,sport,gameId,result,odd,selected,changeSelected,dark} = props
    const [selected2,setSelected2] = useState(false)

    //ativar com a back-end
    function changeWatching(){

        setSelected2(oldSelected => !oldSelected)
        
    }


    function changeSelectedResults(){

        changeSelected(sport,id,gameId)

    }

    
    
    return(
        <div className='makeRelativa'>
            <div className={ selected ? `resultBoxSelected${dark}` : `resultBoxNotSelected${dark}`} onClick={changeSelectedResults}>
                <h3>{result}</h3>
                <p>{odd}</p>
            </div>
            <img src={ selected2 ? yellowstar : star} className='star' onClick={changeWatching}/>
        </div>
    )
}