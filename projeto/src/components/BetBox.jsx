
export default function BetBox(props){

    const {id,result,odd,selected,changeSelected} = props

    function changeSelectedResults(){

        changeSelected(id)

    }

    return(

        <div className={ selected ? "resultBoxSelected" : "resultBoxNotSelected"} onClick={changeSelectedResults}>
            <h3>{result}</h3>
            <p>{odd}</p>
        </div>
    )
}