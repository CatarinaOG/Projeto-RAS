import { useState } from 'react'
import { useNavigate } from "react-router-dom";

import goBackImg from '../images/goBack.png'

import NavBarProfile from "../components/NavBarProfile"
import PopUpAddGame from '../components/PopUpAddGame'
import PilotsForm from '../components/PilotsForm';


export default function AddGame(props){

    const {username,email,dark} = props
    const [pilotError,setPilotError] = useState(0);

    const [formData, setFormData] = useState(
        {sport: "",
        participantA:"" ,
        participantB:"",
        oddA:0,oddB:0,oddTie:0,
        pilot1:"",odd1:0,pilot2:"",odd2:0,
        pilot3:"",odd3:0,pilot4:"",odd4:0,
        pilot5:"",odd5:0,pilot6:"",odd6:0,

        pilot7:"",odd7:0,pilot8:"",odd8:0,
        pilot9:"",odd9:0,pilot10:"",odd10:0,
        pilot11:"",odd11:0,pilot12:"",odd12:0,

        pilot13:"",odd13:0,pilot14:"",odd14:0,
        pilot15:"",odd15:0,pilot16:"",odd16:0,
        pilot17:"",odd17:0,pilot18:"",odd18:0,

        pilot19:"",odd19:0,pilot20:"",odd20:0,
        pilot21:"",odd21:0,pilot22:"",odd22:0,
        

        date:"",time:"",raceName:""}
    )

    const motoBody = JSON.stringify({
        date: formData.date + "T"+formData.time+":00",
        expert_email:email,
        pilot1:formData.pilot1,odd1:formData.odd1,pilot2:formData.pilot1,odd2:formData.odd1,
        pilot3:formData.pilot1,odd3:formData.odd1,pilot4:formData.pilot1,odd4:formData.odd1,
        pilot5:formData.pilot1,odd5:formData.odd1,pilot6:formData.pilot1,odd6:formData.odd1,

        pilot7:formData.pilot1,odd7:formData.odd1,pilot8:formData.pilot1,odd8:formData.odd1,
        pilot9:formData.pilot1,odd9:formData.odd1,pilot10:formData.pilot1,odd10:formData.odd1,
        pilot11:formData.pilot1,odd11:formData.odd1,pilot12:formData.pilot1,odd12:formData.odd1,

        pilot13:formData.pilot1,odd13:formData.odd1,pilot14:formData.pilot1,odd14:formData.odd1,
        pilot15:formData.pilot1,odd15:formData.odd1,pilot16:formData.pilot1,odd16:formData.odd1,
        pilot17:formData.pilot1,odd17:formData.odd1,pilot18:formData.pilot1,odd18:formData.odd1,

        pilot19:formData.pilot1,odd19:formData.odd1,pilot20:formData.pilot1,odd20:formData.odd1,
        pilot21:formData.pilot1,odd21:formData.odd1,pilot22:formData.pilot1,odd22:formData.odd1,
        raceName: formData.raceName
    })

	const [errorReg,setErrorReg]=useState(0)

    const [confirmed,setConfirmed] = useState(false)

    let navigate = useNavigate()

    function goBack(){
        navigate('/ProfileExpert', { replace: true })
    }

	function handleChange(event) {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name] : event.target.value

            }
        })
    }

    function checkFormPilot(){
        if(formData.pilot1==="" || formData.pilot2==="" || formData.pilot3==="" || formData.pilot4==="" || formData.pilot5==="" || formData.pilot6==="" ||
        formData.pilot7==="" || formData.pilot8==="" || formData.pilot9==="" || formData.pilot10==="" || formData.pilot11==="" || formData.pilot12==="" ||
        formData.pilot13==="" || formData.pilot14==="" || formData.pilot15==="" || formData.pilot16==="" || formData.pilot17==="" || formData.pilot8==="" ||
        formData.pilot19==="" || formData.pilot20==="" || formData.pilot21==="" || formData.pilot22==="" ){
            setPilotError(1);
        }
        else{
            setPilotError(0)
        }
    }

	function handleSubmit(event){
		event.preventDefault()
        console.log(formData)
        console.log(email)
        if(formData.sport!="motoGP" && formData.participantA!="" && formData.participantB!="" && formData.date!="" && formData.time!=""){
            const timeVal = formData.date + "T"+formData.time+":00"

            console.log("entrei aqui")
            fetch('http://127.0.0.1:8080/api/expert/newGame', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json ',
                },
                body: JSON.stringify({
                    sport: formData.sport ,
                    participantA:formData.participantA ,
                    participantB:formData.participantB,
                    oddA:formData.oddA,
                    oddB:formData.oddB,
                    oddTie:formData.oddTie,
                    date:timeVal,
                    expert_email:email
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data.state)
                if (data.state === 'good'){
                    setConfirmed(true)
                    setErrorReg(0)
                    console.log("CONFIRMED")
                }
            })
        }
        else if(formData.sport==="motoGP"){
            checkFormPilot();
            console.log("MOTO BODY IS: " ,motoBody)
            if(pilotError===0){
                fetch('http://127.0.0.1:8080/api/expert/race', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json ',
                    },
                    body: motoBody
                })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'true'){
                        setConfirmed(true)
                        setErrorReg(0)
                    }
                })
                setConfirmed(true)
                setErrorReg(0)

            }
            else{
                setErrorReg(2)

            }
        }
        else{
            setErrorReg(2)
        }

	}


    return(
        <div>
            <div>
                <NavBarProfile 
                    username={username}
                    dark={dark}
                />
                <div className={`whiteShadow${dark}`}>
                    <img src = {goBackImg} className='goBackImg' onClick={goBack}/>
                    <h1 className={`ftInsertDataGame${dark}`}>Criar Evento</h1>
                    <form onSubmit = {handleSubmit}>
                        <h3 className={`ftpromptSport${dark}`}>Insira o Desporto</h3>
                        <select className={`ftselectSport${dark}`} value={formData.sport} onChange={handleChange} name ="sport">
                            <option value="">---Escolha---</option>
                            <option value="Futebol" name="Futebol" >Futebol</option>
                            <option value="Tenis" name="Tenis" >Ténis</option>
                            <option value="Basquetebol" name="Basquetebol" >Basquetebol</option>
                            <option value="motoGP" name="motoGP" >MotoGP</option>



                        </select>
                        {formData.sport != "motoGP" && <div>
                        <h3 className={`ftpromptParticipantA${dark}`}>Participante A :</h3>
                        <input className ={`ftselectPartA${dark}`} type="text" onChange={handleChange}  placeholder='Participante A' name = "participantA" value = {formData.participantA}/>

                        <h3 className={`ftpromptParticipantB${dark}`}>Participante B :</h3>
                        <input className ={`ftselectPartB${dark}`} type="text" onChange={handleChange} placeholder='Participante B' name = "participantB" value = {formData.participantB}/>

                        <h3 className={`ftpromptOdds${dark}`}>Odds:</h3>
					    <input className={`ftoddA${dark}`} type="number" onChange={handleChange} placeholder = "Odd A" name="oddA" value = {formData.oddA}/>
					    {formData.sport === "Futebol" && <input className={`ftoddTie${dark}`} type="number" onChange={handleChange} placeholder = "Odd Tie" name="oddTie" value = {formData.oddTie}/> }
					    <input className={`ftoddB${dark}`} type="number" onChange={handleChange} placeholder = "Odd B" name="oddB" value = {formData.oddB}/>

                        <h3 className={`ftpromptDate${dark}`}>Data/Hora: </h3>
                        <input className ={`ftselectDate${dark}`} type="date" onChange={handleChange}  name = "date" value = {formData.date}/>

                        <input className ={`ftselectTime${dark}`} type="time" onChange={handleChange} placeholder='time' name = "time" value = {formData.time}/>
                        </div>}



                        {formData.sport==="motoGP" &&
                        <div >
                            <h3 className={`ftpromptParticipantA${dark}`}>Nome do evento :</h3>
                            <input className ={`ftselectPartA${dark}`}  type="text" onChange={handleChange}  placeholder='Event Name' name = "raceName" value = {formData.raceName}/>

                            <h3 className={`ftpromptEvent${dark}`}>Insira os Pilotos/odds/data/hora</h3>
                            <PilotsForm formData={formData} handleChange={handleChange} dark={dark}></PilotsForm>
                        </div>}
                        <button className = {`ftadd${dark}`} >Confirmar</button>
			            {errorReg === 2 && <p className='fterrorAddGame'>Dados em falta</p>}
                    </form>
                </div>
            </div>
            {confirmed &&
                <div>
                    <div className={`ftbackgroundModal${dark}`}></div>
                    <PopUpAddGame
                        setConfirmed={setConfirmed}
                        sportPop={formData.sport}
                        participantAPop={formData.participantA}
                        participantBPop={formData.participantB}
                        oddAPop={formData.oddA}
                        oddBPop={formData.oddB}
                        oddTiePop={formData.oddTie}
                        date = {formData.date}
                        time = {formData.time}
                        eventName = {formData.raceName}
                        dark={dark}
                  />
                </div>
            }

        </div>
    )
}
