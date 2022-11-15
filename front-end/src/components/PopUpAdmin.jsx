import closeImg from '../images/close.png'

//PopUp que surge quando é adicionado um especialista, com os dados do mesmo
export default function PopUp(props){

    const {email,password,username,setConfirmed} = props;

    // altera a variável responsável pela renderização deste popup de forma a que este desapareça
    function close(){
        setConfirmed(false);
    }

    return(
        <div className="ftboxConfirmAdmin">
            <div>
                <h1 className='fth1Pop'>Especialista adicionado com sucesso!</h1>
                <h2 className='fth2PopAdmin' >Dados adicionados:</h2>
                <h3 className='fth3PopAdminUsername'>Username : {username}</h3>
                <h3 className='fth3PopAdminEmail'>Email : {email}</h3>
                <h3 className='fth3PopAdminPass'>Password : {password}</h3>
                <img src = {closeImg} className='close' onClick={close}/>
            </div>
        </div>
    )
}

