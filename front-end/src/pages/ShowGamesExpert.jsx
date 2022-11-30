import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

import NavBarProfile from "../components/NavBarProfile"

import goBackImg from '../images/goBack.png'
import podio from '../images/podio.png'

export default function ShowExperts(props){

    const {username,dark} = props

    let navigate = useNavigate()
    
    const [experts,setExperts] = useState([])
    const [games,setGames] = useState([

      {
        id: 1,
        sport: "futebol",
        home: "sporting",
        away: "benfica",
      }

    ])

    useEffect(() => {
      
      fetch('http://127.0.0.1:8080/api/admin/getExperts', {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json',
                  }
      })
      .then(response => response.json())
      .then(data => {
        setExperts(data)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      
    },[])

    function getInEnglish(type){
      switch (type) {
          case "futebol": return 'football'
          case "basquetebol": return 'basketball'
          case "motoGP": return 'motoGP'
          case "tenis": return 'tenis'
      }
    }
    

    const allGames = games.map( game => {

      function handleEnd(){
        console.log("seee game with id:",game.id)
      }

      if(getInEnglish(game.sport) === 'MotoGP'){
        return(
          <tr>
              <td width="100"><img src={podio} alt="" onClick={handleEnd}/></td>
              <td width="400">{game.name}</td>
          </tr>
        )
      }
      else{
        return(
          <tr>
              <img src={podio} alt="" onClick={handleEnd}/>
              <td width="400">{game.home} vs {game.away}</td>
          </tr>
        )
      }
      }
    )

    function goBack(){
        navigate('/ProfileExpert', { replace: true })
    }


    return(
        <div>
            <NavBarProfile 
                username={username}
                dark={dark}
            />
            <div className='ftwhiteShadow'>
                <img src = {goBackImg} className='goBackImg' onClick={goBack}/>
                <h1 className = "ftAddSp">Consultar Eventos Criados</h1>
                <div className="tableSpace">
                    <table width="700">
                        <tr>
                            <td>
                                <table width="700">
                                    <tr>
                                        <th width="400">Evento</th>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="allowOverflow">
                                    <table width="700" >
                                        {allGames}
                                    </table>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    )
}