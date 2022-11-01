
import NavBarProfile from "../components/NavBarProfile"

import goBackImg from '../images/goBack.png'


export default function ProfileExpert(props){

    const {username,setRender} = props

    function goBack(){
        setRender('HomeExpert')
    }

    function goToAddGame(){
        setRender('AddGame')
    }

    function logout(){
        setRender('Login')
    }

    return(

        <div>
            <NavBarProfile username={username}/>
            <img src = {goBackImg} className='goBackImg2' onClick={goBack}/>
                <div className='whiteShadow'>
                    <div className="contentAdmin">
                        <button className="ButtonsAdmin1" onClick={goToAddGame}>Criar jogo</button>
                        <button className="ButtonsAdmin2" onClick={logout}>Logout</button>
                    </div>
                </div>
                
        </div>

    )

}