import { useState } from 'react';

import goBackImg from '../images/goBack.png'

import NavBarProfile from "../components/NavBarProfile";
import PopUpAddGame from '../components/PopUpAddGame'


export default function AddGame(props){

    const {username,setRender} = props

    const [formData, setFormData] = useState(
        {sport: "",participantA:"" , participantB:"",oddA:"",oddB:"",oddTie:""}
    )

    const [confirmed,setConfirmed] = useState(false);

    const sportPop ='';
    const participantAPop='';
    const participantBPop='';
    const oddAPop='';
    const oddBPop='';
    const oddTiePop='';

    function goBack(){
        setRender('HomeExpert')
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

        // fazer verificação

        setConfirmed(true);
        
        sportPop =formData.sport;
        participantAPop=formData.participantA;
        participantBPop=formData.participantB;
        oddAPop=formData.oddA;
        oddBPop=formData.oddB;
        oddTiePop=formData.oddTie;
	}
    

    return(
        <div>
            <div>
                <NavBarProfile username={username}/>
                <div className='whiteShadow'>
                    <img src = {goBackImg} className='goBackImg' onClick={goBack}/>
                    <h2 className='ftInsertData'>Criar Jogo</h2>
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

                        <button className = "ftadd" >Criar Jogo</button>
                    </form>

                </div>
            </div>
            {confirmed && 
                <div>
                    <div className="ftbackgroundModal"></div>
                    <PopUpAddGame 
                        setConfirmed={setConfirmed}
                    />
                </div>
            }   

        </div>    
    )
}