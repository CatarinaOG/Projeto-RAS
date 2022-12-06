import '../styles/Profile.css'

export default function IdSaldo(props){

    const {username,balance,dark} = props

    return(
        <div className="ftsquareDiv">
            <div className='ftuserDiv'>
                <h1 className={`ftusername${dark}`}>{username}</h1>
            </div>
            <div className='ftvalDiv'>
                <h3 className={`ftval${dark}`}>Saldo: {balance.toFixed(2)}$</h3>
            </div>
        </div>
    )
}