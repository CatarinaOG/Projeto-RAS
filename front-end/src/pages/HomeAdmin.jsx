import { useNavigate } from "react-router-dom"
import { Cookies } from "react-cookie"

import NavBarProfile from "../components/NavBarProfile"

import consultExpert from "../images/consultExpert.png"
import addExpert from "../images/addExpert.png"
import logoutImg from "../images/logout.png"



export default function HomeAdmin(props){

    const {username,dark} = props

    let navigate = useNavigate()

    function goToAddExpert(){
        navigate('/AddExpert', { replace: true })
    }

    function logout(){
        const cookies = new Cookies()
        cookies.remove('email')
		cookies.remove('username')
        cookies.remove('typeuser')
        navigate('/', { replace: true })
    }

    function goToShowExperts(){
        navigate('/ShowExperts', { replace: true })
    }

    return(
        <div className={dark === 'Dark' ? "backgroundBlack" : ""}>
            <NavBarProfile
                username={username}
                dark={dark}
            />
            <div className={`whiteShadow${dark}`}>
                <div className="contentAdmin">
                    <button className="ButtonsAdmin" onClick={goToShowExperts}>Consultar Especialistas</button>
                    <img src={consultExpert} alt="" className="adminImg1"/>
                    <button className="ButtonsAdmin" onClick={goToAddExpert}>Adicionar Especialista</button>
                    <img src={addExpert} alt=""  className="adminImg2"/>
                    <button className="ButtonsAdmin" onClick={logout}>Logout</button>
                    <img src={logoutImg} alt=""  className="adminImg3"/>
                </div>
            </div>
        </div>
    )


}