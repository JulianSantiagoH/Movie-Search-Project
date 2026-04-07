import {CONFIG} from '../config/config.js'

//Getter

export async function getDataAPI(endpoint,page){
    const API= await fetch(`${CONFIG.API_URL}${endpoint}?api_key=${CONFIG.API_KEY}&page=${page}`)
    const data= await API.json()
    return data
}

//Searcher
export async function searchDataAPI(endpoint,page){
    const API= await fetch(`${CONFIG.API_URL}${endpoint}api_key=${CONFIG.API_KEY}&page=${page}`)
    const data= await API.json()
    return data
}

//Search Individual Item

export async function searchActorMoviesAPI(endpoint){
    const API= await fetch(`${CONFIG.API_URL}${endpoint}api_key=${CONFIG.API_KEY}`)
    const data= await API.json()
    return data
}

//Get Individual Info

export async function getDataIndividualAPI(endpoint){
    const API= await fetch(`${CONFIG.API_URL}${endpoint}?api_key=${CONFIG.API_KEY}`)
    const data= await API.json()
    return data
}