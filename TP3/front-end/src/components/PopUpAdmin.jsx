import closeImg from '../images/close.png'

import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { myContext } from '../context';

//PopUp que surge quando é adicionado um especialista, com os dados do mesmo
export default function PopUpAdmin(props){

    const {email,password,username} = props
    const {dark} = useContext(myContext)

	let navigate = useNavigate();


    // altera a variável responsável pela renderização deste popup de forma a que este desapareça
    function close(){
        navigate('/HomeAdmin', { replace: true })
    }

    return(
        <div className={`ftboxConfirmAdmin${dark}`}>
            <div>
                <h1 className={`fth1Pop${dark}`}>Especialista adicionado com sucesso!</h1>
                <h2 className={`fth2PopAdmin${dark}`}>Dados adicionados:</h2>
                <h3 className={`fth3PopAdminUsername${dark}`}>Username : {username}</h3>
                <h3 className={`fth3PopAdminEmail${dark}`}>Email : {email}</h3>
                <h3 className={`fth3PopAdminPass${dark}`}>Password : {password}</h3>
                <img src = {closeImg} className='close' onClick={close}/>
            </div>
        </div>
    )
}

