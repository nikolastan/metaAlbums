import {
    from,
} from "rxjs";
import {
    map,
} from "rxjs/operators";
import {
    ajax
} from "rxjs/ajax"
import {
    Album
} from "./models/album.js";
import {
    Builder
} from "./builder.js";

export default class ServerFunctions {

    constructor() {
        this.Builder = new Builder();
    }

    getAlbumsByTitle(searchString) {
        return from(
            fetch(`http://localhost:3000/albums?title_like=${searchString}`)
            .then(response => response.json())
        );
    }

    getAlbumById(id) {
        return from(
            fetch(`http://localhost:3000/albums/${id}`)
            .then(response => response.json())
        );
    }

    getAlbumsSortedByRating(number) {
        return from(
            fetch(`http://localhost:3000/albums/?_sort=rating&_order=desc&start=1&_end=${number}`)
            .then(response => response.json())
        );
    }

    sendAlbumToServer(data) {
        let host = document.getElementById("numberOfAlbumsContainer");

        let album = {
            title: data[0],
            artist: data[1],
            year: data[2],
            rating: data[3],
            tags: data[4],
            cover: data[5]
        };

        const $request = ajax({
            url: "http://localhost:3000/albums",
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(album)
        });
        $request.subscribe();

        let numberObservable = this.getNumberOfAlbums();
        numberObservable.subscribe(value => this.Builder.updateNumberOfAlbums(value, host));
        let top10Observable = this.getAlbumsSortedByRating(10);
        top10Observable.subscribe(value => {
            var listOfAlbums = [];
            value.forEach(element => {
                listOfAlbums.push(new Album(element.id, element.title, element.artist, element.year, element.rating, element.cover));
            });
            this.Builder.updateTop10(listOfAlbums);
        });
    }

    getNumberOfAlbums() {
        var numberOfAlbums = from(
            fetch(`http://localhost:3000/albums`)
            .then(response => response.json())
        ).pipe(
            map(value => value.length)
        )

        return numberOfAlbums;
    }
}