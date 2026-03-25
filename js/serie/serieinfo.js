import { getDataIndividualAPI } from "../api.js";

const serieInfoContainer = document.getElementById('serieInfoContainer')

export async function loadSerieInfo() {
    const parament=new URLSearchParams(window.location.search)
    const ID = parament.get('id')
    console.log(ID)
    
    serieInfoContainer.innerHTML = ""
    if (serieInfoContainer === '') {
        serieInfoContainer.innerHTML += `
        <h1>Loading...</h1>
        `
    }
    const data = await getDataIndividualAPI(`tv/${ID}`);

    const getDuration= `${data.episode_run_time} Min`

    const lastSeason=data.seasons[data.seasons.length-1]

    console.log(data)
    

    serieInfoContainer.innerHTML += `
        <img alt='Image Not Found' src="https://image.tmdb.org/t/p/w500${data.backdrop_path}">
        <img alt='Image Not Found' src="https://image.tmdb.org/t/p/w500${data.poster_path}">
        <h1>${data.name}</h1>
        <h2>Statys: ${data.status ?? 'Not Found'}</h2>

        <div>
            <h3>Created By</h3>
            ${data.created_by.map(element=>{
                return `
                <p>${element.name}</p>
                `
            }).join("")}
        </div>

        <div>
            <h3>Genres</h3>
            ${data.genres.map(element=>{
                return `
                <p>${element.name}</p>
                `
            }).join("")}
        </div>
        
        <div>
            <h4>Popularity: ${data.popularity ?? 'Not Found'}</h4>
            <div>
                <h4>Vote Average: ${data.vote_average ?? 'Not Found'}</h4>
                <h4>Vote Count: ${data.vote_count ?? 'Not Found'}</h4>
            </div>
        </div>
        
        <div>
            <h4>Seasons: ${lastSeason.season_number}</h4>
            <h4>Release Date: ${data.first_air_date?? 'Not Found'}</h4>
            <h4>Last Episode: ${data.last_episode_to_air.name ?? 'Not Found'}</h4>
            <h4>Episodes Duration: ${getDuration ?? 'Not Found'}</h4>
        </div>

        <h4>${data.overview ?? 'Not Found'}</h4>
        <p>${data.tagline ?? 'Not Found'}</p>

        <a href="${data.homepage}">Go to Watch</a>
        
    `
        
   
}
