
import '../styles/Profile.css';
import NavBarProfile from "../components/NavBarProfile";
import IdSaldo from '../components/IdSaldo';
import { useState } from 'react';
import ChangeData from '../components/ChangeData';
import BetHistory from '../components/BetHistory';
import PopUp from '../components/PopUp'

export default function Profile(){

    const [username,setUsername] = useState("Francisco Toldy");
    const [compLoad,setCompLoad] = useState("ChangeData");
    const [val,setVal] = useState(0);


    function changeComp(x){
        setCompLoad(x);
    }

    return(
        <div className='Profile'>
            <div>
                <NavBarProfile userN = {username}/>
                <div className='whiteShadow'>
                    <IdSaldo userN = {username}/>
                    {compLoad === "ChangeData" ? <ChangeData val = {val} setVal = {setVal} compLoad = {compLoad} setUser = {setUsername} setCompLoad = {changeComp} userN = {username}/> : <BetHistory compLoad = {compLoad} setCompLoad = {changeComp} userN = {username}/>}
                </div>
            </div>
            {val !=0 && <div><div  className="backgroundModal"></div><PopUp val = {val} setVal = {setVal}/></div>} 

        </div>    
    )
}