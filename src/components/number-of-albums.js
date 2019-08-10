import {
    of ,
    concat
} from "rxjs";
import {
    switchMap,
} from "rxjs/operators";
import ServerFunctions from "../server-functions";
import {
    Builder
} from "../builder";

export class NumberOfAlbums {
    constructor() {
        this.Builder = new Builder();
        this.ServerFunctions = new ServerFunctions();
    }

    initiateNumberOfAlbums(observerNumber, submitObservable) {
        const onLoad = of ("value");
        concat(onLoad, submitObservable).pipe(
            switchMap(() => this.ServerFunctions.getNumberOfAlbums())
        ).subscribe(observerNumber);
    }

    createObserverNumber() {
        var builder = this.Builder;
        var host = document.getElementById("numberOfAlbumsContainer");
        const observerNumber = {
            next: function (value) {
                builder.updateNumberOfAlbums(value, host)
            }
        }
        return observerNumber;
    }
}