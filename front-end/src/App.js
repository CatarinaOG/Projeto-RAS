import './styles/AddGame.css'
import './styles/AddExpert.css'
import './styles/home.css'
import './styles/Profile.css'
import './styles/Login.css'
import './styles/HomeAdmin.css'
import './styles/ShowExperts.css'
import './styles/SignIn.css'

import './styles/LoginDark.css'
import './styles/ProfileDark.css'
import './styles/HomeDark.css'


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
import Register from './pages/Register'
import ShowExperts from './pages/ShowExperts'
import Recover from './pages/Recover'




function App() {

  const [username,setUsername] = useState('user')
  const [email,setEmail] = useState('email')
	const [dark,setDark] = useState('Dark')

  const [balance,setBalance] = useState(0)

  const [games,setGames] = useState([
    {date: "2022-11-09 17:12:00.0",
    sport: "futebol",
    home:"benfica",
    away:"porto",
    active: false,
    id:2,
    results:[
      {result:"benfica", id:1, ammount:0, odd:1},
      {result:"porto", id:2, ammount:0, odd:3},
      {result:"Empate", id:3, ammount:0, odd:2}],},

    {date:"2022-11-29 18:16:00.0",
    sport:"futebol",
    home:"sporting",
    away:"benfica",
    active: true,
    id:6,
    results:[
      {result:"sporting", id:4, ammount:0, odd:23},
      {result:"benfica", id:5, ammount:0, odd:8},
      {result:"Empate", id:6, ammount:0, odd:8}]
    },

    {date:"2022-11-29 18:16:00.0",
    sport: "basquetebol",
    home:"lakers",
    away:"warriors",
    active: true,
    id:7,
    results:[
      {result:"lakers", id:7, ammount:0, odd:23},
      {result:"warriors", id:8, ammount:0, odd:8},
      {result:"Empate", id:9, ammount:0, odd:8}]
    },

    {date:"2022-11-29 18:16:00.0",
    sport: "tenis",
    home:"Djokovic",
    away:"Federer",
    active: true,
    id:8,
    results:[
      {result:"Djokovic", id:10, ammount:0, odd:23},
      {result:"Federer", id:11, ammount:0, odd:8}]
    },

    {date:"2022-11-29 18:16:00.0",
    sport: "motoGP",
    name: "Finals",
    active: true,
    id:9,
    results:[
      {result:"Djokovic", id:12, ammount:0, odd:23},
      {result:"Djokovic", id:13, ammount:0, odd:23},
      {result:"Djokovic", id:14, ammount:0, odd:23},
      {result:"Djokovic", id:15, ammount:0, odd:23},
      {result:"Djokovic", id:16, ammount:0, odd:23},
      {result:"Djokovic", id:17, ammount:0, odd:23},
      {result:"Djokovic", id:18, ammount:0, odd:23},
      {result:"Djokovic", id:19, ammount:0, odd:23},
      {result:"Djokovic", id:20, ammount:0, odd:23},
      {result:"Djokovic", id:21, ammount:0, odd:23},
      {result:"Djokovic", id:22, ammount:0, odd:23},
      {result:"Djokovic", id:23, ammount:0, odd:23},
      {result:"Djokovic", id:24, ammount:0, odd:23},
      {result:"Djokovic", id:25, ammount:0, odd:23},
      {result:"Djokovic", id:26, ammount:0, odd:23},
      {result:"Djokovic", id:27, ammount:0, odd:23},
      {result:"Djokovic", id:28, ammount:0, odd:23},
      {result:"Djokovic", id:29, ammount:0, odd:23},
      {result:"Djokovic", id:30, ammount:0, odd:23},
      {result:"Djokovic", id:31, ammount:0, odd:23},
      {result:"Djokovic", id:32, ammount:0, odd:23},
      {result:"Federer", id:33, ammount:0, odd:8}]
    }
  ])

  /*
  {
    id: 1 ,
    username: 'catarina',
    email: 'catarina@catarina',
    password: 'catarina'
  },
  {
    id: 2 ,
    username: 'toldy',
    email: 'toldy@toldy',
    password: 'toldy'
  },
  {
    id: 3,
    username: 'castiço',
    email: 'castiço@castiço',
    password: 'castiço'
  },
  {
    id: 4,
    username: 'catarina',
    email: 'catarina@catarina',
    password: 'catarina'
  },
  {
    id:5 ,
    username: 'toldy',
    email: 'toldy@toldy',
    password: 'toldy'
  },
  {
    id: 6,
    username: 'castiço',
    email: 'castiço@castiço',
    password: 'castiço'
  },
  {
    id:7 ,
    username: 'catarina',
    email: 'catarina@catarina',
    password: 'catarina'
  },
  {
    id: 8,
    username: 'toldy',
    email: 'toldy@toldy',
    password: 'toldy'
  },
  {
    id: 9,
    username: 'castiço',
    email: 'castiço@castiço',
    password: 'castiço'
  },
  {
    id:10 ,
    username: 'catarina',
    email: 'catarina@catarina',
    password: 'catarina'
  },
  {
    id: 11,
    username: 'toldy',
    email: 'toldy@toldy',
    password: 'toldy'
  },
  {
    id: 12,
    username: 'castiço',
    email: 'castiço@castiço',
    password: 'castiço'
  }
])*/


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
            dark={dark}
          />
        } />

        <Route path="/Register" element={
          <Register
            dark={dark}
          />

        }/>

        <Route path="/Recover" element={
          <Recover></Recover>
        }/>

        <Route path="/Home" element={
          <Home
            username={username}
            email={email}
            games={games}
            setBalance={setBalance}
            dark={dark}
          />
        } />

        <Route path="/Profile" element={
          <Profile 
            username={username}
            setUsername={setUsername}
            setBalance={setBalance}
            balance={balance}
            email={email}
            dark={dark}
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
            dark={dark}
          />
        } />

        <Route path="/HomeAdmin" element={
          <HomeAdmin 
            username={username}
            dark={dark}
          />
        } />

        <Route path="/AddGame" element={
          <AddGame 
            username={username}
            email={email}
            dark={dark}
          />
        } />

        <Route path="/ShowExperts" element={
          <ShowExperts 
            username={username}
            dark={dark}
          />
        }/>

        <Route path="/ProfileExpert" element={
          <ProfileExpert 
            username={username}
          />
        }/>

      </Routes>
  </BrowserRouter>
  )
}

export default App;
