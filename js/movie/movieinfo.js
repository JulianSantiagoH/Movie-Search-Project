import { getDataIndividualAPI } from "../api.js";

const movieInfoContainer = document.getElementById('movieInfoContainer')

export async function loadMovieInfo() {
    const parament=new URLSearchParams(window.location.search)
    const ID = parament.get('id')
    
    movieInfoContainer.innerHTML = ""
    if (movieInfoContainer === '') {
        movieInfoContainer.innerHTML += `
        <h1>Loading...</h1>
        `
    }
    const data = await getDataIndividualAPI(`movie/${ID}`);
    const getDuration= `${data.runtime} Min`
    
    movieInfoContainer.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`;
    let voteAverageRounded=data.vote_average.toFixed(2)
    movieInfoContainer.innerHTML += `
        <button class="button-back"><a href="../movies.html">Back</a></button>
        <div class="individual-content-container">
            <img class="individual-poster" alt='Image Not Found' src="https://image.tmdb.org/t/p/w500${data.poster_path}">
            <div class="individual-text-container">
                <h1 class="title-text">${data.original_title}</h1>
                <div class="individual-genres">
                    Genres: ${data.genres.map(element=>{
                        return `
                        <p>${element.name}</p>
                        `
                    }).join(",")}
                    
                </div>
        
                <div class="vote-container">
                    <h4 class="secundary-text">Vote Average: ⭐ ${voteAverageRounded} (${data.vote_count} votes)</h4>
                    <h4 class="secundary-text">Release Date: ${data.release_date ?? 'Not Found'}</h4>
                    <h4 class="secundary-text">Duration: ${getDuration ?? 'Not Found'}</h4>
                </div>

                <h4 class="secundary-text">${data.overview ?? 'Not Found'}</h4>
                <p class="phrase-text">${data.tagline ?? 'Not Found'}</p>

                <button class="button-url"><a href="${data.homepage}">Go to Watch</a></button>
            </div>
        
        </div>
        
        
        

    
    `
        
   
}
