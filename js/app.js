import { loadMovies } from "./movies.js";
import { loadSeries } from "./series.js";
import { loadActors } from "./actors.js";
import { loadActorInfo } from "./actor/actorinfo.js";
import { loadMovieInfo } from "./movie/movieinfo.js";
import { loadSerieInfo } from "./serie/serieinfo.js";

if(document.getElementById('moviesContainer')){
    loadMovies()
}

if(document.getElementById('seriesContainer')){
    loadSeries()
}

if(document.getElementById('actorsContainer')){
    loadActors()
}

if(document.getElementById('actorInfoContainer')){
    loadActorInfo()
}

if(document.getElementById('movieInfoContainer')){
    loadMovieInfo()
}

if(document.getElementById('serieInfoContainer')){
    loadSerieInfo()
}