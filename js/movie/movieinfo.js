import { getDataIndividualAPI } from "../api.js";

const movieInfoContainer = document.getElementById('movieInfoContainer')

export async function loadMovieInfo() {
    const parament=new URLSearchParams(window.location.search)
    const ID = parament.get('id')
    console.log(ID)
    
    movieInfoContainer.innerHTML = ""
    if (movieInfoContainer === '') {
        movieInfoContainer.innerHTML += `
        <h1>Loading...</h1>
        `
    }
    const data = await getDataIndividualAPI(`movie/${ID}`);
    const getDuration= `${data.runtime} Min`
    console.log(data)
    

    movieInfoContainer.innerHTML += `
        <img alt='Image Not Found' src="https://image.tmdb.org/t/p/w500${data.backdrop_path}">
        <h1>${data.original_title}</h1>
        <div>
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
            <h4>Release Date: ${data.release_date ?? 'Not Found'}</h4>
            <h4>Duration: ${getDuration ?? 'Not Found'}</h4>
        </div>

        <h4>${data.overview ?? 'Not Found'}</h4>
        <p>${data.tagline ?? 'Not Found'}</p>

        <a href="${data.homepage}">Go to Watch</a>
        
        
        

    
    `
        
   
}
