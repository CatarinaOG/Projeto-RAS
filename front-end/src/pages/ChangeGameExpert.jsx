import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

import NavBarProfile from "../components/NavBarProfile"

import goBackImg from '../images/goBack.png'
import remove from '../images/remove.png'

export default function ShowExperts(props){

    const {username,expertGame,dark} = props
    const {id,sport,home,away} = expertGame

    let navigate = useNavigate()

    function goBack(){
        navigate('/ShowGamesExpert', { replace: true })
    }

    return(
        <div>
            <NavBarProfile
                username={username}
                dark={dark}
            />
            <div className='ftwhiteShadow'>
                <img src = {goBackImg} className='goBackImg' onClick={goBack}/>
                <div className="expertGameCenter">
                    <div>
                        <h1 className = "expertGameTitle">Finalizar Jogo</h1>
                        <div className="expertGame">
                            <div className="resultExpert">
                                <div>
                                    <h3 className="resultExpertTitle">{home}</h3>
                                    <input className="resultExpertInput" type="number" />
                                </div>
                            </div>
                            <div className="resultExpert">
                                <div>
                                    <h3 className="resultExpertTitle">{away}</h3>
                                    <input className="resultExpertInput" type="number" />
                                </div>
                            </div>
                        </div>
                        <div className="centerButton">
                            <button className="buttonConfirmExpertGame">Confirmar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}