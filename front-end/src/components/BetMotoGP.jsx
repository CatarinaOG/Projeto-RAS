import { useState } from 'react'

import BetBoxMotoGP from './BetBoxMotoGP'

import star from '../images/favorite.png'
import yellowstar from '../images/star.png'

export default function BetMotoGP(props){

    const {id,sport,name,date,following,results} = props.game
    const setSelected = props.setSelected
    const selected = props.selected
    const dark = props.dark
    const email = props.email


    // Adicionar bet a lista de selecionadas
    function changeSelected(sport,id,gameId){

        var amount = 0

        if (!selected.find(bet => bet.id === id))
            setSelected( prevSelected => [...prevSelected,{sport,id,gameId,amount}])
        
    }

    // Verificar se está selecionada
    function getIfSelected(id){ 

        return (selected.find(bet => bet.id === id)) ? true : false
    }

    //ativar com a back-end
    function changeFollowing(){

        const send = {
            email: email,
            id_game: String(id)
        }

        fetch('http://127.0.0.1:8080/api/users/follow_game/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(send)
        })
        .then(response => response.json())
        .then(data => {
            if(data.confirmed == 'true'){

                props.getGames()

            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        
    }

    // Criação das caixas de resultado
    const resultsBoxes = results.map( ({id,result,odd}) => 
        <BetBoxMotoGP
            key={id}
            sport={sport}
            id={id}
            gameId={props.game.id}
            result={result}
            odd={odd}
            selected={getIfSelected(id)}
            changeSelected={changeSelected}
            dark={dark}
        />
    )

    var notNull = true
    
    results.map( ({id,result,odd,amount}) =>{
        if(odd === 'null')
            notNull = false
    })

    if(notNull){
        return(
            <div className={`betMotoGP${dark}`}>
                <div className={`infoMotoGP${dark}`}>
                    <div>
                        <h3>{name}</h3>
                        <p>{date}</p>
                    </div>
                </div>
                <div className="resultsMotoGP">
                    {resultsBoxes}
                </div>
                <img src={ following == "true"? yellowstar : star} className='star' onClick={changeFollowing}/>
            </div>
        )
    }
    else{
        return(<div></div>)
    }

}