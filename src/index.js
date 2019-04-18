import {from, fromEvent} from "rxjs";
import {map, debounceTime, filter, switchMap} from "rxjs/operators";

const search = document.getElementById("search");
const listOfAlbums = [];

const observer = {
    next : function(value){
        //updateTable(value);
        console.log(value);
    },
    error : function(error){
        //displayOops();
        console.log(error);
    }
}

function getAlbum(id){
    return from(
        fetch(`http://localhost:3000/albums/${id}`)
        .then(response => {
            if(response.status === 404){
                return fetch(`http://localhost:3000/albums`)
                .then(response => response.json());
            }
            else
                return response.json();
        })
    );
}

/*function getAlbum(id){
    return from(
        fetch(`http://localhost:3000/albums/${id}`)
        .then(response => response.json())
    );
}*/

fromEvent(search, "input").pipe(
    debounceTime(1000),
    map(ev => ev.target.value),
    switchMap(id => getAlbum(id))
).subscribe(observer);