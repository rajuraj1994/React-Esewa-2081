import React ,{useState,useEffect}from 'react'
import { APP_URL } from '../config'
import { useParams } from 'react-router-dom'

const ResetPassword = () => {
    const params=useParams()
    const [values, setValues] = useState({
        password: '',
        error: '',
        success: false
    })
    const {password,error,success}=values

    // handling or reading the input value 
    const handleChange=name=>event=>{
        setValues({...values,[name]:event.target.value})
    }
    // handle submit 
    const handleSubmit=e=>{
        e.preventDefault()
        setValues({...values})
        const token=params.token 
        // reset password function 
        fetch(`${APP_URL}/reset/password/${token}`,{
            method:'PUT',
            headers:{
                accept:'application/json',
                'content-type':'application/json'
            },
            body:JSON.stringify(values)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error})
            }
            else{
                setValues({...values,error:'',password:'',success:true})
            }
        })
        .catch(err=>console.log(err))
    }
    // show error message
    const showError=()=>(
        error && <div className='alert alert-danger'>{error}</div>
    )
    // show success message
    const showSuccess=()=>(
        success && <div className='alert alert-success'>
            Password has been reset successfully
        </div>
    )
  return (
    <>
    <div className="d-flex justify-content-center">
        <div className="col-5 my-4">
            {showError()}
            {showSuccess()}
            <form className='p-3 shadow'>
                <h2 className='my-2 text-center'>
                    Reset Password Form
                </h2>
                <div className="mb-3">
                    <label htmlFor="pwd">Password</label>
                    <input type="password" id="pwd" className='form-control'
                    onChange={handleChange('password')}
                    value={password}
                     />
                </div>
                <div className="mb-3">
                    <button type='submit' className='btn btn-primary' onClick={handleSubmit}>
                         Reset Password
                    </button>
                </div>
            </form>
        </div>
    </div>
    </>
  )
}

export default ResetPassword