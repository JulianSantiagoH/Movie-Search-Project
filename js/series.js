import { getDataAPI } from "./api.js";
import { searchContent } from "./search.js";
import { searchDataAPI } from "./api.js";

const seriesContainer = document.getElementById('seriesContainer')
const previousPage = document.getElementById('previousPage')
const nextPage = document.getElementById('nextPage')
let currentPage = 1

let inputContent = '';

if (seriesContainer) {
    searchContent((inputValue) => {
        inputContent = inputValue
        console.log('el usuario escribio: ', inputValue)
        loadSeries()
        searchDataAPI(`search/tv?query=${inputContent}&`, currentPage)
    })

    nextPage.addEventListener('click', () => {
        currentPage += 1
        loadSeries()
    })

    previousPage.addEventListener('click', () => {
        currentPage -= 1
        loadSeries()
    })
}

export async function loadSeries() {
    seriesContainer.innerHTML = ""
    if (seriesContainer === '') {
        seriesContainer.innerHTML += `
        <h1>Loading...</h1>
        `
    }
    if (inputContent === '') {
        const data = await getDataAPI('discover/tv', currentPage);
        data.results.forEach(data => {
            let voteAverageRounded=data.vote_average.toFixed(2)
            seriesContainer.innerHTML += `
        <div class="data-container" id="${data.id}">
            <h3 class="title-text">${data.original_name}</h3>
            <img class="img-poster" src="https://image.tmdb.org/t/p/w500${data.poster_path}">
            <h4 class="date-text">${data.first_air_date}</h4>
            <h4 class="vote-text">Vote Average: ${voteAverageRounded} (${data.vote_count} votes)</h4>
            <p class="overview-text">⭐ ${data.overview}</p>
            
        </div>
        
        `
        });
    } else {
        const data = await searchDataAPI(`search/tv?query=${inputContent}&`, currentPage)
        data.results.forEach(data => {
            let voteAverageRounded=data.vote_average.toFixed(2)
            seriesContainer.innerHTML += `
        <div class="data-container" id="${data.id}">
            <h3>${data.original_name}</h3>
            <img class="img-poster" src="https://image.tmdb.org/t/p/w500${data.poster_path}">
            <h4>${data.first_air_date}</h4>
            <div>
                <h4>${voteAverageRounded}</h4>
                <h4>${data.vote_count}</h4>
            </div>
            <p>⭐ ${data.overview}</p>
            
        </div>
        
        `
        });
    }


    document.querySelectorAll('.data-container').forEach(actor=>{
        actor.addEventListener('click',(e)=>{
            if(!actor){return}
            const idMovie=e.currentTarget.id
            window.location.href=`serie/serieinfo.html?id=${idMovie}`
        })
    })


    if (currentPage === 1) {
        previousPage.style.display = 'none'
    } else {
        previousPage.style.removeProperty('display')
    }
}
