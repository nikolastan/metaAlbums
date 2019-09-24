import {
    AddAlbum,
    Search,
    Random,
    Top10,
    NumberOfAlbums
} from "./components/components";
import {
    Builder
} from "./builder"
import "core-js/stable";
import "regenerator-runtime/runtime";

const builder = new Builder();

var host = document.getElementById("subContent");
builder.newAlbumForm(host);
builder.newAlbumHandlers();

const addAlbum = new AddAlbum();
const numberOfAlbums = new NumberOfAlbums();
const random = new Random();
const top10 = new Top10();
const search = new Search();

const observerSearch = search.createObserverSearch();
const observerNumber = numberOfAlbums.createObserverNumber();
const observerRandomAlbum = random.createObserverRandomAlbum();
const observerValidate = addAlbum.createObserverValidate();
const observerSubmit = addAlbum.createObserverSubmit();
const observerTop10 = top10.createObserverTop10();

const submitObservable = addAlbum.initiateForm(observerValidate, observerSubmit);
search.initiateSearch(observerSearch);
numberOfAlbums.initiateNumberOfAlbums(observerNumber, submitObservable);
random.initiateRandomAlbum(observerRandomAlbum);
top10.initiateTop10(observerTop10, submitObservable);