
import '../styles/Profile.css'
import '../styles/ProfileSec.css'

import NavBarProfile from "../components/NavBarProfile"
import IdSaldo from '../components/IdSaldo'
import ChangeData from '../components/ChangeData'
import BetHistory from '../components/BetHistory'
import PopUpOperation from '../components/PopUpOperation'
import PopUpCodeEmail from '../components/PopUpCodeEmail'
import PopUpCodeConfirm from '../components/PopUpCodeConfirm'

import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { myContext } from '../context'


export default function Profile(props){
    
    const {setUsername,setBalance,balance,email} = props
    const {dark} = useContext(myContext)

    const [divChoice,setDivChoice] = useState("Data")
    const [showPopUp,setShowPopUp] = useState("")
    const [sec,setSec] =useState(0)
    const [safeCode,setSafeCode] = useState("")

    const [betHist,setBetHist] = useState([])
    const [amount,setAmount] = useState(0)
    const [winnings,setWinnings] =useState(0)
    
    useEffect(() => {
        
        fetch('http://127.0.0.1:8080/api/users/bet_history',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email
        })})
        .then(response => response.json())
        .then(data => {
            if(data.betHistory){
                setBetHist(data.betHistory)
                setAmount(Math.abs(data.total_bet))
                setWinnings(data.total_win)
                setBalance(data.balance)
            }
        })
        .catch((error) => {
        })
        },[])  

    
    

    return(
        <div className={`ftProfile${dark}`}>
            <div>
                <NavBarProfile />
                <div className= {`ftwhiteShadow${dark}`}>
                    <IdSaldo 
                        balance={balance}
                    />
                    {divChoice === "Data" && 
                        <ChangeData
                            setUsername={setUsername}
                            setShowPopUp={setShowPopUp}
                            setDivChoice={setDivChoice}
                            email = {email}
                            sec = {sec}
                            setSec={setSec}
                        /> 
                    }
                    {divChoice === "BetHistory" && 
                        <BetHistory 
                            setDivChoice={setDivChoice}
                            betHist = {betHist}
                            email = {email}
                            amount={amount}
                            winnings={winnings}
                        />
                    }
                </div>
            </div>
            {(showPopUp === 'deposit' || showPopUp==='transfer') && 
                <div>
                    <div  className={`ftbackgroundModal${dark}`}></div>
                    <PopUpOperation 
                        showPopUp={showPopUp} 
                        setShowPopUp={setShowPopUp}
                        setBalance={setBalance}
                        email={email}
                    />
                </div>
            }
            {(showPopUp === 'changeSec') && 
                <div>
                    <div  className={`ftbackgroundModal${dark}`}></div>
                    <PopUpCodeEmail 
                        setShowPopUp={setShowPopUp}  
                        email={email} 
                        setSafeCode={setSafeCode} 
                        safeCode={safeCode} 
                    />
                </div>
            }
            {(showPopUp === 'confirm') && 
                <div>
                    <div  className={`ftbackgroundModal${dark}`}></div>
                    <PopUpCodeConfirm 
                        setShowPopUp={setShowPopUp} 
                        setSec={setSec} 
                        safeCode={safeCode} 
                    />
                </div>
            }

        </div>    
    )
}