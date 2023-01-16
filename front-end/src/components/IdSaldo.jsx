import '../styles/Profile.css'

export default function IdSaldo(props){

    const {username,balance,dark} = props

    const saldo = balance



    return(
        <div className="ftsquareDiv">
            <div className='ftuserDiv'>
                <h1 className={`ftusername${dark}`}>{username}</h1>
            </div>
            <div className='ftvalDiv'>
                <h3 className={`ftval${dark}`}>Saldo: {saldo}$</h3>
            </div>
        </div>
    )
}