import { commonAPI } from "./commonAPI"
import { serverURL } from "./serverURL"

//add admin
export const registerAdminAPI=async(data)=>{
    return await commonAPI("POST",`${serverURL}/register`,data,"")
}

//login admin
export const LoginAdminAPI=async(data)=>{
    return await commonAPI("POST",`${serverURL}/login`,data,"")
}