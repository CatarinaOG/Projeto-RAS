import closeImg from '../images/close.png'


export default function PopUp(props){

    const {email,password,setConfirmed} = props;

    // talvez utilizar o set Balance e balance em vez deste use state local pq precisa de ser global
    // vamos precisar do balance tb para efeitos de comparação para ver se o levantar é valido


    function close(){
        setConfirmed(false);
    }

    return(
        <div className="ftboxConfirmAdmin">
            <div>
                <h1 className='fth1Pop'>Especialista adicionado com sucesso!</h1>
                <h2 className='fth2PopAdmin' >Dados adicionados:</h2>
                <h3 className='fth3PopAdminEmail'>Email : {email}</h3>
                <h3 className='fth3PopAdminPass'>Password : {password}</h3>
                <img src = {closeImg} className='close' onClick={close}/>
            </div>
        </div>
    )
}

