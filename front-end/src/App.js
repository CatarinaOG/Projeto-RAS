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
import Profile from './pages/Profile.js'
import HomeAdmin from './pages/HomeAdmin'
import Login from './pages/Login.js'
import HomeExpert from './pages/HomeExpert'
import AddExpert from './pages/AddExpert.js'
import AddGame from './pages/AddGame.js'
import ProfileExpert from './pages/ProfileExpert'
import RegisterPage from './pages/RegisterPage'
import ProfileSec from './pages/ProfileSec'



function App() {

  const [username,setUsername] = useState('user')
  const [email,setEmail] = useState('email')

  const [balance,setBalance] = useState(0)

  const [games,setGames] = useState([])


  //--------------- Get Games-----------------

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
        
  },[games])

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

        <Route path="/ProfileSec" element={
          <ProfileSec 
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
