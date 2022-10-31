import {Route , Routes, BrowserRouter} from "react-router-dom"


import './styles/App.css';
import LogSquare from './pages/LogSquare.js';
import Profile from './pages/Profile.js'
import AddSpecialist from './pages/AddSpecialist.js'
import {useState} from 'react';
import AddGame from './pages/AddGame';
import Home from './pages/Home';
import HomeExpert from './pages/HomeExpert';


function App() {

  const [rendered,setRender] = useState("LogIn");

  return (
    <div>
      {rendered==="LogIn" && <LogSquare setRender={setRender}/>}
      {rendered==="Home" && <Home setRender={setRender}/>}
      {rendered==="Profile" && <Profile setRender = {setRender}/>}
      {rendered==="AddExpert" && <AddSpecialist/>}
    </div>
	);
}

export default App;
