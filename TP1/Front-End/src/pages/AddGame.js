import { useState } from 'react';

import goBackImg from '../images/goBack.png'

import NavBarProfile from "../components/NavBarProfile";
import PopUpAddGame from '../components/PopUpAddGame'


export default function AddGame(props){

    const {username,setRender,email} = props

    const [formData, setFormData] = useState(
        {sport: "",participantA:"" , participantB:"",oddA:0,oddB:0,oddTie:0,date:"",time:""}
    )

	const [errorReg,setErrorReg]=useState(0);

    
    const [confirmed,setConfirmed] = useState(false);

    function goBack(){
        setRender('ProfileExpert')
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
		event.preventDefault();
        
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
                    setConfirmed(true);
                    setErrorReg(0);

                }
                
            });
        }
        else{
            setErrorReg(2);
        }

	}
    

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
                        </select>

                        <h3 className="ftpromptParticipantA">Participante A :</h3>
                        <input className ="ftselectPartA" type="text" onChange={handleChange}  placeholder='Participante A' name = "participantA" value = {formData.participantA}/>
                        
                        <h3 className="ftpromptParticipantB">Participante B :</h3>
                        <input className ="ftselectPartB" type="text" onChange={handleChange} placeholder='Participante B' name = "participantB" value = {formData.participantB}/>
                        
                        <h3 className="ftpromptOdds">Odds:</h3>
					    <input className='ftoddA' type="number" onChange={handleChange} placeholder = "Odd A" name="oddA" value = {formData.oddA}/>
					    <input className='ftoddTie' type="number" onChange={handleChange} placeholder = "Odd Tie" name="oddTie" value = {formData.oddTie}/>
					    <input className='ftoddB' type="number" onChange={handleChange} placeholder = "Odd B" name="oddB" value = {formData.oddB}/>

                        <h3 className='ftpromptDate'>Data/Hora: </h3>
                        <input className ="ftselectDate" type="date" onChange={handleChange}  name = "date" value = {formData.date}/>

                        <input className ="ftselectTime" type="time" onChange={handleChange} placeholder='time' name = "time" value = {formData.time}/>


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