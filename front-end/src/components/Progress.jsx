

export default function Progress(props){

    

    return(
        <div className="progress">
            <h1 className="title">Progresso</h1>
            <div className="displaySections">
                <div className="progressSection">
                    <div className="progressTitle">
                        <h1>Futebol</h1>   
                        <h3>Total: 4</h3> 
                    </div>
                    <div className="progressBoxes">
                        <h3 className="rightProgressBoxGreen">1</h3>
                        <h3 className="rightProgressBoxYellow">2</h3>
                        <h3 className="rightProgressBoxRed">3</h3>
                    </div>
                </div>
            </div>
        </div>
    )

}