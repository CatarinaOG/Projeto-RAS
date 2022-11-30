
import { useNavigate } from "react-router-dom"

import NavBarProfile from "../components/NavBarProfile"

import goBackImg from '../images/goBack.png'
import logoutImg from "../images/logout.png"
import addEvent from "../images/achievement.png"
import editEvent from "../images/edit.png"




export default function ProfileExpert(props){

    const {username,dark} = props

    let navigate = useNavigate()

    function goBack(){
        navigate('/HomeExpert', { replace: true })
    }

    function goToAddGame(){
        navigate('/AddGame', { replace: true })
    }

    function goToShowGamesExpert(){
        navigate('/ShowGamesExpert', { replace: true })
    }

    function logout(){
        navigate('/', { replace: true })
    }

    return(

        <div>
            <NavBarProfile 
                username={username}
                dark={dark}
                />
            <img src = {goBackImg} className='goBackImg3' onClick={goBack}/>
                <div className='whiteShadow'>
                    <div className="contentAdmin">
                        <button className="ButtonsAdmin" onClick={goToAddGame}>Criar Evento</button>
                        <img src={addEvent} alt="" className="expertImg1"/>
                        <button className="ButtonsAdmin" onClick={goToShowGamesExpert}>Consultar Eventos</button>
                        <img src={editEvent} alt="" className="expertImg2"/>
                        <button className="ButtonsAdmin" onClick={logout}>Logout</button>
                        <img src={logoutImg} alt=""  className="adminImg3"/>
                    </div>
                </div>
                
        </div>

    )

}