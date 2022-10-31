import '../styles/Profile.css'

export default function IdSaldo(props){

    const utilizador = props.userN;
    return(
        <div className="ftsquareDiv">
            <div className='ftuserDiv'>
                <h1 className='ftusername'>{utilizador}</h1>
            </div>
            <div className='ftvalDiv'>
                <h3 className='ftval'>Placeholder Value</h3>
            </div>
        </div>
    )
}