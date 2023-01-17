import { useContext } from 'react'
import { myContext } from '../context'
import '../styles/Profile.css'

export default function IdSaldo(props){

    const {balance} = props
    const {dark,username} = useContext(myContext)

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