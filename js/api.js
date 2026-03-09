import {CONFIG} from './config.js'

export async function getDataAPI(endpoint,page){
    const API= await fetch(`${CONFIG.API_URL}${endpoint}?api_key=${CONFIG.API_KEY}&page=${page}`,{
       
    })

    const data= await API.json()

    console.log(data)

    return data

}

getDataAPI('discover/movie',1)