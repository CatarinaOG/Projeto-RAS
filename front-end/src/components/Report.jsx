import { useState } from "react"

import ReportBet from './ReportBet'
import SimpleInput from './SimpleInput'
import PlaceBet from './PlaceBet'

export default function Report(){

    const [type,setType] = useState('simple')

    function changeSelected(event){

        if (event.target.id == 'simple') setType('simple')
        else setType('multiple')

    }

    return(

        <div className="main">
            <h1 className="title">Boletim</h1>
            <div className="buttons">
                <button id='simple' className={ type == 'simple' ? "typeSelected" : 'typeNotSelected'} onClick={changeSelected}>Simples</button>
                <button id='multiple' className={ type == 'multiple' ? "typeSelected" : 'typeNotSelected'} onClick={changeSelected}>Múltiplas</button>
            </div>
                
            <ReportBet 
                game='Sporting- Varzim' 
                bet='Vencedor: Sporting' 
                quote='1,19'
                type={type}
            />
            
            {type === 'multiple' && <SimpleInput quote='1,19'/>}
            <PlaceBet gains='2,30'/>


        </div>
    )
}