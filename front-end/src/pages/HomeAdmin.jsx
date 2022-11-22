import { useNavigate } from "react-router-dom"

import NavBarProfile from "../components/NavBarProfile"

import consultExpert from "../images/consultExpert.png"
import addExpert from "../images/addExpert.png"
import deleteExpert from "../images/deleteExpert.png"
import logoutImg from "../images/logout.png"



export default function HomeAdmin(props){

    const {username} = props

    let navigate = useNavigate()

    function goToAddExpert(){
        navigate('/AddExpert')
    }

    function logout(){
        navigate('/')
    }

    function goToConsult(){
        navigate('/')
    }

    function goToRemoveExpert(){
        navigate('/')
    }

    return(
        <div>
            <NavBarProfile
                username={username}
            />
            <div className='whiteShadow'>
                <div className="contentAdmin">
                    <button className="ButtonsAdmin" onClick={goToConsult}>Consultar Especialistas</button>
                    <img src={consultExpert} alt="" className="adminImg1"/>
                    <button className="ButtonsAdmin" onClick={goToAddExpert}>Adicionar Especialista</button>
                    <img src={addExpert} alt=""  className="adminImg2"/>
                    <button className="ButtonsAdmin" onClick={goToRemoveExpert}>Remover Especialista</button>
                    <img src={deleteExpert} alt=""  className="adminImg3"/>
                    <button className="ButtonsAdmin" onClick={logout}>Logout</button>
                    <img src={logoutImg} alt=""  className="adminImg4"/>
                </div>
            </div>
        </div>
    )


}