

export default function Link({search,setSearching,highlight}){


    function changeSearching(){

        setSearching(search)

    }

    return(

        <h3 
            className={highlight ? 'searchItemHighlighted' : 'searchItem'}
            onClick={changeSearching}>{search}
        </h3>


    )
}