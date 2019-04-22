import {from, fromEvent, of} from "rxjs";
import {map, debounceTime, filter, switchMap, catchError} from "rxjs/operators";
import {Builder} from "./builder.js";
import {Album} from "./album.js";


const builder = new Builder();
const search = document.getElementById("search");
var listOfAlbums = [];

const observerSearch = {
    next : function(value){
        listOfAlbums = [];
        if(value.length === 0)
            {
                console.log("No results!");
                builder.noResults();
                return
            }
        console.log(value);
        if(Array.isArray(value))
            value.forEach(element => {
                listOfAlbums.push(new Album(element.id, element.title, element.artist, element.year, element.rating, element.cover));
            });
        else
            listOfAlbums.push(new Album(value.id, value.title, value.artist, value.year, value.rating, value.cover))
        builder.drawTable(listOfAlbums);
        console.log(listOfAlbums);
    },
    error : function(error){
        //displayOops();
        console.log(error);
    }
}

function getAlbums(searchString){
    return from(
        fetch(`http://localhost:3000/albums?q=${searchString}`)
        .then(response => response.json())
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
    filter(function(value){
        return value !== "";
    }),
    switchMap(string => getAlbums(string))
).subscribe(observerSearch);
