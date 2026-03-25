import { getDataIndividualAPI } from "../api.js";
import { searchActorMoviesAPI } from "../api.js";

const actorInfoContainer = document.getElementById('actorInfoContainer')


export async function loadActorInfo() {
    const parament=new URLSearchParams(window.location.search)
    const ID = parament.get('id')
    console.log(ID)

    actorInfoContainer.innerHTML = ""
    if (actorInfoContainer === '') {
        actorInfoContainer.innerHTML += `
        <h1>Loading...</h1>
        `
    }
    const data = await getDataIndividualAPI(`person/${ID}`);
    const dataKnownForActor = await searchActorMoviesAPI(`person/${ID}/movie_credits?`)
    
    console.log(dataKnownForActor)

    actorInfoContainer.innerHTML += `
        <h1>${data.name}</h1>
        <h2>${data.known_for_department ?? 'Not Found'}</h2>
        <h3>${(data.gender === 1) ? 'Women' : data.gender === 2 ? 'Man' : 'Baguette'}</h3>
        <img alt='Image Not Found' src="https://image.tmdb.org/t/p/w500${data.profile_path}">
        <h3>Birth Day: ${data.birthday ?? 'Not Found'}</h3>
        <h3>Death Day: ${data.deathday ?? 'Not Found'}</h3>
        <h4>${data.biography ?? 'Not Found'}</h4>
        <div>
            <h4>Popularity: ${data.popularity ?? 'Not Found'}</h4>
        </div>

        <div>
            <h2>Known For: </h2>
            ${(dataKnownForActor.cast.slice(0,5).map(movie=>{
                return `
                <div>
                    <h4>${movie.original_title ?? 'Not Found'}</h4>
                    <img title='Image Not Found' src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
                    <h4>${movie.release_date ?? 'Not Found'}</h4>
                    <h4>${movie.vote_average ?? 'Not Found'}</h4>
                </div>
                `
            }).join(""))}
        </div>
    `
        
   
}
