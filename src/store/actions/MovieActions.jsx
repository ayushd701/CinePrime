import axios from "../../utils/axios"
import {loadMovie} from "../reducers/movieSlice"
export {removeMovie} from "../reducers/movieSlice"

export const asyncloadmovie = (id) => async (dispatch , getState) => {
    try {
        const details=await axios.get(`/movie/${id}`)
        const externalid=await axios.get(`/movie/${id}/external_ids`)
        const similar=await axios.get(`/movie/${id}/similar`)
        const recommendations=await axios.get(`/movie/${id}/recommendations`)
        const videos=await axios.get(`/movie/${id}/videos`)
        const watchproviders=await axios.get(`/movie/${id}/watch/providers`)
        let ultimate = {
            details : details.data ,
            externalid : externalid.data ,
            similar : similar.data.results ,
            recommendations : recommendations.data.results ,
            videos : videos.data.results.find(m => m.type === "Trailer") ,
            watchproviders : watchproviders.data.results.IN
        }
        dispatch(loadMovie(ultimate))
        console.log(ultimate);  
    } catch (error) {
        console.log("Error loading movie");
    }
}