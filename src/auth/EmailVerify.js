import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { APP_URL } from '../config'

const EmailVerify = () => {
    const params=useParams()
    const[values,setValues]=useState({
        error:'',
        success:false
    })
    // object destructure 
    const{error,success}=values 

    // show error message
    const showError=()=>(
        error && <div className='alert alert-danger'>{error}</div>
    )
    // show success message
    const showSuccess=()=>(
        success && <div className='alert alert-success'>
           Your email is verified successfully
        </div>
    )
    const token=params.token

    // verify process 
    useEffect(()=>{
        fetch(`${APP_URL}/confirmation/${token}`,{
            method:'PUT',
            headers:{
                accept:'application/json',
                'content-type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error})
            }
            else{
                setValues({...values,error:'',success:true})
            }
        })

    },[token])


  return (
    <>
    {showError()}
    {showSuccess()}
    </>
  )
}

export default EmailVerify