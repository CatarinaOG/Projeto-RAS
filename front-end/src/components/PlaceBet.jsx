
export default function PlaceBet(props){

    const {gains,setModalConfirmation,dark} = props;

    function bet() {
        setModalConfirmation(true)
    }

    return(

        <div className={`placeBet${dark}`}>
            <div className={`leftSide${dark}`}>
                <h3>Total de Ganhos:</h3>
                <p>{gains.toFixed(2)} $</p>
            </div>
            <div>
                <button className='betButton' onClick={bet} >Apostar</button>
            </div>

        </div>

    )

}