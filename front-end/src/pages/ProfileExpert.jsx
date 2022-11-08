
import { useNavigate } from "react-router-dom"

import NavBarProfile from "../components/NavBarProfile"

import goBackImg from '../images/goBack.png'


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
                    <div className="contentAdmin">
                        <button className="ButtonsAdmin1" onClick={goToAddGame}>Criar jogo</button>
                        <button className="ButtonsAdmin2" onClick={logout}>Logout</button>
                    </div>
                </div>
                
        </div>

    )

}