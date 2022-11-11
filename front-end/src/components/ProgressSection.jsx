

export default function ProgressSection(props){

    const {type,total,green,yellow,red} = props



    return(
        <div className="progressSection">
            <div className="progressTitle">
                <h1>{type}</h1>   
                <h3>Total: {total}</h3> 
            </div>
            <div className="progressBoxes">
                <h3 className="rightProgressBoxGreen">{green}</h3>
                <h3 className="rightProgressBoxYellow">{yellow}</h3>
                <h3 className="rightProgressBoxRed">{red}</h3>
            </div>
        </div>
    )

}