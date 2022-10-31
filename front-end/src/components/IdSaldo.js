import '../styles/Profile.css'

export default function IdSaldo(props){

    const {username} = props


    function getBalance(){
        // get balance from username
        return 0
    }

    return(
        <div className="ftsquareDiv">
            <div className='ftuserDiv'>
                <h1 className='ftusername'>{username}</h1>
            </div>
            <div className='ftvalDiv'>
                <h3 className='ftval'>Saldo: {getBalance()}$</h3>
            </div>
        </div>
    )
}