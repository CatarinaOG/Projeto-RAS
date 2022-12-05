
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


export default function Profile(props){

    
    const {username,setUsername,setBalance,balance,email,dark} = props

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
            }
        })
        .catch((error) => {
        })
  },[])  
      
    
  


    return(
        <div className={`ftProfile${dark}`}>
            <div>
                <NavBarProfile username={username} dark={dark}/>
                <div className= {`ftwhiteShadow${dark}`}>
                    <IdSaldo 
                        username={username} 
                        balance={balance}
                        dark={dark}
                    />
                    {divChoice === "Data" && 
                        <ChangeData
                            setUsername={setUsername}
                            setShowPopUp={setShowPopUp}
                            setDivChoice={setDivChoice}
                            email = {email}
                            sec = {sec}
                            setSec={setSec}
                            dark={dark}
                        /> 
                    }
                    {divChoice === "BetHistory" && 
                        <BetHistory 
                            setDivChoice={setDivChoice}
                            betHist = {betHist}
                            email = {email}
                            dark={dark}
                            amount={amount}
                            winnings={winnings}
                        />
                    }
                </div>
            </div>
            {(showPopUp == 'deposit' || showPopUp=='transfer') && 
                <div>
                    <div  className={`ftbackgroundModal${dark}`}></div>
                    <PopUpOperation 
                        showPopUp={showPopUp} 
                        setShowPopUp={setShowPopUp}
                        setBalance={setBalance}
                        email={email}
                        dark={dark}
                    />
                </div>
            }
            {(showPopUp == 'changeSec') && 
                <div>
                    <div  className={`ftbackgroundModal${dark}`}></div>
                    <PopUpCodeEmail setShowPopUp={setShowPopUp}  email={email} setSafeCode={setSafeCode} safeCode={safeCode} dark={dark}/>
                </div>
            }
            {(showPopUp == 'confirm') && 
                <div>
                    <div  className={`ftbackgroundModal${dark}`}></div>
                    <PopUpCodeConfirm setShowPopUp={setShowPopUp} setSec={setSec} safeCode={safeCode} dark={dark}/>
                </div>
            }
            

        </div>    
    )
}