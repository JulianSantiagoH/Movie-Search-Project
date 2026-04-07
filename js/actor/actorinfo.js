import { getDataIndividualAPI } from "../api.js";
import { searchActorMoviesAPI } from "../api.js";

const actorInfoContainer = document.getElementById('actorInfoContainer')


export async function loadActorInfo() {
    const parament=new URLSearchParams(window.location.search)
    const ID = parament.get('id')

    actorInfoContainer.innerHTML = ""
    if (actorInfoContainer === '') {
        actorInfoContainer.innerHTML += `
        <h1>Loading...</h1>
        `
    }
    const data = await getDataIndividualAPI(`person/${ID}`);
    const dataKnownForActor = await searchActorMoviesAPI(`person/${ID}/movie_credits?`)

    actorInfoContainer.innerHTML += `
        <button class="button-back"><a href="../actors.html">Back</a></button>

    <div class="individual-content-container">
        <img class="individual-poster" 
             alt='Image Not Found' 
             src="https://image.tmdb.org/t/p/w500${data.profile_path}">

        <div class="individual-text-container">
            <h1 class="title-text">${data.name}</h1>

            <div class="individual-genres">
                <p>${data.known_for_department ?? 'Not Found'}</p>
            </div>

            <div class="vote-container">
                <h4 class="secundary-text">
                    Gender: ${(data.gender === 1) ? 'Women' : data.gender === 2 ? 'Man' : 'Other'}
                </h4>

                <h4 class="secundary-text">
                    Birth: ${data.birthday ?? 'Not Found'}
                </h4>

                <h4 class="secundary-text">
                    Death: ${data.deathday ?? 'Alive'}
                </h4>
            </div>

            <div class="vote-container">
                <h4 class="secundary-text">
                    Popularity: ${data.popularity ?? 'Not Found'}
                </h4>
            </div>

            <h4 class="secundary-text">
                ${data.biography ?? 'Not Found'}
            </h4>

            <p class="phrase-text">Known For:</p>

            <div class="known-container">
                ${
                    dataKnownForActor.cast.slice(0,5).map(movie => `
                        <div class="known-card">
                            <img 
                                class="actor-productions"
                                src="https://image.tmdb.org/t/p/w200${movie.poster_path}" 
                                alt="Not Found"
                            >
                            <h4 class="secundary-text">${movie.original_title ?? 'Not Found'}</h4>
                            <h4 class="secundary-text">${movie.release_date ?? 'Not Found'}</h4>
                            <h4 class="secundary-text">⭐ ${movie.vote_average ?? 'Not Found'}</h4>
                        </div>
                    `).join("")
                }
            </div>
        </div>
    </div>
    `
        
   
}
