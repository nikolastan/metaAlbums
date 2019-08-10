import {
    from,
} from "rxjs";
import {
    switchMap,
    take
} from "rxjs/operators";
import {
    Album
} from "../models/album.js";
import {
    Builder
} from "../builder.js";
import ServerFunctions from "../server-functions.js";

export class Random {
    constructor() {
        this.Builder = new Builder();
        this.ServerFunctions = new ServerFunctions();
    }
    createObserverRandomAlbum() {
        var builder = this.Builder;
        const observerRandomAlbum = {
            next: function (value) {
                builder.updateRandomAlbum(new Album(value.id, value.title, value.artist, value.year, value.rating, value.cover))
            }
        }

        return observerRandomAlbum;
    }

    initiateRandomAlbum(observerRandomAlbum) {
        function* generator(min, max) {
            while (true) {
                yield Math.round(Math.random() * (max - min) + min);
            }
        }

        var ServerFunctions = this.ServerFunctions;

        function generateAlbum(currentNumber) {
            return from(generator(0, currentNumber)).pipe(
                take(1),
                switchMap(value => ServerFunctions.getAlbumById(value))
            )
        }

        this.ServerFunctions.getNumberOfAlbums().pipe(
            switchMap(number => generateAlbum(number - 1))
        ).subscribe(observerRandomAlbum);
    }
}