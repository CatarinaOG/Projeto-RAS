import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

import NavBarProfile from "../components/NavBarProfile"

import goBackImg from '../images/goBack.png'
import remove from '../images/remove.png'

export default function ShowExperts(props){

    const {username,dark} = props

    let navigate = useNavigate()
    
    const [experts,setExperts] = useState([])

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



    const showExperts = experts.map( ({id,user,email,password}) => {

        function handleRemove(){

          fetch('http://127.0.0.1:8080/api/admin/removeExpert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id : id })
          })
          .then(response => response.json())
          .then(data => {
            if(data.state === 'good')

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
          })
          .catch((error) => {
            console.error('Error:', error);
          });

        }

        return(
            <tr>
                <img src={remove} alt="" onClick={handleRemove}/>
                <td width="400">{user}</td>
                <td width="700">{email}</td>
                <td width="200">{password}</td>
            </tr>
        )

    } )



    function goBack(){
        navigate('/ShowGamesExpert', { replace: true })
    }


    return(
        <div>
            <NavBarProfile
                username={username}
                dark={dark}
            />
            <div className='ftwhiteShadow'>
                <img src = {goBackImg} className='goBackImg' onClick={goBack}/>
                <h1 className = "ftAddSp">Finalizar Jogo</h1>
            </div>
        </div>
    )
}