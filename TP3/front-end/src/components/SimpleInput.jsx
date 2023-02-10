import { useContext } from "react"
import { myContext } from "../context"

export default function SimpleInput(props){

    const {quote,setAmountMultiple} = props
    const {dark} = useContext(myContext)

    // Altera o valor apostado na aposta múltipla
    function changeValueMultiple(event){

        setAmountMultiple(event.target.value)

    }

    return(
        <div className={`simpleInput${dark}`}>
            <p className="quote2">Cota: {quote.toFixed(2)}</p>
            <input className='amount2' type='number' placeholder='Valor' onChange={changeValueMultiple}></input>
        </div>
    )
}