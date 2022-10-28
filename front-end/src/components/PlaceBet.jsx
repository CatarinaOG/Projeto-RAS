
export default function PlaceBet(props){

    const {gains} = props;

    function bet() {
        console.log('apostar')
    }

    return(

        <div className='placeBet'>
            <div className='leftSide'>
                <h3>Total de Ganhos:</h3>
                <p>{gains} $</p>
            </div>
            <div>
                <button className='betButton' onClick={bet} >Apostar</button>
            </div>

        </div>

    )

}