
export default function SimpleInput(props){

    const {quote,setValueMultiple} = props

    function changeValueMultiple(event){

        setValueMultiple(event.target.value)

    }

    return(
        <div className='simpleInput'>
            <p className="quote2">Cota: {quote.toFixed(2)}</p>
            <input className='amount2' type='number' placeholder='Valor' onChange={changeValueMultiple}></input>
        </div>
    )
}