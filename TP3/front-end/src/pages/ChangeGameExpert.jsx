import { useNavigate } from "react-router-dom";
import { useState } from "react";

import NavBarProfile from "../components/NavBarProfile"

import goBackImg from '../images/goBack.png'
import ModalConfirmedChange from "../components/ModalConfirmedChange";
import { useContext } from "react";
import { myContext } from "../context";

export default function ChangeGameExpert(props){

    const {expertGame,setExpertGame,setGames} = props
    const {dark} = useContext(myContext)

    const [confirmed,setConfirmed] = useState(false)

    const [selectedMotoGP,setSelectedMotoGP] = useState('')
    const [values,setValues] = useState({})

    let navigate = useNavigate()


    function getInEnglish(type){
        switch (type) {
            case "futebol": return 'football'
            case "basquetebol": return 'basketball'
            case "motoGP": return 'motoGP'
            case "tenis": return 'tenis'
        }
    }

    function goBack(){
        navigate('/ShowGamesExpert', { replace: true })
    }

    function updateGames(){

        fetch('http://127.0.0.1:8080/api/games/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
        })
        .then(response => response.json())
        .then(data => {
            if(data.games){
                setGames(data.games)
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    function sendRequest(send){

        fetch('http://127.0.0.1:8080/api/expert/endGame', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:  JSON.stringify(send)
        })
        .then(response => {
            updateGames()
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    
    function confirm(){

        var send

        if((expertGame.sport === 'motoGP') && (selectedMotoGP !== '')){

            send = {
                idGame: expertGame.id,
                nameParticipant: selectedMotoGP
            }

            sendRequest(send)
        }
        else{
            send = {
                idGame: expertGame.id,
                home: Number(values.home),
                away: Number(values.away)
            }

            sendRequest(send)

        }
        setConfirmed(true)
    }

    function handleChange(event){
        setValues(values => {
            return {
                ...values,
                [event.target.name] : event.target.value
            }
        })
    }


    function results(){
        if(getInEnglish(expertGame.sport) === 'motoGP'){
            return(
                <div className="expertGame">
                    <div>
                        <p className="pExpert">Escolha o vencedor da corrida</p>
                        <div className="gridExpertMotoGP">
                            {
                                expertGame.participants.map( ({name}) => {
                                    
                                    function newSelectedMotoGP(){
                                        setSelectedMotoGP(name)
                                    }          
                                    return(
                                        <button className={name === selectedMotoGP ? "participantSelected" : "participant"} onClick={newSelectedMotoGP}>{name}</button>
                                    )
                                } )
                            }
                        </div>
                    </div>
                </div>
            )
        }
        else{
            return(
                <div className="expertGame">
                    <div className="resultExpert">
                        <div>
                            <h3 className="resultExpertTitle">{expertGame.home}</h3>
                            <input className="resultExpertInput" type="number" value={values.home} onChange={handleChange} name='home'/>
                        </div>
                    </div>
                    <div className="resultExpert">
                        <div>
                            <h3 className="resultExpertTitle">{expertGame.away}</h3>
                            <input className="resultExpertInput" type="number" value={values.away} onChange={handleChange} name='away'/>
                        </div>
                    </div>
                </div>
            )
        }
    }

    return(
        <div className={dark === 'Dark' ? "backgroundBlack" : ""}>

            {confirmed && 
                <ModalConfirmedChange 
                    setConfirmed={setConfirmed}
                />
            }
            
            <NavBarProfile />
            <div className={`ftwhiteShadow${dark}`}>
                <img src = {goBackImg} className={`goBackImg${dark}`} onClick={goBack}/>
                <div className="expertGameCenter">
                    <div>
                        <h1 className = "expertGameTitle">Finalizar Jogo</h1>
                        {results()}
                        <div className="centerButton">
                            <button className="buttonConfirmExpertGame" onClick={confirm}>Confirmar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}