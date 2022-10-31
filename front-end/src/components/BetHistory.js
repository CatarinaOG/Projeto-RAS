import { useState } from 'react';
import '../styles/Profile.css'
import goBack from "../images/goBack.png"
export default function BetHistory(props){

    const [simpleMult, setSimpleMult] = useState("");


    function change(){
        props.setCompLoad("ChangeData");
    }

    return(
        <div className="betHistoryDiv">
           <button className='ftsimpleBet'>Simples</button>
           <button className='ftmultipleBet'>Múltiplas</button>
           <img onClick={change} src = {goBack} className="ftgoBack"/>
           <div className="ftBetList">
           <ul>
                <li>Aposta Placeholder</li>

           </ul>
           </div>
        </div>
    )
}