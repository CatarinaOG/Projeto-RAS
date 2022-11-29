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

  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
	const [dark,setDark] = useState('')

  const [balance,setBalance] = useState(0)

  const [games,setGames] = useState([])

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
    });

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
            dark={dark}
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
            dark={dark}
          />
        }/>

      </Routes>
  </BrowserRouter>
  )
}

export default App;
