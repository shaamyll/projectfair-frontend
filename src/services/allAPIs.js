import { commonAPI } from "../services/commonAPI";
import { serverUrl } from "../services/serverUrl";

export const registerAPI = async(reqBody)=>{
    return await commonAPI('post',`${serverUrl}/api/register`,reqBody,"")
}



export const loginAPI = async(reqBody)=>{
    return await commonAPI('post',`${serverUrl}/api/login`,reqBody,"")
}


export const addprojectAPI = async(reqBody,reqHeader)=>{
    return await commonAPI('post',`${serverUrl}/api/addProject`,reqBody,reqHeader)
}

export const getHomeProjectAPI = async()=>{
    return await commonAPI('get',`${serverUrl}/api/getHomeProjects`,"","")
}


export const getAllUserProjectAPI = async(searchKey,reqHeader)=>{
    return await commonAPI('get',`${serverUrl}/api/getAllUserProjects?search=${searchKey}`,"",reqHeader)
}


export const getParticularUserProjectAPI = async(reqHeader)=>{
    return await commonAPI('get',`${serverUrl}/api/getParticularUserProject`,"",reqHeader)
}


export const editProjectAPI = async(ProjectId,reqBody,reqHeader)=>{
    return await commonAPI('put',`${serverUrl}/api/editProject/${ProjectId}`,reqBody,reqHeader)
}


export const deleteProjectAPI = async(ProjectId,reqHeader)=>{
    return await commonAPI('delete',`${serverUrl}/api/deleteProject/${ProjectId}`,"",reqHeader)
}


