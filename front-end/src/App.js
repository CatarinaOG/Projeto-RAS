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


  /*return (
    <div>
      {rendered==="Login" && 
        <Login 
          setUsername={setUsername}
          setBalance={setBalance}
          setRender={setRender}
          setEmail={setEmail}
          balance={balance}
      />}
      {rendered==="Home" && 
        <Home
          username={username}
          email={email}
          games={games}
          setBalance={setBalance}
          setRender={setRender}
        />
      }
      {rendered==="Profile" && 
        <Profile 
          username={username}
          setUsername={setUsername}
          setBalance={setBalance}
          setRender = {setRender}
          balance={balance}
          email={email}
      />}
      {rendered==="HomeExpert" && 
        <HomeExpert 
          username={username}
          games={games}
          setRender={setRender}
        />
      }
      {rendered==="AddExpert" &&
        <AddExpert 
          username={username}
          setRender={setRender}
        />
      }
      {rendered==="HomeAdmin" &&
        <HomeAdmin 
          username={username}
          setRender={setRender}
        />
      }
      {rendered==="AddGame" &&
        <AddGame 
          username={username}
          setRender={setRender}
          email={email}
        />
      } 
      {rendered==="ProfileExpert" &&
        <ProfileExpert 
          username={username}
          setRender={setRender}
          
        />
      }

    </div>
	)*/
}

export default App;
