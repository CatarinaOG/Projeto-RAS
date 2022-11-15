import goBack from "../images/goBack.png"
import BetHistoryBox from './BetHistoryBox'

export default function BetHistory(props){

    const {setDivChoice} = props

    //comportamento do botão para voltar para tras
    function goToData(){
        setDivChoice("Data");
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

    return(
      <div>
        <div className="buttonHistoryDiv">
           <button className='ftsimpleBet'>Simples</button>
           <button className='ftmultipleBet'>Múltiplas</button>
           <img onClick={goToData} src = {goBack} className="ftgoBack"/>
        </div>
        <div className="betHistoryDiv">
              <List></List>
        </div>
        </div>
    )
}