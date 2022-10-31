import './styles/App.css';

import {useState} from 'react';

import Home from './pages/Home';
import Profile from './pages/Profile.js'
import AddGame from './pages/AddGame';
import Login from './pages/Login.js';
import HomeExpert from './pages/HomeExpert';
import AddExpert from './pages/AddExpert.js'



function App() {

  const [rendered,setRender] = useState("Login");

  const [username,setUsername] = useState('carlos')
  const [balance,setBalance] = useState(0)


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
      {rendered==="HomeExpert" && <HomeExpert setRender={setRender}/>}
      
      {rendered==="AddExpert" && <AddExpert />}
    </div>
	);
}

export default App;
