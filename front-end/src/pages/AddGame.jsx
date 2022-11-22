import { useState } from 'react'
import { useNavigate } from "react-router-dom";

import goBackImg from '../images/goBack.png'

import NavBarProfile from "../components/NavBarProfile"
import PopUpAddGame from '../components/PopUpAddGame'


export default function AddGame(props){

    const {username,email} = props

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
        pilot23:"",odd23:0,pilot24:"",odd24:0,

        date:"",time:"",raceName:""}
    )

    const motoBody = JSON.stringify({
        sport: formData.sport ,
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
        pilot23:formData.pilot1,odd23:formData.odd1,pilot24:formData.pilot1,odd24:formData.odd1,
        raceName: formData.raceName
    })

	const [errorReg,setErrorReg]=useState(0)

    const [confirmed,setConfirmed] = useState(false)

    let navigate = useNavigate()

    function goBack(){
        navigate('/ProfileExpert')
    }

	function handleChange(event) {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name] : event.target.value

            }
        })
    }

	function handleSubmit(event){
		event.preventDefault()

        if(formData.sport!="" && formData.participantA!="" && formData.participantB!="" && formData.date!="" && formData.time!=""){
            const timeVal = formData.date + "T"+formData.time+":00"

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
                if (data.state === 'good'){
                    setConfirmed(true)
                    setErrorReg(0)
                }
            })
        }
        else{
            setErrorReg(2)
        }

	}

    /*
    const rows = [];
    for (let i = 1; i < 25; i++) {
        // note: we are adding a key prop here to allow react to uniquely identify each
        // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
        oddNum = "odd"+i
        pilotname = "pilot"+i
        rows.push(
        <div>
            <input type="text" onChange={handleChange}  placeholder={pilotname} name = {pilotname} ></input>
            <input></input>
        </div>
            );
    }
    */

    const pilotList = (
        <div className='divPilots'>
            <div className='pilotOdd'>
                <input className ="ftChoosePilot" type="text" onChange={handleChange}  placeholder='Pilot 1' name = "pilot1" value = {formData.pilot1}/>
				<input className='ftoddPilot' type="number" onChange={handleChange} placeholder = "Odd 1" name="odd1" value = {formData.odd1}/>
            </div>

            <div className='pilotOdd'>
                <input className ="ftChoosePilot" type="text" onChange={handleChange}  placeholder='Pilot 2' name = "pilot2" value = {formData.pilot2}/>
				<input className='ftoddPilot' type="number" onChange={handleChange} placeholder = "Odd 2" name="odd2" value = {formData.odd2}/>
            </div>

            <div className='pilotOdd'>
                <input className ="ftChoosePilot" type="text" onChange={handleChange}  placeholder='Pilot 3' name = "pilot3" value = {formData.pilot3}/>
				<input className='ftoddPilot' type="number" onChange={handleChange} placeholder = "Odd 3" name="odd3" value = {formData.odd3}/>
            </div>

            <div className='pilotOdd'>
                <input className ="ftChoosePilot" type="text" onChange={handleChange}  placeholder='Pilot 4' name = "pilot4" value = {formData.pilot4}/>
				<input className='ftoddPilot' type="number" onChange={handleChange} placeholder = "Odd 4" name="odd4" value = {formData.odd4}/>
            </div>

            <div className='pilotOdd'>
                <input className ="ftChoosePilot" type="text" onChange={handleChange}  placeholder='Pilot 5' name = "pilot5" value = {formData.pilot5}/>
				<input className='ftoddPilot' type="number" onChange={handleChange} placeholder = "Odd 5" name="odd5" value = {formData.odd5}/>
            </div>

            <div className='pilotOdd'>
                <input className ="ftChoosePilot" type="text" onChange={handleChange}  placeholder='Pilot 6' name = "pilot6" value = {formData.pilot6}/>
				<input className='ftoddPilot' type="number" onChange={handleChange} placeholder = "Odd 6" name="odd6" value = {formData.odd6}/>
            </div>

            <div className='pilotOdd'>
                <input className ="ftChoosePilot" type="text" onChange={handleChange}  placeholder='Pilot 7' name = "pilot7" value = {formData.pilot7}/>
				<input className='ftoddPilot' type="number" onChange={handleChange} placeholder = "Odd 7" name="odd7" value = {formData.odd7}/>
            </div>

            <div className='pilotOdd'>
                <input className ="ftChoosePilot" type="text" onChange={handleChange}  placeholder='Pilot 8' name = "pilot8" value = {formData.pilot8}/>
				<input className='ftoddPilot' type="number" onChange={handleChange} placeholder = "Odd 8" name="odd8" value = {formData.odd8}/>
            </div>

            <div className='pilotOdd'>
                <input className ="ftChoosePilot" type="text" onChange={handleChange}  placeholder='Pilot 9' name = "pilot9" value = {formData.pilot9}/>
				<input className='ftoddPilot' type="number" onChange={handleChange} placeholder = "Odd 9" name="odd9" value = {formData.odd9}/>
            </div>

            <div className='pilotOdd'>
                <input className ="ftChoosePilot" type="text" onChange={handleChange}  placeholder='Pilot 10' name = "pilot10" value = {formData.pilot10}/>
				<input className='ftoddPilot' type="number" onChange={handleChange} placeholder = "Odd 10" name="odd10" value = {formData.odd10}/>
            </div>

            <div className='pilotOdd'>
                <input className ="ftChoosePilot" type="text" onChange={handleChange}  placeholder='Pilot 11' name = "pilot11" value = {formData.pilot11}/>
				<input className='ftoddPilot' type="number" onChange={handleChange} placeholder = "Odd 11" name="odd11" value = {formData.odd11}/>
            </div>

            <div className='pilotOdd'>
                <input className ="ftChoosePilot" type="text" onChange={handleChange}  placeholder='Pilot 12' name = "pilot12" value = {formData.pilot12}/>
				<input className='ftoddPilot' type="number" onChange={handleChange} placeholder = "Odd 12" name="odd12" value = {formData.odd12}/>
            </div>

            <div className='pilotOdd'>
                <input className ="ftChoosePilot" type="text" onChange={handleChange}  placeholder='Pilot 13' name = "pilot13" value = {formData.pilot13}/>
				<input className='ftoddPilot' type="number" onChange={handleChange} placeholder = "Odd 13" name="odd13" value = {formData.odd13}/>
            </div>

            <div className='pilotOdd'>
                <input className ="ftChoosePilot" type="text" onChange={handleChange}  placeholder='Pilot 14' name = "pilot14" value = {formData.pilot14}/>
				<input className='ftoddPilot' type="number" onChange={handleChange} placeholder = "Odd 14" name="odd14" value = {formData.odd14}/>
            </div>

            <div className='pilotOdd'>
                <input className ="ftChoosePilot" type="text" onChange={handleChange}  placeholder='Pilot 15' name = "pilot15" value = {formData.pilot15}/>
				<input className='ftoddPilot' type="number" onChange={handleChange} placeholder = "Odd 15" name="odd15" value = {formData.odd15}/>
            </div>

            <div className='pilotOdd'>
                <input className ="ftChoosePilot" type="text" onChange={handleChange}  placeholder='Pilot 15' name = "pilot15" value = {formData.pilot15}/>
				<input className='ftoddPilot' type="number" onChange={handleChange} placeholder = "Odd 15" name="odd15" value = {formData.odd15}/>
            </div>

            <div className='pilotOdd'>
                <input className ="ftChoosePilot" type="text" onChange={handleChange}  placeholder='Pilot 16' name = "pilot1" value = {formData.pilot16}/>
				<input className='ftoddPilot' type="number" onChange={handleChange} placeholder = "Odd 16" name="odd16" value = {formData.odd16}/>
            </div>

            <div className='pilotOdd'>
                <input className ="ftChoosePilot" type="text" onChange={handleChange}  placeholder='Pilot 17' name = "pilot17" value = {formData.pilot17}/>
				<input className='ftoddPilot' type="number" onChange={handleChange} placeholder = "Odd 17" name="odd17" value = {formData.odd17}/>
            </div>

            <div className='pilotOdd'>
                <input className ="ftChoosePilot" type="text" onChange={handleChange}  placeholder='Pilot 18' name = "pilot18" value = {formData.pilot18}/>
				<input className='ftoddPilot' type="number" onChange={handleChange} placeholder = "Odd 18" name="odd18" value = {formData.odd18}/>
            </div>

            <div className='pilotOdd'>
                <input className ="ftChoosePilot" type="text" onChange={handleChange}  placeholder='Pilot 19' name = "pilot19" value = {formData.pilot19}/>
				<input className='ftoddPilot' type="number" onChange={handleChange} placeholder = "Odd 19" name="odd19" value = {formData.odd19}/>
            </div>

            <div className='pilotOdd'>
                <input className ="ftChoosePilot" type="text" onChange={handleChange}  placeholder='Pilot 20' name = "pilot20" value = {formData.pilot20}/>
				<input className='ftoddPilot' type="number" onChange={handleChange} placeholder = "Odd 20" name="odd20" value = {formData.odd20}/>
            </div>

            <div className='pilotOdd'>
                <input className ="ftChoosePilot" type="text" onChange={handleChange}  placeholder='Pilot 21' name = "pilot21" value = {formData.pilot21}/>
				<input className='ftoddPilot' type="number" onChange={handleChange} placeholder = "Odd 21" name="odd21" value = {formData.odd21}/>
            </div>

            <div className='pilotOdd'>
                <input className ="ftChoosePilot" type="text" onChange={handleChange}  placeholder='Pilot 22' name = "pilot22" value = {formData.pilot22}/>
				<input className='ftoddPilot' type="number" onChange={handleChange} placeholder = "Odd 22" name="odd22" value = {formData.odd22}/>
            </div>

            <div className='pilotOdd'>
                <input className ="ftChoosePilot" type="text" onChange={handleChange}  placeholder='Pilot 23' name = "pilot23" value = {formData.pilot23}/>
				<input className='ftoddPilot' type="number" onChange={handleChange} placeholder = "Odd 23" name="odd23" value = {formData.odd23}/>
            </div>

            <div className='pilotOdd'>
                <input className ="ftChoosePilot" type="text" onChange={handleChange}  placeholder='Pilot 24' name = "pilot24" value = {formData.pilot24}/>
				<input className='ftoddPilot' type="number" onChange={handleChange} placeholder = "Odd 24" name="odd24" value = {formData.odd24}/>
            </div>
        </div>
    )

    return(
        <div>
            <div>
                <NavBarProfile username={username}/>
                <div className='whiteShadow'>
                    <img src = {goBackImg} className='goBackImg' onClick={goBack}/>
                    <h1 className='ftInsertDataGame'>Criar Jogo</h1>
                    <form onSubmit = {handleSubmit}>
                        <h3 className='ftpromptSport'>Insira o Desporto</h3>
                        <select className='ftselectSport' value={formData.sport} onChange={handleChange} name ="sport">
                            <option value="">---Escolha---</option>
                            <option value="Futebol" name="Futebol" >Futebol</option>
                            <option value="Tenis" name="Tenis" >Ténis</option>
                            <option value="Basquetebol" name="Basquetebol" >Basquetebol</option>
                            <option value="motoGP" name="motoGP" >MotoGP</option>



                        </select>
                        {formData.sport != "motoGP" && <div>
                        <h3 className="ftpromptParticipantA">Participante A :</h3>
                        <input className ="ftselectPartA" type="text" onChange={handleChange}  placeholder='Participante A' name = "participantA" value = {formData.participantA}/>

                        <h3 className="ftpromptParticipantB">Participante B :</h3>
                        <input className ="ftselectPartB" type="text" onChange={handleChange} placeholder='Participante B' name = "participantB" value = {formData.participantB}/>

                        <h3 className="ftpromptOdds">Odds:</h3>
					    <input className='ftoddA' type="number" onChange={handleChange} placeholder = "Odd A" name="oddA" value = {formData.oddA}/>
					    {formData.sport === "Futebol" && <input className='ftoddTie' type="number" onChange={handleChange} placeholder = "Odd Tie" name="oddTie" value = {formData.oddTie}/> }
					    <input className='ftoddB' type="number" onChange={handleChange} placeholder = "Odd B" name="oddB" value = {formData.oddB}/>

                        <h3 className='ftpromptDate'>Data/Hora: </h3>
                        <input className ="ftselectDate" type="date" onChange={handleChange}  name = "date" value = {formData.date}/>

                        <input className ="ftselectTime" type="time" onChange={handleChange} placeholder='time' name = "time" value = {formData.time}/>
                        </div>}



                        {formData.sport==="motoGP" &&

                        <div >
                            <h3 className="ftpromptParticipantA">Nome do evento :</h3>
                            <input className ="ftselectPartA" type="text" onChange={handleChange}  placeholder='Event Name' name = "raceName" value = {formData.raceName}/>

                            <h3>Insira o nome dos pilotos e respectiva odd</h3>
                            {pilotList}
                        </div>}




                        <button className = "ftadd" >Criar Jogo</button>
			            {errorReg === 2 && <p className='fterrorAddGame'>Dados em falta</p>}
                    </form>
                </div>
            </div>
            {confirmed &&
                <div>
                    <div className="ftbackgroundModal"></div>
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
                  />
                </div>
            }

        </div>
    )
}
