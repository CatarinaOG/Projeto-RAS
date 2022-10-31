
import '../styles/AddGame.css';
import NavBarProfile from "../components/NavBarProfile";
import IdSaldo from '../components/IdSaldo';
import { useState } from 'react';
import ChangeData from '../components/ChangeData';
import BetHistory from '../components/BetHistory';
import PopUp from '../components/PopUp'

export default function AddGame(){

    const [username,setUsername] = useState("Francisco Toldy");
    const [val,setVal] = useState(0);

    const [formData, setFormData] = useState(
        {sport: "",participantA:"" , participantB:"",oddA:"",oddB:"",oddTie:""}
    )


	function handleChange(event) {
        setFormData(prevFormData => {
            console.log(event.target.value)
            return {
                ...prevFormData,
                [event.target.name] : event.target.value
                
            }
        })
    }

	function handleSubmit(event){
		event.preventDefault();
        console.log(formData.oddTie)
	}
    




    return(
        <div className='ftAddGame'>
            <div>
                <NavBarProfile userN = {username}/>
                <div className='whiteShadow'>
                    <IdSaldo userN = {username}/>
                    <h2 className='ftInsertData'>Insira os dados do jogo</h2>
                    <form onSubmit = {handleSubmit}>
                        <h3 className='ftpromptSport'>Insira o Desporto</h3>
                        <select className='ftselectSport' value={formData.sport} onChange={handleChange} name ="sport">
                            <option value="Futebol">Futebol</option>
                            <option value="">---Escolha---</option>
                        </select>

                        <h3 className="ftpromptParticipantA">Participante A :</h3>
                        <input className ="ftselectPartA" type="text" onChange={handleChange}  placeholder='Participante A' name = "participantA" value = {formData.participantA}/>
                        
                        <h3 className="ftpromptParticipantB">Participante B :</h3>
                        <input className ="ftselectPartB" type="text" onChange={handleChange} placeholder='Participante B' name = "participantB" value = {formData.participantB}/>
                        
                        <h3 className="ftpromptOdds">Odds:</h3>
					    <input className='ftoddA' type="number" onChange={handleChange} placeholder = "Odd A" name="oddA" value = {formData.oddA}/>
					    <input className='ftoddTie' type="number" onChange={handleChange} placeholder = "Odd Tie" name="oddTie" value = {formData.oddTie}/>
					    <input className='ftoddB' type="number" onChange={handleChange} placeholder = "Odd B" name="oddB" value = {formData.oddB}/>

                        <button className = "ftadd" > Confirmar</button>
                    </form>

                </div>
            </div>

        </div>    
    )
}