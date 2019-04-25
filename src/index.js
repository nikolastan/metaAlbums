import {Functionality} from "./functionality.js";

const worker = new Functionality();

const observerSearch = worker.createObserverSearch();
const observerNumber = worker.createObserverNumber();
const observerRandomAlbum = worker.createObserverRandomAlbum();
const observerValidate = worker.createObserverValidate();
const observerSubmit = worker.createObserverSubmit();
const observerTop10 = worker.createObserverTop10();

const submitObservable = worker.initiateForm(observerValidate, observerSubmit);
worker.initiateSearch(observerSearch);
worker.initiateNumberOfAlbums(observerNumber, submitObservable);
worker.initiateRandomAlbum(observerRandomAlbum);
worker.initiateTop10(observerTop10, submitObservable);