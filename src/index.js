import {Functionality} from "./functionality.js";

const worker = new Functionality();

const observerSearch = worker.createObserverSearch();
worker.initiateSearch(observerSearch);