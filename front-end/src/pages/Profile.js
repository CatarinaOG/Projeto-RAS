
import '../styles/Profile.css';
import NavBarProfile from "../components/NavBarProfile";
import IdSaldo from '../components/IdSaldo';
import { useState } from 'react';
import ChangeData from '../components/ChangeData';
import BetHistory from '../components/BetHistory';
import PopUp from '../components/PopUp'

export default function Profile(props){

    
    const {username} = props

    const [compLoad,setCompLoad] = useState("ChangeData");
    const [val,setVal] = useState(0);
    const confirmation=1;

    function changeComp(x){
        setCompLoad(x);
    }

    return(
        <div className='ftProfile'>
            <div>
                <NavBarProfile username={username}/>
                <div className='ftwhiteShadow'>
                    <IdSaldo username={username}/>
                    {compLoad === "ChangeData" ? 
                        <ChangeData 
                            val={val} 
                            setVal={setVal} 
                            compLoad={compLoad} 
                            setCompLoad={changeComp} 
                            userN={username}
                        /> 
                        :
                        <BetHistory 
                            compLoad={compLoad} 
                            setCompLoad={changeComp} 
                            userN={username}
                        />}
                </div>
            </div>
            {val !=0 && <div><div  className="ftbackgroundModal"></div><PopUp val = {val} setVal = {setVal} confirmation={confirmation}/></div>} 

        </div>    
    )
}