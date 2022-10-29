import '../styles/Profile.css';
import NavBarProfile from "../components/NavBarProfile";
import IdSaldo from '../components/IdSaldo';
import { useState } from 'react';
import ChangeData from '../components/ChangeData';
import BetHistory from '../components/BetHistory';
import PopUp from '../components/PopUp'

export default function AddSpecialist(){

    const [username,setUsername] = useState("Francisco Toldy");
    const [compLoad,setCompLoad] = useState("ChangeData");
    const [val,setVal] = useState(0);


    

    return(
        <div className='Profile'>
            <div>
                <NavBarProfile userN = {username}/>
                <div className='whiteShadow'>
                    <h1>Adicionar Especialista</h1>
                </div>
            </div>
            {val !=0 && <div><div  className="backgroundModal"></div><PopUp val = {val} setVal = {setVal}/></div>} 

        </div>    
    )
}