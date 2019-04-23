import {from, fromEvent} from "rxjs";
import {map, debounceTime, filter, switchMap} from "rxjs/operators";
import {Builder} from "./builder.js";
import {Album} from "./album.js";


export class Functionality
{
    constructor(){
        this.builder = new Builder();
    }

    getAlbums(searchString){
        return from(
            fetch(`http://localhost:3000/albums?title_like=${searchString}`)
            .then(response => response.json())
        );
    }

    createObserverSearch() {
        var builder = this.builder;
        const observerSearch = {
            next : function(value){
                var listOfAlbums = [];
                if(value.length === 0)
                    {
                        builder.noResults();
                        return
                    }
                if(Array.isArray(value))
                    value.forEach(element => {
                        listOfAlbums.push(new Album(element.id, element.title, element.artist, element.year, element.rating, element.cover));
                    });
                else
                    listOfAlbums.push(new Album(value.id, value.title, value.artist, value.year, value.rating, value.cover))
                builder.drawTable(listOfAlbums);
            },
            error : function(error){
                //displayOops();
                console.log(error);
            }
        }
            return observerSearch;
    }

    initiateSearch(observerSearch){
        const search = document.getElementById("search");

        fromEvent(search, "input").pipe(
        debounceTime(1000),
        map(ev => ev.target.value),
        filter(function(value){
            return value !== "";
        }),
        switchMap(string => this.getAlbums(string))
    ).subscribe(observerSearch);
    }
}