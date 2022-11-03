import './styles/App.css';
import './styles/AddGame.css';
import './styles/AddExpert.css';
import './styles/home.css';
import './styles/Profile.css';
import './styles/login.css';
import './styles/HomeAdmin.css'


import {useState} from 'react';
import { useEffect } from 'react';

import Home from './pages/Home';
import Profile from './pages/Profile.js'
import HomeAdmin from './pages/HomeAdmin';
import Login from './pages/Login.js';
import HomeExpert from './pages/HomeExpert';
import AddExpert from './pages/AddExpert.js'
import AddGame from './pages/AddGame.js'
import ProfileExpert from './pages/ProfileExpert'



function App() {

  const [rendered,setRender] = useState("Login");

  const [username,setUsername] = useState('catarina')
  const [balance,setBalance] = useState(0)

  const [games,setGames] = useState([])

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

  return (
    <div>
      {rendered==="Login" && 
        <Login 
          setUsername={setUsername}
          setBalance={setBalance}
          setRender={setRender}
      />}
      {rendered==="Home" && 
        <Home
          username={username}
          games={games}
          setRender={setRender}
        />
      }
      {rendered==="Profile" && 
        <Profile 
          username={username}
          setUsername={setUsername}
          setBalance={setBalance}
          setRender = {setRender}
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
        />
      } 
      {rendered==="ProfileExpert" &&
        <ProfileExpert 
          username={username}
          setRender={setRender}
        />
      }

    </div>
	);
}

export default App;
