import { useState } from "react";
import goBack from "../images/goBack.png"
import BetHistoryBox from './BetHistoryBox'
import { useEffect } from 'react'
import TableTransact from "./TableTransact";

export default function BetHistory(props){

    const {setDivChoice, betHist,email,dark,amount,winnings} = props

    const [typeData, setTypeData] = useState('Bet');

    const [multipleState,setMultipleState] = useState('inactive');
    const [simpleState,setSimpleState] = useState("inactive");
    const [transactHist,setTransactHist] = useState([])

    //comportamento do botão para voltar para tras
    function goToData(){
        setDivChoice("Data");
    }
    function goToDataToBet(){
        setTypeData("Bet")
    }

    function changeSimpleState(){
        setMultipleState('inactive');
        setSimpleState('active');
    }

    function changeMultState(){
      setMultipleState('active');
      setSimpleState('inactive');
    }

  useEffect(() => {
    
    fetch('http://127.0.0.1:8080/api/users/transaction_history',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: email})
        })
    .then(response => response.json())
    .then(data => {
        if(data.transactions){
            setTransactHist(data.transactions)
        }
    })
    .catch((error) => {
      console.error('Error:', error);
    })
    
    
    

    
  },[])  



const fullbetHist = () => (
  <ul>
    {betHist.map(item => {
      
      if(multipleState==="active" && item.bet.length>1){
        return (
          <BetHistoryBox bet={item.bet} ammount={item.amount} winnings ={item.winnings} dark={dark}></BetHistoryBox>
        );
      }
      else if (simpleState === "active" && item.bet.length===1){
        
        return (
          <BetHistoryBox bet={item.bet} ammount={item.amount} winnings ={item.winnings} dark={dark}></BetHistoryBox>
      
        );
      }
      
    })}
  </ul>)



    function changeToTransact(){
      setMultipleState('inactive')
      setSimpleState('inactive')
      setTypeData("Transact")
    }

    return(
      <div className="ftDivBetHist">
        { typeData === 'Bet' &&
        <div>
          <div className="buttonHistoryDiv">
            <button className={ simpleState ==='inactive' ? `ftsimpleBet${dark}` : "ftsimpleBetSelected"} onClick={changeSimpleState}>Simples</button>
            <button className={ multipleState ==='inactive' ? `ftmultipleBet${dark}` : "ftmultipleBetSelected"} onClick={changeMultState}>Múltiplas</button>
            <img onClick={goToData} src = {goBack} className={`ftgoBack${dark}`} alt =""/>
            <h4 className={`ftTotalGains${dark}`}>Gastos Totais/Ganhos totais:   {amount} / {winnings}</h4>
            <button  className='ftChangeToTransact' onClick={changeToTransact} > {'>'} </button>
          </div>
          {simpleState === 'active'  &&
            <div className="betHistoryDiv">
                  {fullbetHist()}
            </div>
          }
          {multipleState === 'active'  &&
            <div className="betHistoryDiv">
                  {fullbetHist()}
            </div>
          }

        </div>
      }
       {typeData === 'Transact' &&
       <div>
        <div className="buttonHistoryDiv">
          <img onClick={goToDataToBet} src = {goBack} className={`ftgoBack${dark}`} alt=""/>
        </div>
        <TableTransact data={transactHist} dark={dark}></TableTransact>
       </div>
       }   
      </div>
    )
}