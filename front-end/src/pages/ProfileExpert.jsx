
import { useNavigate } from "react-router-dom"
import { Cookies } from "react-cookie"

import NavBarProfile from "../components/NavBarProfile"

import goBackImg from '../images/goBack.png'
import logoutImg from "../images/logout.png"
import addEvent from "../images/achievement.png"
import editEvent from "../images/edit.png"




export default function ProfileExpert(props){

    const {dark} = props

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
        const cookies = new Cookies()
        cookies.remove('email')
		cookies.remove('username')
        cookies.remove('typeuser')
        navigate('/', { replace: true })
    }

    return(

        <div className={dark === 'Dark' ? "backgroundBlack" : ""}>
            <NavBarProfile 
                dark={dark}
            />
            <img src = {goBackImg} className={`goBackImg3${dark}`} onClick={goBack}/>
                <div className={`whiteShadow${dark}`}>
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