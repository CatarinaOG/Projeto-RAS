import '../styles/AddSpecialist.css'
import {useState} from 'react';



export default function PopUp(props){

    const {showPopUp, setShowPopUp,setBalance} = props;

    // talvez utilizar o set Balance e balance em vez deste use state local pq precisa de ser global
    const [formData, setFormData] = useState(
        {Valor: 0}
    )
    
    function handleChange(event) {
        setFormData(prevFormData => {
            console.log(event.target.value)
            return {
                ...prevFormData,
                [event.target.name] : event.target.value
            }
        })
    }

    function cancel(){
        setShowPopUp('');
    }

    function handleSubmit(event){
        event.preventDefault();

        // tratar de verificar verificação de levantar/depositar e alterar com 'setBalance'


    }

    return(
        <div className="ftboxConfirm">
            <div>
                {showPopUp === 'withdraw' && <h1 className='fth1Pop'>Levantar</h1>}
                {showPopUp === 'deposit' && <h1 className='fth1Pop'>Depositar</h1>}

                <button className="ftclosePop" onClick={cancel}>x</button>
                <h3 className='fth3Pop'>Escolha a quantia que quer depositar</h3>
                <form onSubmit={handleSubmit}>
                    <input className = 'ftinputNum'type ="number" onChange={handleChange} name="Valor" value = {formData.Valor}></input>
                    <input type = "button" className = 'ftbuttonPaypal'></input>
                    <input type = "button" className = 'ftbuttonMaestro'></input>
                </form>
                <h3 className='ftselectWay'>Selecione a forma de transferência</h3>
            </div>
        </div>

    )

    /*
    if(!confirmated){
        return(
	    <div className="ftboxConfirm">
            <div>
                <h1 className='fth1Pop'>Especialista adicionado com sucesso!</h1>
                <h2 className='fth2Pop' >Dados adicionados:</h2>
                <button className="ftclosePop" onClick={cancel}>x</button>
            </div>
        </div>
        )
    }*/

}