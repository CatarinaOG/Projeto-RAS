
import closeImg from '../images/close.png'
import '../styles/AddGame.css'
import { useNavigate } from 'react-router-dom';

// PopUp que é mostrado com a informação do jogo que se acabou de adicionar

export default function PopUpAddGame(props){

    const {setConfirmed, sportPop,participantAPop,participantBPop,oddAPop,oddBPop,oddTiePop,date,time,eventName,dark} = props;

    const navigate = useNavigate()

    // altera a variável responsável pela renderização deste popup de forma a que este desapareça
    function close(){
        setConfirmed(false);
        navigate('/ProfileExpert', { replace: true })

    }


    return(
        <div className={`ftboxConfirmAddGame${dark}`}>
            {sportPop != 'motoGP' &&
            <div>
                <h1 className={`fth1Pop${dark}`} >Evento adicionado com sucesso!</h1>
                <h3 className={`fth3PopSport${dark}`} >Desporto : {sportPop}</h3>
                <h3 className={`fth3PopGamePartA${dark}`}>Participante A : {participantAPop}</h3>
                <h3 className={`fth3PopGamePartB${dark}`}>Participante B : {participantBPop}</h3>
                <h3 className={`fth3PopGameOdds${dark}`}>Odds :        A {'->'} {oddAPop}        B {'->'} {oddBPop}        Tie {'->'} {oddTiePop} </h3>
                <h3 className={`fth3PopGameDate${dark}`}>Data: {date}</h3>
                <h3 className={`fth3PopGameTime${dark}`}>Hora: {time}</h3>

                <img src={closeImg} className='close' onClick={close}/>

            </div>
            }
            {sportPop == 'motoGP' && 
            <div>
            <h1 className={`fth1Pop${dark}`}>Evento adicionado com sucesso!</h1>
            <h3 className={`fth3PopSport${dark}`}>Desporto : {sportPop}</h3>
            <h3 className={`fth3PopGamePartA${dark}`}>Nome do Evento : {eventName}</h3>
            <h3 className={`fth3PopGameDate${dark}`}>Data: {date}</h3>
            <h3 className={`fth3PopGameTime${dark}`}>Hora: {time}</h3>

            <img src={closeImg} className='close' onClick={close}/>

        </div>
            
            }
        </div>
    )
}

