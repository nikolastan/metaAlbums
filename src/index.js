import {Functionality} from "./functionality.js";

const worker = new Functionality();

const observerSearch = worker.createObserverSearch();
const observerNumber = worker.createObserverNumber();
const observerRandomAlbum = worker.createObserverRandomAlbum();
worker.initiateSearch(observerSearch);
worker.initiateNumberOfAlbums(observerNumber);
worker.initiateRandomAlbum(observerRandomAlbum);