import { getDataAPI } from "./api.js";
const moviesContainer = document.getElementById('moviesContainer')
const previousPage = document.getElementById('previousPage')
const nextPage = document.getElementById('nextPage')
let currentPage=1

if(currentPage === 1){
    previousPage.style.display='none'
}

nextPage.addEventListener('click',()=>{
    currentPage+=1
    console.log(currentPage)
    loadMovies()
})
console.log(currentPage)

async function loadMovies(){
    moviesContainer.innerHTML = ""
    const data = await getDataAPI('discover/movie',currentPage);
    data.results.forEach(data => {
        moviesContainer.innerHTML+=`
        <div class="movie" id="${data.id}">
            <h3>${data.original_title}</h3>
            <p>⭐ ${data.overview}</p>
        </div>
        
        `
});
}

loadMovies()