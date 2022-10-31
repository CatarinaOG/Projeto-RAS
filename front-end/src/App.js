import './styles/App.css';

import {useState} from 'react';

import Home from './pages/Home';
import Profile from './pages/Profile.js'
import AddGame from './pages/AddGame';
import Login from './pages/Login.js';
import HomeExpert from './pages/HomeExpert';
import AddSpecialist from './pages/AddSpecialist.js'



function App() {

  const [rendered,setRender] = useState("Login");

  const [userName,setUsername] = useState('carlos')

  return (
    <div>
      {rendered==="Login" && 
        <Login 
          setUsername={setUsername} 
          setRender={setRender}
      />}
      {rendered==="Home" && <Home setRender={setRender}/>}
      {rendered==="HomeExpert" && <HomeExpert setRender={setRender}/>}
      {rendered==="Profile" && <Profile setRender = {setRender}/>}
      {rendered==="AddExpert" && <AddSpecialist/>}
    </div>
	);
}

export default App;
