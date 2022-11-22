import { useState } from "react";
import goBack from "../images/goBack.png"
import BetHistoryBox from './BetHistoryBox'

export default function BetHistory(props){

    const {setDivChoice} = props

    const [typeData, setTypeData] = useState('Bet');

    const [multipleState,setMultipleState] = useState('inactive');
    const [simpleState,setSimpleState] = useState("inactive");

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


    const list = [
        {
          id: 1
        },
        {
          id: 2
        },
        {
            id: 2
          },
          {
            id: 2
          },
      ];
      
      const List = () => (
        <ul>
          {list.map(item => {
            return (
                 <BetHistoryBox></BetHistoryBox>
                
            );
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
           <button className={ simpleState ==='inactive' ? "ftsimpleBet" : "ftsimpleBetSelected"} onClick={changeSimpleState}>Simples</button>
           <button className={ multipleState ==='inactive' ? "ftmultipleBet" : "ftmultipleBetSelected"} onClick={changeMultState}>Múltiplas</button>
           <img onClick={goToData} src = {goBack} className="ftgoBack"/>
           <button  className='ftChangeToTransact' onClick={changeToTransact} > {'>'} </button>
        </div>
        <div className="betHistoryDiv">
              <List></List>
        </div>
        </div>
      }
       {typeData === 'Transact' &&
       <div>
        <div className="buttonHistoryDiv">
          <img onClick={goToDataToBet} src = {goBack} className="ftgoBack"/>
        </div>
        <div className="tableDiv">
            <table width="700">
                <tr>
                    <td>
                        <table width="700">
                            <tr>
                                <th width="400">Data</th>
                                <th width="500">Descrição</th>
                                <th width="200">Operação</th>
                                <th width="200">Saldo Após Transação</th>

                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className="allowOverflow">
                            <table width="700" >
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
                        </div>
                    </td>
                </tr>
            </table>

        </div> 
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