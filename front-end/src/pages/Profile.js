
import '../styles/Profile.css';
import NavBarProfile from "../components/NavBarProfile";
import IdSaldo from '../components/IdSaldo';
import { useState } from 'react';
import ChangeData from '../components/ChangeData';
import BetHistory from '../components/BetHistory';
import PopUpProfile from '../components/PopUpOperation'

export default function Profile(props){

    
    const {username,setUsername,setBalance,setRender,balance} = props

    const [dataOrHistory,setDataOrHistory] = useState("Data");
    const [showPopUp,setShowPopUp] = useState("");


    return(
        <div className='ftProfile'>
            <div>
                <NavBarProfile username={username}/>
                <div className='ftwhiteShadow'>
                    <IdSaldo username={username} balance={balance}/>
                    {dataOrHistory === "Data" ? 
                        <ChangeData
                            setUsername={setUsername}
                            setShowPopUp={setShowPopUp}
                            setDataOrHistory={setDataOrHistory} 
                            setRender={setRender}
                        /> 
                        :
                        <BetHistory 
                            setDataOrHistory={setDataOrHistory} 
                        />
                    }
                </div>
            </div>
            {showPopUp !== '' && 
                <div>
                    <div  className="ftbackgroundModal"></div>
                    <PopUpProfile 
                        showPopUp={showPopUp} 
                        setShowPopUp={setShowPopUp}
                        setBalance={setBalance} 
                    />
                </div>
            } 

        </div>    
    )
}