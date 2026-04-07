import { getDataIndividualAPI } from "../api.js";

const serieInfoContainer = document.getElementById('serieInfoContainer')

export async function loadSerieInfo() {
    const parament=new URLSearchParams(window.location.search)
    const ID = parament.get('id')
    
    serieInfoContainer.innerHTML = ""
    if (serieInfoContainer === '') {
        serieInfoContainer.innerHTML += `
        <h1>Loading...</h1>
        `
    }
    const data = await getDataIndividualAPI(`tv/${ID}`);

    const getDuration= `${data.episode_run_time} Min`

    const lastSeason=data.seasons[data.seasons.length-1]

    
    serieInfoContainer.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`;
    let voteAverageRounded=data.vote_average.toFixed(2)
    serieInfoContainer.innerHTML += `
        <button class="button-back"><a href="../series.html">Back</a></button>
        <div class="individual-content-container">
            <img class="individual-poster" 
                 alt='Image Not Found' 
                 src="https://image.tmdb.org/t/p/w500${data.poster_path}">

            <div class="individual-text-container">
                <h1 class="title-text">${data.name}</h1>

                <div class="individual-genres">
                    Genres: ${data.genres.map(e => `<p>${e.name}</p>`).join(",")}
                </div>

                <div class="vote-container">
                    <h4 class="secundary-text">
                        ⭐ ${voteAverageRounded} (${data.vote_count} votes)
                    </h4>

                    <h4 class="secundary-text">
                        First Air: ${data.first_air_date ?? 'Not Found'}
                    </h4>

                    <h4 class="secundary-text">
                        Duration: ${getDuration}
                    </h4>
                </div>

                <div class="vote-container">
                    <h4 class="secundary-text">
                        Seasons: ${lastSeason.season_number}
                    </h4>

                    <h4 class="secundary-text">
                        Status: ${data.status ?? 'Not Found'}
                    </h4>

                    <h4 class="secundary-text">
                        Last Ep: ${data.last_episode_to_air?.name ?? 'Not Found'}
                    </h4>
                </div>

                <h4 class="secundary-text">
                    ${data.overview ?? 'Not Found'}
                </h4>

                <p class="phrase-text">
                    ${data.tagline ?? ''}
                </p>

                <button class="button-url">
                    <a href="${data.homepage}">Go to Watch</a>
                </button>
            </div>
        </div>
        
    `
        
   
}
