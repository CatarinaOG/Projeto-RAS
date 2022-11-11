
import '../styles/Profile.css'

import NavBarProfile from "../components/NavBarProfile"
import IdSaldo from '../components/IdSaldo'
import BetHistory from '../components/BetHistory'
import PopUpOperation from '../components/PopUpOperation'

import ChangeDataSec from '../components/ChangeDataSec'

import { useState } from 'react'


export default function ProfileSec(props){

    
    const {username,setUsername,setBalance,balance,email} = props

    const [divChoice,setDivChoice] = useState("DataSec")
    const [showPopUp,setShowPopUp] = useState("")


    return(
        <div className='ftProfile'>
            <div>
                <NavBarProfile username={username}/>
                <div className='ftwhiteShadow'>
                    <IdSaldo username={username} balance={balance}/>
                    {divChoice === "BetHistory" && 
                        <BetHistory 
                            setDivChoice={setDivChoice} 
                        />
                    }
                    {divChoice === "DataSec" && 
                        <ChangeDataSec
                            setUsername={setUsername}
                            setShowPopUp={setShowPopUp}
                            setDivChoice={setDivChoice} 
                        /> 
                    }
                </div>
            </div>
            {(showPopUp == 'deposit' || showPopUp=='transfer') && 
                <div>
                    <div  className="ftbackgroundModal"></div>
                    <PopUpOperation 
                        showPopUp={showPopUp} 
                        setShowPopUp={setShowPopUp}
                        setBalance={setBalance}
                        email={email}
                    />
                </div>
            }
           

        </div>    
    )
}