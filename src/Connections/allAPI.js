import { commonAPI } from "./commonAPI"
import { serverURL } from "./serverURL"

//add admin
export const registerAdminAPI = async (data) => {
    return await commonAPI("POST", `${serverURL}/register`, data, "")
}

//login admin
export const LoginAdminAPI = async (data) => {
    return await commonAPI("POST", `${serverURL}/login`, data, "")
}

//add student
export const addStudentAPI = async (data, header) => {
    return await commonAPI("POST", `${serverURL}/add-student`, data, header)
}

//edit student
export const editStudentAPI = async (id, data, header) => {
    return await commonAPI("PUT", `${serverURL}/edit-student/${id}`, data, header)
}


//delete student
export const deleteStudentAPI = async (id, header) => {
    return await commonAPI("DELETE", `${serverURL}/delete-student/${id}`, {}, header)
}

export const adminStudentAPI = async (reqHeader) => {
    return await commonAPI("GET", `${serverURL}/allstudent`, "", reqHeader)
}