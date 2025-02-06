import axios from "../../utils/axios"
import {loadTv} from "../reducers/tvSlice"
export {removeTv} from "../reducers/tvSlice"

export const asyncloadtv = (id) => async (dispatch , getState) => {
    try {
        const details=await axios.get(`/tv/${id}`)
        const externalid=await axios.get(`/tv/${id}/external_ids`)
        const similar=await axios.get(`/tv/${id}/similar`)
        const recommendations=await axios.get(`/tv/${id}/recommendations`)
        const videos=await axios.get(`/tv/${id}/videos`)
        const watchproviders=await axios.get(`/tv/${id}/watch/providers`)
        let ultimate = {
            details : details.data ,
            externalid : externalid.data ,
            similar : similar.data.results ,
            recommendations : recommendations.data.results ,
            videos : videos.data.results.find(m => m.type === "Trailer") ,
            watchproviders : watchproviders.data.results.IN
        }
        dispatch(loadTv(ultimate))
        console.log(ultimate);  
    } catch (error) {
        console.log("Error loading tv");
    }
}