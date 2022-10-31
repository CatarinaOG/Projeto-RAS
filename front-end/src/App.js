import {Route , Routes, BrowserRouter} from "react-router-dom"


import './styles/App.css';
import LogSquare from './pages/LogSquare.js';
import Profile from './pages/Profile.js'
import AddSpecialist from './pages/AddSpecialist.js'
import {useState} from 'react';
import AddGame from './pages/AddGame';
import Home from './pages/Home';
import HomeExpert from './pages/HomeExpert';

/*
<div >
      <AddGame></AddGame>
      {rendered==="a" &&<LogSquare rendered = {rendered} setRender={setRender}></LogSquare>}
      {rendered==="a" && <Profile rendered = {rendered} setRender = {setRender}></Profile>}
      {rendered==="a" && <AddSpecialist/>}
    </div>
*/ 

function App() {

  const [rendered,setRender] = useState("");

  return (
    <LogSquare />

	);
}

export default App;
