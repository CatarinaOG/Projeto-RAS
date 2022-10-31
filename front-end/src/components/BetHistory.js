import { useState } from 'react';
import '../styles/Profile.css'

export default function BetHistory(props){

    const [simpleMult, setSimpleMult] = useState("");


    function change(){
        props.setCompLoad("ChangeData");
    }

    return(
        <div className="betHistoryDiv">
           <button className='ftsimpleBet'>Simples</button>
           <button className='ftmultipleBet'>Múltiplas</button>
           <button onClick={change} className="ftgoBack">Voltar</button> 
           <div className="ftBetList">
           <ul>
                <li>Aposta Placeholder</li>

           </ul>
           </div>
        </div>
    )
}