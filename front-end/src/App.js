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

import './styles/FollowPage.css'
import './styles/FollowPageDark.css'



import {useState,useEffect} from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import {CookiesProvider} from 'react-cookie'
import {Cookies} from 'react-cookie'

import { myContext } from './context'

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

  const cookies = new Cookies()

  const [balance,setBalance] = useState()
  const [email,setEmail] = useState(cookies.get("email"))
  const [username,setUsername] = useState(cookies.get("username"))
  const [typeUser,setTypeUser] = useState(cookies.get("typeuser"))

	const [dark,setDark] = useState('')

  const [games,setGames] = useState([])
  const [expertGame,setExpertGame] = useState('')


  //--------------- Get Games -----------------

  useEffect(() => {

    if (window.matchMedia('(prefers-color-scheme: dark)').matches){
      setDark('Dark')
    }
      
  },[])

  function switchDark(){
		dark === 'Dark'? setDark('') : setDark('Dark')
  }


  //-----------------------------------------

  return(
    <myContext.Provider value={ {username,dark} }>
      <CookiesProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={
                <Login
                  setUsername={setUsername}
                  setEmail={setEmail}
                  setTypeUser={setTypeUser}
                  setBalance={setBalance}
                  switchDark={switchDark}
                />
              } />

              <Route path="/Register" element={
                <Register />
              }/>

              <Route path="/Recover" element={
                <Recover />
              }/>
              
              { typeUser === 'better' &&
                <Route path="/Home" element={
                  <Home
                    email={email}
                    setBalance={setBalance}
                    setGames={setGames}
                  />
                } />
              }

              { typeUser === 'better' &&

                <Route path="/Profile" element={
                  <Profile
                    setUsername={setUsername}
                    setBalance={setBalance}
                    balance={balance}
                    email={email}
                  />
                } />
              }
              
              { typeUser === 'better' &&

                <Route path="/FollowPage" element={
                  <FollowPage
                    games= {games}
                  />
                } />
              }
        
              { typeUser === 'expert' &&
                <Route path="/HomeExpert" element={
                  <HomeExpert
                    setGames={setGames}
                  />
                } />
              }

              { typeUser === 'admin' &&
                <Route path="/AddExpert" element={
                  <AddExpert />
                } />
              }

              { typeUser === 'admin' &&
                <Route path="/HomeAdmin" element={
                  <HomeAdmin />
                } />
              }

              { typeUser === 'expert' &&
                <Route path="/AddGame" element={
                  <AddGame
                    email={email}
                    setGames={setGames}
                  />
                } />
              }

              { typeUser === 'admin' &&
                <Route path="/ShowExperts" element={
                  <ShowExperts />
                }/>
              }

              { typeUser === 'expert' &&
                <Route path="/ShowGamesExpert" element={
                  <ShowGamesExpert
                    setExpertGame={setExpertGame}
                  />
                }/>
              }

              { typeUser === 'expert' &&
                <Route path="/ChangeGameExpert" element={
                  <ChangeGameExpert
                    expertGame={expertGame}
                    setExpertGame={setExpertGame}
                    setGames={setGames}
                  />
                }/>
              }

              { typeUser === 'expert' &&
                <Route path="/ProfileExpert" element={
                  <ProfileExpert />
                }/>
              }

              <Route
                path="*"
                element={<Error />}
              />
            </Routes>
        </BrowserRouter>
    </CookiesProvider>
  </myContext.Provider>

  )
}

export default App;
