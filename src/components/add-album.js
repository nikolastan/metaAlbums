import {
    from,
    fromEvent,
    of ,
    combineLatest,
    iif,
    zip,
} from "rxjs";
import {
    map,
    debounceTime,
    switchMap,
    mergeMap
} from "rxjs/operators";
import {
    Builder
} from "../builder";
import ServerFunctions from "../server-functions";

export class AddAlbum {

    constructor() {
        this.Builder = new Builder();
        this.ServerFunctions = new ServerFunctions();
    }

    createObserverValidate() {
        const titleInp = document.getElementById("titleInp");
        const artistInp = document.getElementById("artistInp");
        const coverInp = document.getElementById("coverInp");
        const submitBtn = document.getElementById("submit");
        var builder = this.Builder;
        const observerValidate = {
            next: function (value) {
                console.log(value);
                if (value[0] === 'valid') {
                    titleInp.style.backgroundColor = "green";
                    artistInp.style.backgroundColor = "green";
                } else {
                    titleInp.style.backgroundColor = "red";
                    artistInp.style.backgroundColor = "red";
                }
                if (value[1] === 'valid')
                    coverInp.style.backgroundColor = "green";
                else
                    coverInp.style.backgroundColor = "red";

                if (value[0] === 'valid' && value[1] === 'valid')
                    submitBtn.disabled = false;
                else
                    submitBtn.disabled = true;
            }
        }
        return observerValidate;
    }

    createObserverSubmit() {
        var worker = this.ServerFunctions;
        var builder = this.Builder;
        const observerSubmit = {
            next: function (value) {
                worker.sendAlbumToServer(value);
                builder.resetForm();
            }
        }

        return observerSubmit;
    }

    initiateForm(observerValidate, observerSubmit) {
        const titleInp = document.getElementById("titleInp");
        const artistInp = document.getElementById("artistInp");
        const yearInp = document.getElementById("yearInp");
        const ratingInp = document.getElementById("ratingInp");
        const tagsInp = document.getElementById("tagsInp");
        const coverInp = document.getElementById("coverInp");
        const submitBtn = document.getElementById("submit");

        submitBtn.disabled = true;

        function getAlbumBy(criteria, value) {
            return from(
                fetch(`http://localhost:3000/albums?${criteria}=${value}`)
                .then(response => response.json())
            );
        }

        const titleGetInput = fromEvent(titleInp, "change").pipe(
            debounceTime(1000),
            map(ev => ev.target.value),
        );
        const artistGetInput = fromEvent(artistInp, "change").pipe(
            debounceTime(1000),
            map(ev => ev.target.value),
        );

        const valid = of ('valid');
        const invalid = of ('invalid')

        const titleArtistValidate = combineLatest(titleGetInput, artistGetInput).pipe(
            switchMap(array => {
                if (array[0].length === 0 || array[1].length === 0)
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
                if (value === "")
                    return of(new Array(2));
                else
                    return getAlbumBy("cover", value);
            }),
            mergeMap(result => iif(() => result.length === 0, valid, invalid))
        );

        combineLatest(titleArtistValidate, coverValidate).subscribe(observerValidate);

        const submitObservable = fromEvent(submitBtn, 'click').pipe(
            switchMap(event => zip( of (titleInp.value), of (artistInp.value), of (yearInp.value), of (ratingInp.value), of (tagsInp.value), of (coverInp.value)))
        );

        submitObservable.subscribe(observerSubmit);

        return submitObservable;
    }
}