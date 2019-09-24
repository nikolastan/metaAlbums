import {
    fromEvent,
} from "rxjs";
import {
    map,
    debounceTime,
    filter,
    switchMap,
} from "rxjs/operators";
import {
    Album
} from "../models/album.js";
import {
    Builder
} from "../builder.js";
import ServerFunctions from "../server-functions.js";

export class Search {

    constructor() {
        this.Builder = new Builder();
        this.ServerFunctions = new ServerFunctions();
    }
    createObserverSearch() {
        var builder = this.Builder;
        const observerSearch = {
            next: function (value) {
                var listOfAlbums = [];
                if (value.length === 0) {
                    builder.noResults(true);
                    return
                }
                if (Array.isArray(value))
                    value.forEach(element => {
                        listOfAlbums.push(new Album(element.id, element.title, element.artist, element.year, element.rating, element.cover));
                    });
                else
                    listOfAlbums.push(new Album(value.id, value.title, value.artist, value.year, value.rating, value.cover))
                builder.drawTable(listOfAlbums);
            },
            error: function (error) {
                console.log(error);
            }
        }
        return observerSearch;
    }

    initiateSearch(observerSearch) {
        const search = document.getElementById("search");
        const searchObservable = fromEvent(search, "input").pipe(
            debounceTime(1000),
            map(ev => ev.target.value),
            filter(function (value) {
                return value !== "";
            }),
            switchMap(string => this.ServerFunctions.getAlbumsByTitle(string))
        );

        searchObservable.subscribe(observerSearch);

        return searchObservable;
    }
}