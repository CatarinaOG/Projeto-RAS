

export default function Link({search,setFilter,highlight,dark}){

    
    function getInPortugues(){
        switch (search) {
            case 'all': return "Todos"
            case 'football': return "Futebol"
            case 'basketball': return "Basquetebol"
            case 'motoGP': return "MotoGP"
            case 'tenis': return "Tenis"
        }
    }

    function changeSearching(){

        setFilter(search)

    }

    return(

        <h3 
            className={highlight ? `searchItemHighlighted${dark}` : `searchItem${dark}`}
            onClick={changeSearching}>{getInPortugues()}
        </h3>

    )
}