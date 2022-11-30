import { useState } from "react";
import goBack from "../images/goBack.png"
import BetHistoryBox from './BetHistoryBox'
import { useEffect } from 'react'
import TableTransact from "./TableTransact";

export default function BetHistory(props){

    const {setDivChoice, betHist,email,dark} = props

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

  const betHistory = [ 
      {
          bet : [
              {
                  type : "team", 
                  name : "Sporting vs Varzim",
                  winner : "Sporting"
              }
          ]
          ,
          ammount : 18123,
          winnings : 1233
      }
      ,
      {
        bet : [
            {
                type : "team", 
                name : "Sporting vs Varzim",
                winner : "Sporting"
            },
            {
              type : "team", 
              name : "Benfica vs Porto",
              winner : "Benfica"
            }
        ]
        ,
        ammount : 18123,
        winnings : 1233
    }
  ]

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
    {betHistory.map(item => {
      console.log("TOU")
      console.log("Length is: ", item.bet.length)
      console.log("Multi state is:",multipleState)
      console.log("Simple state is:",simpleState)

      if(multipleState==="active" && item.bet.length>1){

        console.log("ENTREI AQUI")
        return (
          <BetHistoryBox bet={item.bet} ammount={item.ammount} winnings ={item.winnings} dark={dark}></BetHistoryBox>
         
        );
      }
      else if (simpleState === "active" && item.bet.length==1){
        console.log("ENTREI ACOLÁ")
        
        return (
          <BetHistoryBox bet={item.bet} ammount={item.ammount} winnings ={item.winnings} dark={dark}></BetHistoryBox>
      
        );
      }
      
    })}
  </ul>)





    const data = [
      { date: "18/11/22", description: "Levantamento", operation: "+13,45" , balance : 20},
      { date: "18/11/22", description: "Depósito", operation: "+13,45" , balance : 32},
      { date: "18/11/22", description: "Ganho de aposta", operation: "+13,45", balance : 50 },
      { date: "18/11/22", description: "Ganho de aposta", operation: "+13,45", balance : 50 },
      { date: "18/11/22", description: "Ganho de aposta", operation: "+13,45", balance : 50 },
      { date: "18/11/22", description: "Ganho de aposta", operation: "+13,45", balance : 50 },
      { date: "18/11/22", description: "Ganho de aposta", operation: "+13,45", balance : 50 },
      { date: "18/11/22", description: "Ganho de aposta", operation: "+13,45", balance : 50 },
      { date: "18/11/22", description: "Ganho de aposta", operation: "+13,45", balance : 50 },
      { date: "18/11/22", description: "Ganho de aposta", operation: "+13,45", balance : 50 },
      { date: "18/11/22", description: "Ganho de aposta", operation: "+13,45", balance : 50 },
      { date: "18/11/22", description: "Ganho de aposta", operation: "+13,45", balance : 50 },
      { date: "18/11/22", description: "Ganho de aposta", operation: "+13,45", balance : 50 },
      { date: "18/11/22", description: "Aposta feita", operation: "+13,45", balance : 50 }
    ]
      

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
            <img onClick={goToData} src = {goBack} className={`ftgoBack${dark}`}/>
            <h4 className={`ftTotalGains${dark}`}>Gastos Totais/ Ganhos totais:</h4>
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
          <img onClick={goToDataToBet} src = {goBack} className={`ftgoBack${dark}`}/>
        </div>
        <TableTransact data={transactHist} dark={dark}></TableTransact>
       </div>
       }   
      </div>
    )
}

/*
<table class="ftTable">
              <tr className="fttablehead">
                <th>Data</th>
                <th>Descrição</th>
                <th>Operação</th>
                <th>Saldo Após Transação</th>
              </tr>
            
            {data.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.date}</td>
                  <td>{val.description}</td>
                  <td>{val.operation}</td>
                  <td>{val.balance}</td>
                </tr>
              )
            })}
          </table>
*/