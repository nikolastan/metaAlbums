import {from, fromEvent, timer} from "rxjs";
import {map, debounceTime, filter, switchMap, take} from "rxjs/operators";
import {Builder} from "./builder.js";
import {Album} from "./album.js";


export class Functionality
{
    constructor(){
        this.builder = new Builder();
        this.builder.newAlbumHandlers();
    }

    getAlbumsByTitle(searchString){
        return from(
            fetch(`http://localhost:3000/albums?title_like=${searchString}`)
            .then(response => response.json())
        );
    }

    getAlbumById(id)
    {
        return from(
            fetch(`http://localhost:3000/albums/${id}`)
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
                        builder.noResults(true);
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
        switchMap(string => this.getAlbumsByTitle(string))
    ).subscribe(observerSearch);
    }

    createObserverRandomAlbum()
    {
        var builder = this.builder;
        const observerRandomAlbum = {
            next : function(value){
                builder.updateRandomAlbum(new Album(value.id, value.title, value.artist, value.year, value.rating, value.cover))
            }
        }

        return observerRandomAlbum;
    }

    initiateRandomAlbum(observerRandomAlbum)
    {
        function* generator(min, max){
            while (true) {
              yield Math.round(Math.random() * (max - min) + min);
            }
          }

        var builder = this;
        function generateAlbum(currentNumber) { 
            return from(generator(0, currentNumber)).pipe(
                take(1),
                switchMap(value => builder.getAlbumById(value))
            )
        }

        this.getNumberOfAlbums().pipe(
            switchMap(number => generateAlbum(number-1))
        ).subscribe(observerRandomAlbum);
    }

    initiateNumberOfAlbums(observerNumber)
    {
        var numberOfAlbums = timer(0, 5000).pipe(
            switchMap(value => this.getNumberOfAlbums())
        );
        numberOfAlbums.subscribe(observerNumber);
    }

    getNumberOfAlbums()
    {
        var numberOfAlbums = from(
            fetch(`http://localhost:3000/albums`)
            .then(response => response.json())
        ).pipe(
           map(value => value.length)
        )

        return numberOfAlbums;
    }

    createObserverNumber()
    {
        var builder = this.builder;
        const observerNumber = {
            next : function(value){
                builder.updateNumberOfAlbums(value);
            }, 
            complete : function() {
                console.log("Completed!");
            }
        }
        return observerNumber;
    }
}