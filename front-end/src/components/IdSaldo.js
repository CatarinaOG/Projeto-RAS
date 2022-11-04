import '../styles/Profile.css'

export default function IdSaldo(props){

    const {username,balance} = props


    

    return(
        <div className="ftsquareDiv">
            <div className='ftuserDiv'>
                <h1 className='ftusername'>{username}</h1>
            </div>
            <div className='ftvalDiv'>
                <h3 className='ftval'>Saldo: {balance}$</h3>
            </div>
        </div>
    )
}