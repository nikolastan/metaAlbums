import {from, fromEvent, of, combineLatest, iif, zip, concat} from "rxjs";
import {map, debounceTime, filter, switchMap, take, mergeMap} from "rxjs/operators";
import {ajax} from "rxjs/ajax"
import {Builder} from "./builder.js";
import {Album} from "./album.js";

export class Functionality
{
    constructor(){
        this.builder = new Builder();

        var host = document.getElementById("subContent");
        this.builder.newAlbumForm(host);
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

    getAlbumsSortedByRating(number)
    {
        return from(
            fetch(`http://localhost:3000/albums/?_sort=rating&_order=desc&start=1&_end=${number}`)
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
        const searchObservable = fromEvent(search, "input").pipe(
            debounceTime(1000),
            map(ev => ev.target.value),
            filter(function(value){
                return value !== "";
            }),
            switchMap(string => this.getAlbumsByTitle(string))
        );

        searchObservable.subscribe(observerSearch);

        return searchObservable;
    }

    initiateTop10(observerTop10, submitObservable)
    {
        const onLoad = of("value");
        concat(onLoad, submitObservable).pipe(
            switchMap(value => this.getAlbumsSortedByRating(10))
        ).subscribe(observerTop10);
    }
    
    createObserverTop10()
    {
        var builder = this.builder;
        const observerTop10 = {
            next : function(value){
                var listOfAlbums = [];
                value.forEach(element => {
                    listOfAlbums.push(new Album(element.id, element.title, element.artist, element.year, element.rating, element.cover));
                });
                builder.updateTop10(listOfAlbums);
            }
        }

        return observerTop10;
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

    createObserverValidate()
    {
        const titleInp = document.getElementById("titleInp");
        const artistInp = document.getElementById("artistInp");
        const coverInp = document.getElementById("coverInp");
        const submitBtn = document.getElementById("submit");
        var builder = this.builder;
        const observerValidate = {
            next : function(value) {
                console.log(value);
                if(value[0] === 'valid')
                {
                    titleInp.style.backgroundColor = "green";
                    artistInp.style.backgroundColor = "green";
                }
                else
                {
                    titleInp.style.backgroundColor = "red";
                    artistInp.style.backgroundColor = "red";
                }
                if(value[1] === 'valid')
                    coverInp.style.backgroundColor = "green";
                else
                    coverInp.style.backgroundColor = "red"; 

                if(value[0] === 'valid' && value[1] === 'valid')
                    submitBtn.disabled = false;
                else
                    submitBtn.disabled = true;
            }
        }
        return observerValidate;
    }

    sendAlbumToServer(data)
    {
        let host = document.getElementById("numberOfAlbumsContainer");

        let album = {
            title : data[0],
            artist : data[1],
            year : data[2],
            rating : data[3],
            tags : data[4],
            cover : data[5]
         };

        const $request = ajax
         ({
            url : "http://localhost:3000/albums",
            method: "POST",
            headers: 
            {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(album)
        });
        $request.subscribe();

        let numberObservable = this.getNumberOfAlbums();
        numberObservable.subscribe(value => this.builder.updateNumberOfAlbums(value, host));
        let top10Observable = this.getAlbumsSortedByRating(10);
        top10Observable.subscribe(value => {
                var listOfAlbums = [];
                value.forEach(element => {
                listOfAlbums.push(new Album(element.id, element.title, element.artist, element.year, element.rating, element.cover));
            });
            this.builder.updateTop10(listOfAlbums);
        });
    }

    createObserverSubmit()
    {
        var worker = this;
        var builder = this.builder;
        const observerSubmit = {
            next : function(value){
                worker.sendAlbumToServer(value);
                builder.resetForm();
            }
        }

        return observerSubmit;
    }

    initiateForm(observerValidate, observerSubmit)
    {
        const titleInp = document.getElementById("titleInp");
        const artistInp = document.getElementById("artistInp");
        const yearInp = document.getElementById("yearInp");
        const ratingInp = document.getElementById("ratingInp");
        const tagsInp = document.getElementById("tagsInp");
        const coverInp = document.getElementById("coverInp");
        const submitBtn = document.getElementById("submit");

        submitBtn.disabled = true;

        function getAlbumBy(criteria, value){
            return from(
                fetch(`http://localhost:3000/albums?${criteria}=${value}`)
                .then(response => response.json())
            );
        }

        const titleGetInput = fromEvent(titleInp, "input").pipe(
            debounceTime(1000),
            map(ev => ev.target.value),
        );
        const artistGetInput = fromEvent(artistInp, "input").pipe(
            debounceTime(1000),
            map(ev => ev.target.value),
        );

        const valid = of('valid');
        const invalid = of('invalid')

        const titleArtistValidate = combineLatest(titleGetInput, artistGetInput).pipe(
            switchMap(array => {
                if(array[0].length === 0 || array[1].length ===0)
                    return of(new Array(2));
                else
                    return getAlbumBy(`title=${array[0]}&artist`, array[1]);
            }),
            mergeMap(result => iif(() => result.length === 0, valid, invalid))
        );

        const coverValidate = fromEvent(coverInp, "input").pipe(
            debounceTime(1000),
            map(ev => ev.target.value),
            switchMap(value => {
                if(value === "")
                    return of(new Array(2));
                else
                    return getAlbumBy("cover", value);
            }),
            mergeMap(result => iif(() => result.length === 0, valid, invalid))
        );
        
        combineLatest(titleArtistValidate, coverValidate).subscribe(observerValidate);
        
        const submitObservable = fromEvent(submitBtn, 'click').pipe(
            switchMap(event => zip(of(titleInp.value), of(artistInp.value), of(yearInp.value), of(ratingInp.value), of(tagsInp.value), of(coverInp.value)))
        );

        submitObservable.subscribe(observerSubmit);
        
        return submitObservable;
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

    initiateNumberOfAlbums(observerNumber, submitObservable)
    {
        const onLoad = of("value");
        concat(onLoad, submitObservable).pipe(
            switchMap(value => this.getNumberOfAlbums())
        ).subscribe(observerNumber);
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
        var host = document.getElementById("numberOfAlbumsContainer");
        const observerNumber = {
            next : function(value){
                builder.updateNumberOfAlbums(value, host)
            }
        }
        return observerNumber;
    }
}