import './styles/AddGame.css'
import './styles/AddExpert.css'
import './styles/home.css'
import './styles/Profile.css'
import './styles/login.css'
import './styles/HomeAdmin.css'

import {useState} from 'react'
import { useEffect } from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"

import Home from './pages/Home'
import Profile from './pages/Profile'
import HomeAdmin from './pages/HomeAdmin'
import Login from './pages/Login'
import HomeExpert from './pages/HomeExpert'
import AddExpert from './pages/AddExpert'
import AddGame from './pages/AddGame'
import ProfileExpert from './pages/ProfileExpert'
import RegisterPage from './pages/RegisterPage'



function App() {

  const [username,setUsername] = useState('user')
  const [email,setEmail] = useState('email')

  const [balance,setBalance] = useState(0)

  const [games,setGames] = useState([
    {date: "2022-11-09 17:12:00.0",
    sport: "futebol",
    home:"benfica",
    away:"porto",
    active: false,
    id:2,
    results:[
      {result:"benfica", id:3, ammount:0, odd:1},
      {result:"porto", id:4, ammount:0, odd:3},
      {result:"Empate", id:5, ammount:0, odd:2}],},

    {date:"2022-11-29 18:16:00.0",
    sport: "futebol",
    home:"sporting",
    away:"benfica",
    active: true,
    id:6,
    results:[
      {result:"sporting", id:7, ammount:0, odd:23},
      {result:"benfica\\", id:8, ammount:0, odd:8},
      {result:"Empate", id:9, ammount:0, odd:8}]
    }
  ])

  



  //--------------- Get Games -----------------

  useEffect(() => {
    /*
    fetch('http://127.0.0.1:8080/api/games/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
    })
    .then(response => response.json())
    .then(data => {
        if(data.games){
          setGames(data.games)
        }
    })
    .catch((error) => {
      console.error('Error:', error);
    });*/
        
  },[])

  //-----------------------------------------

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Login 
            setUsername={setUsername}
            setBalance={setBalance}
            setEmail={setEmail}
            balance={balance}
          />
        } />

        <Route path="/Register" element={
          <RegisterPage/>

        }/>

        <Route path="/Home" element={
          <Home
            username={username}
            email={email}
            games={games}
            setBalance={setBalance}
          />
        } />

        <Route path="/Profile" element={
          <Profile 
            username={username}
            setUsername={setUsername}
            setBalance={setBalance}
            balance={balance}
            email={email}
          />
        } />

        <Route path="/HomeExpert" element={
          <HomeExpert 
            username={username}
            games={games}
            setGames={setGames}
          />
        } />

        <Route path="/AddExpert" element={
          <AddExpert 
            username={username}
          />
        } />

        <Route path="/HomeAdmin" element={
          <HomeAdmin 
            username={username}
          />
        } />

        <Route path="/AddGame" element={
          <AddGame 
            username={username}
            email={email}
          />
        } />

        <Route path="/ProfileExpert" element={
          <ProfileExpert 
            username={username}
          />
        } />

      </Routes>
  </BrowserRouter>
  )
}

export default App;
