import { APP_URL } from "../config";

// for signup 
export const signup=user=>{
    return fetch(`${APP_URL}/register`,{
        method:'POST',
        headers:{
            accept:'application/json',
            'content-type':'application/json'
        },
        body:JSON.stringify(user)
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=> console.log(err))
}

// for signup 
export const signin=user=>{
    return fetch(`${APP_URL}/signin`,{
        method:'POST',
        headers:{
            accept:'application/json',
            'content-type':'application/json'
        },
        body:JSON.stringify(user)
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=> console.log(err))
}

// authenticate and to store token in the local storage
export const authenticate=(data,next)=>{
    if(typeof window !== 'undefined'){
        localStorage.setItem('jwt',JSON.stringify(data))
        next()
    }
}
// redirect user by role by getting information from localStorage 
export const isAuthenticated=()=>{
    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'))
    }
    else{
        return false
    }
}

// forget password 
export const forgetPassword=user=>{
    return fetch(`${APP_URL}/forget/password`,{
        method:'POST',
        headers:{
            accept:'application/json',
            'content-type':'application/json'
        },
        body:JSON.stringify(user)
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=> console.log(err))
}

// signout 
export const signout=(next)=>{
    if(typeof window !=='undefined'){
        localStorage.removeItem('jwt')
        next()
        return fetch(`${APP_URL}/signout`,{
            method:'POST'
        })
        .then(res=>{
            return res.json()
        })
        .catch(err=> console.log(err))
    }
}