const searchInput = document.getElementById('searchInput')
let searchInputValue = '';

export function searchContent(callback){
    searchInput.addEventListener('input',()=>{
        searchInputValue=searchInput.value.trimStart()
        callback(searchInputValue)
    })
}