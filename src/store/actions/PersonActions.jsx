import axios from "../../utils/axios"
import {loadPerson} from "../reducers/personSlice"
export {removePerson} from "../reducers/personSlice"

export const asyncloadperson = (id) => async (dispatch , getState) => {
    try {
        const details=await axios.get(`/person/${id}`)
        const externalid=await axios.get(`/person/${id}/external_ids`)
        const tvCredits=await axios.get(`/person/${id}/tv_credits`)
        const movieCredits=await axios.get(`/person/${id}/movie_credits`)
        const combinedCredits=await axios.get(`/person/${id}/combined_credits`)
        let ultimate = {
            details : details.data ,
            externalid : externalid.data ,
            combinedCredits : combinedCredits.data ,
            movieCredits : movieCredits.data ,
            tvCredits : tvCredits.data ,
        }
        dispatch(loadPerson(ultimate))
        console.log(ultimate);  
    } catch (error) {
        console.log("Error loading person");
    }
}