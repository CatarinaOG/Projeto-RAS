
export default function SearchBar({dark}){

    return(
        <div>
            <form>
                <input type="text"  className={`searchBar${dark}`}></input>
            </form>
        </div>
    )

}