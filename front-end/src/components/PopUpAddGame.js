
import closeImg from '../images/close.png'


export default function PopUp(props){

    const {setConfirmed} = props;

    // talvez utilizar o set Balance e balance em vez deste use state local pq precisa de ser global
    // vamos precisar do balance tb para efeitos de comparação para ver se o levantar é valido

    function close(){
        setConfirmed(false);
    }

    return(
        <div className="ftboxConfirm">
            <div>
                <h1 className='fth1Pop'>Jogo adicionado com sucesso!</h1>
                <img src={closeImg} className='ftclosePop' onClick={close}/>
            </div>
        </div>
    )
}

