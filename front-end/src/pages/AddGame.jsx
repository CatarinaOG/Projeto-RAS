import { useState } from 'react'
import { useNavigate } from "react-router-dom";

import goBackImg from '../images/goBack.png'

import NavBarProfile from "../components/NavBarProfile"
import PopUpAddGame from '../components/PopUpAddGame'
import PilotsForm from '../components/PilotsForm';


export default function AddGame(props){

    const {username,email,dark} = props

    // Variável cujo valor é alterado consoante o resultado da verificação checkFormPilot
    const [pilotError,setPilotError] = useState(0);

    // Variável utilizada para controlar o conditional rendering de mensagens de erro
	const [errorReg,setErrorReg]=useState(0)

    // Variável utilizada para controlar o conditional rendering do popUp de confirmação de criação do evento
    const [confirmed,setConfirmed] = useState(false)


    /**
     * Formulário onde serão armazenados todos os inputs
     */
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

    // variável usada no body do pedido HTTP da criação de uma corrida
    const motoBody = JSON.stringify({
        date: formData.date + " "+formData.time+":00",
        expert_email:email,
        pilot1:formData.pilot1,odd1:formData.odd1,pilot2:formData.pilot2,odd2:formData.odd2,
        pilot3:formData.pilot3,odd3:formData.odd3,pilot4:formData.pilot4,odd4:formData.odd4,
        pilot5:formData.pilot5,odd5:formData.odd5,pilot6:formData.pilot6,odd6:formData.odd6,

        pilot7:formData.pilot7,odd7:formData.odd7,pilot8:formData.pilot8,odd8:formData.odd8,
        pilot9:formData.pilot9,odd9:formData.odd9,pilot10:formData.pilot10,odd10:formData.odd10,
        pilot11:formData.pilot11,odd11:formData.odd11,pilot12:formData.pilot12,odd12:formData.odd12,

        pilot13:formData.pilot13,odd13:formData.odd13,pilot14:formData.pilot14,odd14:formData.odd14,
        pilot15:formData.pilot15,odd15:formData.odd15,pilot16:formData.pilot16,odd16:formData.odd16,
        pilot17:formData.pilot17,odd17:formData.odd17,pilot18:formData.pilot18,odd18:formData.odd18,

        pilot19:formData.pilot19,odd19:formData.odd19,pilot20:formData.pilot20,odd20:formData.odd20,
        pilot21:formData.pilot21,odd21:formData.odd21,pilot22:formData.pilot22,odd22:formData.odd22,
        pilot23:formData.pilot23,odd21:formData.odd23,pilot24:formData.pilot24,odd24:formData.odd24,
        name: formData.raceName,
        sport:"motoGP"
    })


    let navigate = useNavigate()

    // função responsável por retroceder para a página anterior
    function goBack(){
        navigate('/ProfileExpert', { replace: true })
    }

    /**
     * Função que altera o valor das variaveis do formulario apos cada alteração dos inputs
     * @param {} event 
     */
	function handleChange(event) {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name] : event.target.value

            }
        })
    }

    /**
     * Método que verifica se algum dos nomes dos pilotos no formulário está vazio e atribui o valor adequado a variavel
     * pilotError recorrendo ao setState correspondente à mesma
     */
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

    /**
     * Função responsável por submeter o form. é verificado o conteúdo de formData.sport, sendo que caso o desporto seja
     * algo que não motoGP é verificado se algum dos inputs está vazio, fazendo o pedido HTTP ou alterando a variável erroReg
     * Caso formData.spor tenha o valor de motoGP é dado um corpo diferente ao pedido newGame, sendo na mesma feito o tratamento de erros apropriados
     * @param {} event 
     */
	function handleSubmit(event){
		event.preventDefault()
        if(formData.sport!="motoGP" && formData.participantA!="" && formData.participantB!="" && formData.date!="" && formData.time!=""){
            const timeVal = formData.date + " "+formData.time+":00"
            console.log("odd empate : ",formData.oddTie)
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
                    expert_email:email,
                    name: formData.participantA +"vs"+formData.participantB
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
        else if(formData.sport==="motoGP"){
            checkFormPilot();
            console.log(formData)
            if(pilotError===0){
                fetch('http://127.0.0.1:8080/api/expert/newGame', {
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
        <div className={`ftaddGame${dark}`}>
            <div >
                <NavBarProfile 
                    username={username}
                    dark={dark}
                />
                <div className={`whiteShadow${dark}`}>
                    <img src = {goBackImg} className={`goBackImg${dark}`} onClick={goBack}/>
                    <h1 className={`ftInsertDataGame${dark}`}>Criar Evento</h1>
                    <form onSubmit = {handleSubmit}>
                        <h3 className={`ftpromptSport${dark}`}>Insira o Desporto</h3>
                        <select className={`ftselectSport${dark}`} value={formData.sport} onChange={handleChange} name ="sport">
                            <option className={`ftselectSportOption${dark}`} value="">---Escolha---</option>
                            <option className={`ftselectSportOption${dark}`} value="Futebol" name="Futebol" >Futebol</option>
                            <option className={`ftselectSportOption${dark}`} value="Tenis" name="Tenis" >Ténis</option>
                            <option className={`ftselectSportOption${dark}`} value="Basquetebol" name="Basquetebol" >Basquetebol</option>
                            <option className={`ftselectSportOption${dark}`} value="motoGP" name="motoGP" >MotoGP</option>



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
