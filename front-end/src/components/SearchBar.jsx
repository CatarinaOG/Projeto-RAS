import { useState } from "react"

export default function SearchBar({dark,setSearch,setText}){

    function changeText(event){

        setText(event.target.value)

        fetch('http://127.0.0.1:8080/api/games/filtered', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({filter: event.target.value})
        })
        .then(response => response.json())
        .then(data => {
            setSearch(data.games)
        })
        .catch((error) => {
        console.error('Error:', error);
        });

    }

    return(
        <div>
            <form>
                <input type="text"  className={`searchBar${dark}`} onChange={changeText}></input>
            </form>
        </div>
    )

}