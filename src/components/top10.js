import {
    of ,
    merge
} from "rxjs";
import {
    switchMap,
} from "rxjs/operators";
import {
    Album
} from "../models/album.js";
import {
    Builder
} from "../builder.js";
import ServerFunctions from "../server-functions.js";

export class Top10 {

    constructor() {
        this.Builder = new Builder();
        this.ServerFunctions = new ServerFunctions();
    }
    initiateTop10(observerTop10, submitObservable) {
        const onLoad = of ("value");
        merge(onLoad, submitObservable).pipe(
            switchMap(() => this.ServerFunctions.getAlbumsSortedByRating(10))
        ).subscribe(observerTop10);
    }

    createObserverTop10() {
        var builder = new Builder();
        const observerTop10 = {
            next: function (value) {
                var listOfAlbums = [];
                value.forEach(element => {
                    listOfAlbums.push(new Album(element.id, element.title, element.artist, element.year, element.rating, element.cover));
                });
                builder.updateTop10(listOfAlbums);
            }
        }

        return observerTop10;
    }
}