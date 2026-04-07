import { getDataAPI } from "./api.js";
import { searchContent } from "./search.js";
import { searchDataAPI } from "./api.js";

const actorsContainer = document.getElementById('actorsContainer')
const previousPage = document.getElementById('previousPage')
const nextPage = document.getElementById('nextPage')
let currentPage = 1

let inputContent = '';

if (actorsContainer) {
    searchContent((inputValue) => {
        inputContent = inputValue
        console.log('el usuario escribio: ', inputValue)
        loadActors()
        searchDataAPI(`search/tv?query=${inputContent}&`, currentPage)
    })

    nextPage.addEventListener('click', () => {
        currentPage += 1
        loadActors()
    })

    previousPage.addEventListener('click', () => {
        currentPage -= 1
        loadActors()
    })
}

export async function loadActors() {
    actorsContainer.innerHTML = ""
    if (actorsContainer === '') {
        actorsContainer.innerHTML += `
        <h1>Loading...</h1>
        `
    }
    if (inputContent === '') {
        const data = await getDataAPI('person/popular', currentPage);
        data.results.forEach(data => {
            actorsContainer.innerHTML += `
        <div class="data-container" id="${data.id}">
            <h3 class="title-text">${data.original_name}</h3>
            <img class="img-poster" src="https://image.tmdb.org/t/p/w500${data.profile_path}">
            <h4 class="secundary-text">${data.known_for_department}</h4>
            <h4 class="secundary-text">Popularity: ${data.popularity}</h4>
            
        </div>
        
        `
        });
    } else {
        const data = await searchDataAPI(`search/person?query=${inputContent}&`, currentPage)
        data.results.forEach(data => {
            actorsContainer.innerHTML += `
        <div class="data-container" id="${data.id}">
            <h3 class="title-text">${data.original_name}</h3>
            <img class="img-poster" src="https://image.tmdb.org/t/p/w500${data.profile_path}">
            <h4 class="secundary-text">${data.known_for_department}</h4>
            <h4 class="secundary-text">Popularity: ${data.popularity}</h4>
            
        </div>
        
        `
        });
    }

    document.querySelectorAll('.data-container').forEach(actor=>{
        actor.addEventListener('click',(e)=>{
            if(!actor){return}
            const idActor=e.currentTarget.id
            window.location.href=`actor/actorinfo.html?id=${idActor}`
        })
    })


    if (currentPage === 1) {
        previousPage.style.display = 'none'
    } else {
        previousPage.style.removeProperty('display')
    }
}
