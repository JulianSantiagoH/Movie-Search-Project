import { getDataAPI } from "./api.js";
const moviesContainer = document.getElementById('moviesContainer')
const previousPage = document.getElementById('previousPage')
const nextPage = document.getElementById('nextPage')
let currentPage = 1


nextPage.addEventListener('click', () => {
    currentPage += 1
    loadMovies()
})

previousPage.addEventListener('click', () => {
    currentPage -= 1
    loadMovies()
})

export async function loadMovies() {
    moviesContainer.innerHTML = ""
    const data = await getDataAPI('discover/movie', currentPage);
    data.results.forEach(data => {
        moviesContainer.innerHTML += `
        <div class="movie" id="${data.id}">
            <h3>${data.original_title}</h3>
            <h4>${data.release_date}</h4>
            <div>
                <h4>${data.vote_average}</h4>
                <h4>${data.vote_count}</h4>
            </div>
            <p>⭐ ${data.overview}</p>
            <img src="https://image.tmdb.org/t/p/w500${data.poster_path}">
        </div>
        
        `
    });

    if (currentPage === 1) {
        previousPage.style.display = 'none'
    }else{
        previousPage.style.removeProperty('display')
    }
}
