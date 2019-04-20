import {from, fromEvent} from "rxjs";
import {map, debounceTime, filter, switchMap} from "rxjs/operators";
import {Builder} from "./builder.js";
import {Album} from "./album.js";


const builder = new Builder();
const search = document.getElementById("search");

const observer = {
    next : function(value){
        let listOfAlbums = [];
        if(Array.isArray(value))
            value.forEach(element => {
                listOfAlbums.push(new Album(element.id, element.title, element.artist, element.year, element.rating, element.cover));
            });
        else
            listOfAlbums.push(new Album(value.id, value.title, value.artist, value.year, value.rating, value.cover))
        builder.drawTable(listOfAlbums);
        //updateTable(value);
        console.log(listOfAlbums);
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