import { useState } from 'react';
import '../styles/BetHistory.css'

export default function BetHistory(props){

    const [simpleMult, setSimpleMult] = useState("");


    function change(){
        props.setCompLoad("ChangeData");
    }

    return(
        <div className="betHistoryDiv">
           <button className='simpleBut'>Simples</button>
           <button className='multipleBut'>Múltiplas</button>
           <button onClick={change} className="goBack">Voltar</button> 
           <div className="BetList"></div>
           <ul>
                <li>Aposta Placeholder</li>

           </ul>
        </div>
    )
}