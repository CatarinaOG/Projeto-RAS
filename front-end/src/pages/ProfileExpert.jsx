
import { useNavigate } from "react-router-dom"

import NavBarProfile from "../components/NavBarProfile"

import goBackImg from '../images/goBack.png'
import logoutImg from "../images/logout.png"
import icon from "../images/achievement.png"



export default function ProfileExpert(props){

    const {username} = props

    let navigate = useNavigate()

    function goBack(){
        navigate('/HomeExpert')
    }

    function goToAddGame(){
        navigate('/AddGame')
    }

    function logout(){
        navigate('/')
    }

    return(

        <div>
            <NavBarProfile username={username}/>
            <img src = {goBackImg} className='goBackImg3' onClick={goBack}/>
                <div className='whiteShadow'>
                    <div className="contentExpert">
                        <button className="ButtonsExpert1" onClick={goToAddGame}>Criar jogo</button>
                        <img src={icon} alt=""  className="ftaddGameImg"/>
                        <button className="ButtonsExpert2" onClick={logout}>Logout</button>
                        <img src={logoutImg} alt=""  className="ftadminImg"/>
                    </div>
                </div>
                
        </div>

    )

}