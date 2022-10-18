import '../styles/reportBet.css'

import close from '../images/close.png'

export default function ReportBet(props){

    const {game,bet,quote,type} = props

    console.log(type)

    function removeBet() {

        console.log('Para completar: remove bet')

    }

    return(

        <div>
            <div className='top'>
                <p className='game'>{game}</p>
                <img className='close' onClick={removeBet} src={close}/>
            </div>

            <div className='bottom'>
                <p className='bet'>{bet}</p>
                <p className='quote'>Cota: {quote}</p>
                {type === 'simple' && <input className='amount' type='number' placeholder='Valor'></input>}
            </div>



        </div>

    )


}