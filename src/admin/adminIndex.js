import { APP_URL } from "../config";

// to add category
export const addCategory=(token,category)=>{
    return fetch(`${APP_URL}/postcategory`,{
        method:'POST',
        headers:{
            accept:'application/json',
            'content-type':'application/json',
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(category)
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=> console.log(err))
}