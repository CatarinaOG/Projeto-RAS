import { useState } from "react";

export default function PlaceBet(props){

    const {gains,setModalConfirmation,selected,error,setError,type,amountMultiple,dark} = props;

    function bet() {

        var varError = 0

        if(type === 'simple'){
            selected.map( betSelected => {
                console.log(betSelected.amount)
                if(Number(betSelected.amount) === 0 || betSelected === '' )
                    varError = 1
            } )

            if(varError === 1)
                setError(1)
            else
                setError(0)
        }
        else{
            if(amountMultiple === 0 || amountMultiple === '')
                setError(2)
            else
                setError(0)
        }

        setModalConfirmation(true)
    }

    return(

        <div className={`placeBet${dark}`}>
            {error == 1 && <p className="errorPlaceBet">Apostas sem valor selecionado</p>}
            {error == 2 && <p className="errorPlaceBet">Insira valor da aposta múltipla</p>}

            <div className={`leftSide${dark}`}>
                <h3>Total de Ganhos:</h3>
                <p>{gains.toFixed(2)} $</p>
            </div>
            <div>
                <button className='betButton' onClick={bet} >Apostar</button>
            </div>

        </div>

    )

}