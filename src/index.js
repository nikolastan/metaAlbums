import {Functionality} from "./functionality.js";

const worker = new Functionality();

const observerSearch = worker.createObserverSearch();
const observerNumber = worker.createObserverNumber();
const observerRandomAlbum = worker.createObserverRandomAlbum();
const observerValidate = worker.createObserverValidate();
worker.initiateSearch(observerSearch);
worker.initiateNumberOfAlbums(observerNumber);
worker.initiateRandomAlbum(observerRandomAlbum);
worker.initiateForm(observerValidate);