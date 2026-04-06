import { getDataAPI } from "./api.js";
import { searchContent } from "./search.js";
import { searchDataAPI } from "./api.js";

const moviesContainer = document.getElementById('moviesContainer')
const previousPage = document.getElementById('previousPage')
const nextPage = document.getElementById('nextPage')
let currentPage = 1

let inputContent = '';

if (moviesContainer) {
    searchContent((inputValue) => {
        inputContent = inputValue
        loadMovies()
        searchDataAPI(`search/movie?query=${inputContent}&`, currentPage)
    })
    nextPage.addEventListener('click', () => {
        currentPage += 1
        loadMovies()
    })

    previousPage.addEventListener('click', () => {
        currentPage -= 1
        loadMovies()
    })

}

export async function loadMovies() {
    moviesContainer.innerHTML = ""
    if (moviesContainer === '') {
        moviesContainer.innerHTML += `
        <h1>Loading...</h1>
        `
    }
    if (inputContent === '') {
        const data = await getDataAPI('discover/movie', currentPage);
        data.results.forEach(data => {
            moviesContainer.innerHTML += `
        <div class="data-container" id="${data.id}">
            <h3>${data.original_title}</h3>
            <h4>${data.release_date}</h4>
            <div>
                <h4>${data.vote_average}</h4>
                <h4>${data.vote_count}</h4>
            </div>
            <p>⭐ ${data.overview}</p>
            <img class="img-poster" src="https://image.tmdb.org/t/p/w500${data.poster_path}">
        </div>
        
        `
        });
    } else {
        const data = await searchDataAPI(`search/movie?query=${inputContent}&`, currentPage)
        data.results.forEach(data => {
            moviesContainer.innerHTML += `
        <div class="data-container" id="${data.id}">
            <h3>${data.original_title}</h3>
            <h4>${data.release_date}</h4>
            <div>
                <h4>${data.vote_average}</h4>
                <h4>${data.vote_count}</h4>
            </div>
            <p>⭐ ${data.overview}</p>
            <img class="img-poster" src="https://image.tmdb.org/t/p/w500${data.poster_path}">
        </div>
        
        `
        });
    }

    document.querySelectorAll('.data-container').forEach(actor=>{
        actor.addEventListener('click',(e)=>{
            if(!actor){return}
            const idMovie=e.currentTarget.id
            window.location.href=`movie/movieinfo.html?id=${idMovie}`
        })
    })

    if (currentPage === 1) {
        previousPage.style.display = 'none'
    } else {
        previousPage.style.removeProperty('display')
    }
}

