import close from '../images/close.png'

export default function ReportBet(props){

    const {id,game,bet,type,setSelected} = props
    const {home,away,date,results} = game


    function removeBet() {

        setSelected( prevSelected => prevSelected.filter( s => s.id !== id))

    }

    return(

        <div>
            <div className='top'>
                <p className='game'>{home} vs {away}</p>
                <img className='close' onClick={removeBet} src={close}/>
            </div>

            <div className='bottom'>
                <p className='reportBet'>Aposta: {bet.result}</p>
                <p className='quote'>Cota: {bet.odd}</p>
                {type === 'simple' && <input className='amount' type='number' placeholder='Valor'></input>}
            </div>



        </div>

    )


}