
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
        <div className='AddGame'>
            <div>
                <NavBarProfile userN = {username}/>
                <div className='whiteShadow'>
                    <IdSaldo userN = {username}/>
                    <h2 className='InsertData'>Insira os dados do jogo</h2>
                    <form onSubmit = {handleSubmit}>
                        <h3 className='promptSport'>Insira o Desporto</h3>
                        <select className='selectSport' value={formData.sport} onChange={handleChange} name ="sport">
                            <option value="Futebol">Futebol</option>
                            <option value="Ténis">Ténis</option>
                            <option value="">---Escolha---</option>
                        </select>

                        <h3 className="promptParticipantA">Participante A :</h3>
                        <input className ="selectPartA" type="text" onChange={handleChange}  placeholder='Participante A' name = "participantA" value = {formData.participantA}/>
                        
                        <h3 className="promptParticipantB">Participante B :</h3>
                        <input className ="selectPartB" type="text" onChange={handleChange} placeholder='Participante B' name = "participantB" value = {formData.participantB}/>
                        
                        <h3 className="promptOdds">Odds:</h3>
					    <input className='oddA' type="number" onChange={handleChange} placeholder = "Odd A" name="oddA" value = {formData.oddA}/>
					    <input className='oddTie' type="number" onChange={handleChange} placeholder = "Odd Tie" name="oddTie" value = {formData.oddTie}/>
					    <input className='oddB' type="number" onChange={handleChange} placeholder = "Odd B" name="oddB" value = {formData.oddB}/>

                        <button className = "add" > Confirmar</button>
                    </form>

                </div>
            </div>

        </div>    
    )
}