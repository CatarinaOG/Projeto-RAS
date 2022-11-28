
import closeImg from '../images/close.png'
import '../styles/AddGame.css'
import { useState } from 'react'


// PopUp que é mostrado com a informação do jogo que se acabou de adicionar

export default function PopUpAddGame(props){

    const {setConfirmed, sportPop,participantAPop,participantBPop,oddAPop,oddBPop,oddTiePop,date,time,eventName} = props;

    // altera a variável responsável pela renderização deste popup de forma a que este desapareça
    function close(){
        setConfirmed(false);
    }


    return(
        <div className="ftboxConfirmAddGame">
            {sportPop != 'motoGP' &&
            <div>
                <h1 className='fth1Pop'>Evento adicionado com sucesso!</h1>
                <h3 className='fth3PopSport'>Desporto : {sportPop}</h3>
                <h3 className='fth3PopGamePartA'>Participante A : {participantAPop}</h3>
                <h3 className='fth3PopGamePartB'>Participante B : {participantBPop}</h3>
                <h3 className='fth3PopGameOdds'>Odds :        A {'->'} {oddAPop}        B {'->'} {oddBPop}        Tie {'->'} {oddTiePop} </h3>
                <h3 className='fth3PopGameDate'>Data: {date}</h3>
                <h3 className='fth3PopGameTime'>Hora: {time}</h3>

                <img src={closeImg} className='close' onClick={close}/>

            </div>
            }
            {sportPop == 'motoGP' && 
            <div>
            <h1 className='fth1Pop'>Evento adicionado com sucesso!</h1>
            <h3 className='fth3PopSport'>Desporto : {sportPop}</h3>
            <h3 className='fth3PopGamePartA'>Nome do Evento : {eventName}</h3>
            <h3 className='fth3PopGameDate'>Data: {date}</h3>
            <h3 className='fth3PopGameTime'>Hora: {time}</h3>

            <img src={closeImg} className='close' onClick={close}/>

        </div>
            
            }
        </div>
    )
}

