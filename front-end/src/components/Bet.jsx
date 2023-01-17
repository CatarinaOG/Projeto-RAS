import { useContext } from 'react'

import BetBox from './BetBox'


import star from '../images/favorite.png'
import yellowstar from '../images/star.png'
import whitestar from '../images/whitestar.jpg'
import { myContext } from '../context'

export default function Bet(props){

    const {id,sport,home,away,date,following,results} = props.game
    const setSelected = props.setSelected
    const selected = props.selected
    const email = props.email
    const {dark} = useContext(myContext)


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

        if(following == "false"){

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
        else{

            fetch('http://127.0.0.1:8080/api/users/unfollow_game/', {
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
        
    }



    // Criação das caixas de resultado
    const resultsBoxes = results.map( ({id,result,odd}) => 
        <BetBox
            key={id}
            sport={sport}
            id={id}
            gameId={props.game.id}
            result={result}
            odd={odd}
            selected={getIfSelected(id)}
            changeSelected={changeSelected}
        />
    )


    function getStar(){
        
        if(following == 'true')
            return yellowstar
        else if (following == 'false' && dark == "Dark")
            return whitestar
        else
            return star

    }

    var notNull = true
    
    results.map( ({id,result,odd,amount}) =>{
        if(odd === 'null')
            notNull = false
    })

    

    if(notNull){
        return(
            <div className={`bet${dark}`}>
                <div className={`info${dark}`}>
                    <div>
                        <h3>{home} vs {away}</h3>
                        <p>{date}</p>
                    </div>
                </div>
                <div className="results">
                    {resultsBoxes}
                </div>
                <img src={ getStar() } className='star' onClick={changeFollowing}/>
            </div>
        )
    }
    else{
        return(<div></div>)
    }

}