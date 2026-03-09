import { getDataAPI } from "./api.js";
const moviesContainer = document.getElementById('moviesContainer')

getDataAPI('discover/movie',1)