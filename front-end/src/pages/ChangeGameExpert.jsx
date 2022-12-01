import { useAsyncError, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

import NavBarProfile from "../components/NavBarProfile"

import goBackImg from '../images/goBack.png'
import ModalConfirmatedChange from "../components/ModalConfirmedChange";

export default function ShowExperts(props){

    const {username,expertGame,setExpertGame,dark} = props

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

    
    function confirm(){

        var send

        if((expertGame.sport === 'motoGP') && (selectedMotoGP !== '')){

            send = {
                idGame: expertGame.id,
                idParticipant: selectedMotoGP
            }

            console.log("enviar pedido")
        }
        else{
            send = {
                idGame: expertGame.id,
                home: values.home,
                away: values.away
            }

            console.log("enviar pedido")

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
                                expertGame.participants.map( ({id,name}) => {
                                    
                                    function newSelectedMotoGP(){
                                        setSelectedMotoGP(id)
                                    }                    
                                    return(
                                        <button className={id === selectedMotoGP ? "participantSelected" : "participant"} onClick={newSelectedMotoGP}>{name}</button>
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
        <div>

            {confirmed && 
                <ModalConfirmatedChange 
                    setConfirmed={setConfirmed}
                />
            }
            
            <NavBarProfile
                username={username}
                dark={dark}
            />
            <div className='ftwhiteShadow'>
                <img src = {goBackImg} className='goBackImg' onClick={goBack}/>
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