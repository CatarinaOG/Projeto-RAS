import {Route , Routes, BrowserRouter} from "react-router-dom"


import './styles/App.css';
import LogSquare from './pages/LogSquare.js';
import Profile from './pages/Profile.js'
import AddSpecialist from './pages/AddSpecialist.js'
import {useState} from 'react';
import AddGame from './pages/AddGame';

function App() {

  const [rendered,setRender] = useState("");

  return (
    <div >
      {rendered==="" &&<LogSquare rendered = {rendered} setRender={setRender}></LogSquare>}
      {rendered==="Profile" && <Profile rendered = {rendered} setRender = {setRender}></Profile>}
      {rendered==="AddSpecialist" && <AddSpecialist/>}
    </div>

	);
}

export default App;
