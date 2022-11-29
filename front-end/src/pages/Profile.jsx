
import '../styles/Profile.css'
import '../styles/ProfileSec.css'

import { useEffect } from 'react'

import NavBarProfile from "../components/NavBarProfile"
import IdSaldo from '../components/IdSaldo'
import ChangeData from '../components/ChangeData'
import BetHistory from '../components/BetHistory'
import PopUpOperation from '../components/PopUpOperation'
import PopUpCodeEmail from '../components/PopUpCodeEmail'
import PopUpCodeConfirm from '../components/PopUpCodeConfirm'

import { useState } from 'react'


export default function Profile(props){

    
    const {username,setUsername,setBalance,balance,email} = props

    const [divChoice,setDivChoice] = useState("Data")
    const [showPopUp,setShowPopUp] = useState("")
    const [sec,setSec] =useState(0)


    const [betHist,setBetHist] = useState([])

    /*
    useEffect(() => {
        
        fetch('http://127.0.0.1:8080/api/users/bet_history',{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ 
					email: email
        	})
        .then(response => response.json())
        .then(data => {
            if(data.betHistory){
                setBetHist(data.betHistory)
            }
        })
        .catch((error) => {
          console.error('Error:', error);
        })
        
      },[])})
    */
  


    return(
        <div className='ftProfile'>
            <div>
                <NavBarProfile username={username}/>
                <div className='ftwhiteShadow'>
                    <IdSaldo username={username} balance={balance}/>
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
            {(showPopUp == 'changeSec') && 
                <div>
                    <div  className="ftbackgroundModal"></div>
                    <PopUpCodeEmail setShowPopUp={setShowPopUp}  email={email}/>
                </div>
            }
            {(showPopUp == 'confirm') && 
                <div>
                    <div  className="ftbackgroundModal"></div>
                    <PopUpCodeConfirm setShowPopUp={setShowPopUp} setSec={setSec} email = {email} />
                </div>
            }
            

        </div>    
    )
}