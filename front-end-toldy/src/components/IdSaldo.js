import '../styles/IdSaldo.css'

export default function IdSaldo(props){

    const utilizador = props.userN;
    return(
        <div className="squareDiv">
            <div className='userDiv'>
                <h1 className='username'>{utilizador}</h1>
            </div>
            <div className='valDiv'>
                <h3 className='val'>Placeholder Value</h3>
            </div>
        </div>
    )
}