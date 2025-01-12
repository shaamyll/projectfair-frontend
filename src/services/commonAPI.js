//1 Import axios
import axios from 'axios';

//2 Comfigure the axios

export const commonAPI=async(httpMethod,url,reqBody,reqHeader)=>{


    const reqConfig={
        method:httpMethod,
        url:url,
        data:reqBody,
        headers: reqHeader ? reqHeader:{
            "Content-Type":"application/json",
        }
    }

    return await axios(reqConfig).then((response)=>{
        return response
    })
    
    .catch((error)=>{
        return error
    })

    
}