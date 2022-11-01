import {useState} from 'react';
import App from '../App';
import '../styles/AddExpert.css';



export default function PopUp(props){

    const {email,password,setConfirmed} = props;

    // talvez utilizar o set Balance e balance em vez deste use state local pq precisa de ser global
    // vamos precisar do balance tb para efeitos de comparação para ver se o levantar é valido


    function cancel(){
        setConfirmed(false);
    }

    return(
        <div className="ftboxConfirm">
            <div>
                <h1 className='fth1Pop'>Especialista adicionado com sucesso!</h1>
                <h2 className='fth2PopAdmin' >Dados adicionados:</h2>
                <h3 className='fth3PopAdminEmail'>Email : {email}</h3>
                <h3 className='fth3PopAdminPass'>Password : {password}</h3>
                <button className="ftclosePop" onClick={cancel}>x</button>
            </div>
        </div>
    )
}

