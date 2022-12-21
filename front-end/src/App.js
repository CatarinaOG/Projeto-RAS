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
import './styles/ProfileExpertDark.css'

import './styles/LoginDark.css'
import './styles/ProfileDark.css'
import './styles/HomeDark.css'
import './styles/AddExpertDark.css'
import './styles/AddGameDark.css'
import './styles/RecoverDark.css'
import './styles/ChangeGameExpertDark.css'


import "./i18n";
import { useTranslation } from "react-i18next";


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
import Error from './pages/Error'
import FollowPage from './pages/FollowPage'



function App() {
	const { t, i18n } = useTranslation();

  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [balance,setBalance] = useState()

  const [typeUser,setTypeUser] = useState('')

	const [dark,setDark] = useState('')

  const [games,setGames] = useState([])
  const [expertGame,setExpertGame] = useState('')


  //--------------- Get Games -----------------

  useEffect(() => {
      const interval = setInterval(() => {
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
            console.log("new games")
          }
      })
      .catch((error) => {
        console.error('Error:', error);
      });

      if (window.matchMedia('(prefers-color-scheme: dark)').matches){
        setDark('Dark')
      }
    }, 1000);
    
    return () => clearInterval(interval);
      
  },[])

  function switchDark(){
		dark === 'Dark'? setDark('') : setDark('Dark')
  }

  //-----------------------------------------

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Login
            t={t}
            i18n={i18n}
            setUsername={setUsername}
            setBalance={setBalance}
            setEmail={setEmail}
            setTypeUser={setTypeUser}
            dark={dark}
            switchDark={switchDark}
          />
        } />

        <Route path="/Register" element={
          <Register
            t={t}
            dark={dark}
          />
        }/>

        <Route path="/Recover" element={
          <Recover t={t} dark={dark}></Recover>
        }/>
        
        { typeUser === 'better' &&
          <Route path="/Home" element={
            <Home
              username={username}
              email={email}
              games={games}
              setBalance={setBalance}
              setGames={setGames}
              dark={dark}
            />
          } />
        }

        { typeUser === 'better' &&

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
        }

        { typeUser === 'better' &&

          <Route path="/FollowPage" element={
            <FollowPage
              username={username}
              games= {games}
              dark={dark}
            />
          } />
        }

        { typeUser === 'expert' &&
          <Route path="/HomeExpert" element={
            <HomeExpert
              username={username}
              games={games}
              setGames={setGames}
              dark={dark}
            />
          } />
        }

        { typeUser === 'admin' &&
          <Route path="/AddExpert" element={
            <AddExpert
              username={username}
              dark={dark}
            />
          } />
        }

        { typeUser === 'admin' &&
          <Route path="/HomeAdmin" element={
            <HomeAdmin
              username={username}
              dark={dark}
            />
          } />
        }

        { typeUser === 'expert' &&
          <Route path="/AddGame" element={
            <AddGame
              username={username}
              email={email}
              setGames={setGames}
              dark={dark}
            />
          } />
        }

        { typeUser === 'admin' &&
          <Route path="/ShowExperts" element={
            <ShowExperts
              username={username}
              dark={dark}
            />
          }/>
        }

        { typeUser === 'expert' &&
          <Route path="/ShowGamesExpert" element={
            <ShowGamesExpert
              username={username}
              setExpertGame={setExpertGame}
              dark={dark}
            />
          }/>
        }

        { typeUser === 'expert' &&
          <Route path="/ChangeGameExpert" element={
            <ChangeGameExpert
              username={username}
              expertGame={expertGame}
              setExpertGame={setExpertGame}
              setGames={setGames}
              dark={dark}
            />
          }/>
        }

        { typeUser === 'expert' &&
          <Route path="/ProfileExpert" element={
            <ProfileExpert
              username={username}
              dark={dark}
            />
          }/>
        }

        <Route
          path="*"
          element={<Error />}
        />
      

      </Routes>
  </BrowserRouter>
  )
}

export default App;
