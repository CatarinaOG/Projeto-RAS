import './styles/App.css';
import './styles/AddGame.css';
import './styles/AddExpert.css';
import './styles/home.css';
import './styles/Profile.css';
import './styles/login.css';
import './styles/HomeAdmin.css'


import {useState} from 'react';

import Home from './pages/Home';
import Profile from './pages/Profile.js'
import HomeAdmin from './pages/HomeAdmin';
import Login from './pages/Login.js';
import HomeExpert from './pages/HomeExpert';
import AddExpert from './pages/AddExpert.js'
import AddGame from './pages/AddGame.js'



function App() {

  const [rendered,setRender] = useState("Login");

  const [username,setUsername] = useState('catarina')
  const [balance,setBalance] = useState(0)

  const [games,setGames] = useState(
      [{
        id : 0,
        home: 'sporting',
        away: 'varzim',
        date: 'hoje 22:00',
        active: false,
        results: [
            { id: 0, result : 'Sporting' , odd: 'null', amount: 0},
            { id: 1, result : 'Empate' , odd: 0.2, amount: 0},
            { id: 2, result : 'Varzim' , odd: 0.3, amount: 0},
        ]
    },
    {
        id : 1,
        home: 'sporting',
        away: 'varzim',
        date: 'hoje 22:00',
        active: true,
        results: [
            { id: 3, result : 'Sporting' , odd: 0.4, amount: 0},
            { id: 4, result : 'Empate' , odd: 0.5, amount: 0},
            { id: 5, result : 'Varzim' , odd: 0.6, amount: 0},
        ]
    }]
  )


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
    </div>
	);
}

export default App;
