import './styles/AddGame.css'
import './styles/AddExpert.css'
import './styles/home.css'
import './styles/Profile.css'
import './styles/Login.css'
import './styles/HomeAdmin.css'
import './styles/ShowExperts.css'
import './styles/SignIn.css'
import './styles/ProfileExpert.css'
import './styles/ShowGamesExpert.css'
import './styles/ChangeGameExpert.css'

import './styles/LoginDark.css'
import './styles/ProfileDark.css'
import './styles/HomeDark.css'
import './styles/RecoverDark.css'


import {useState} from 'react'
import { useEffect } from 'react'
import {BrowserRouter,Routes,Route, useAsyncError} from "react-router-dom"

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
import ShowGamesExpert from './pages/ShowGamesExpert'
import ChangeGameExpert from './pages/ChangeGameExpert'





function App() {

  const [username,setUsername] = useState('expert')
  const [email,setEmail] = useState('')
  const [balance,setBalance] = useState(0)

	const [dark,setDark] = useState('Dark')

  const [games,setGames] = useState([])
  const [expertGame,setExpertGame] = useState('')


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
          <Recover dark={dark}></Recover>
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

        <Route path="/ShowGamesExpert" element={
          <ShowGamesExpert
            username={username}
            setExpertGame={setExpertGame}
            dark={dark}
          />
        }/>

        <Route path="/ChangeGameExpert" element={
          <ChangeGameExpert
            username={username}
            expertGame={expertGame}
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
