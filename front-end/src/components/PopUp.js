import '../styles/AddSpecialist.css'
import {useState} from 'react';



export default function PopUp(props){

    const {val, setVal,confirmation,setConfirmed} = props;

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
        setVal(0);
        setConfirmed(0);
    }

    function handleSubmit(event){
        event.preventDefault();
    }

    if(confirmation === 1){
        return(
	        <div className="ftboxConfirm">
                <div>
                    {val === 1 && <h1 className='fth1Pop'>Levantar</h1>}
                    {val === 2 && <h1 className='fth1Pop'>Depositar</h1>}

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
    }
    if(confirmation===0){
        return(
	    <div className="ftboxConfirm">
            <div>
                <h1 className='fth1Pop'>Especialista adicionado com sucesso!</h1>
                <h2 className='fth2Pop' >Dados adicionados:</h2>
                <button className="ftclosePop" onClick={cancel}>x</button>
            </div>
        </div>
        )
    }

}