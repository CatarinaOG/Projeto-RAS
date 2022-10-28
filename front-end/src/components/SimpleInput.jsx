
export default function SimpleInput(props){

    const {quote} = props

    return(
        <div className='simpleInput'>
            <p className="quote2">Cota: {quote}</p>
            <input className='amount2' placeholder='Valor'></input>
        </div>
    )
}