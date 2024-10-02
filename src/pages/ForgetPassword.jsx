import React,{useState} from 'react'
import { forgetPassword } from '../auth'

const ForgetPassword = () => {
    const [values, setValues] = useState({
        email: '',
        error: '',
        success: false
    })
    const {email,error,success}=values

    // handling or reading the input value 
    const handleChange=name=>event=>{
        setValues({...values,[name]:event.target.value})
    }

    // handle submit 
    const handleSubmit=e=>{
        e.preventDefault()
        setValues({...values})
        // forget password function call 
        forgetPassword({email})
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error})
            }
            else{
                setValues({...values,success:true,error:'',email:''})
            }
        })
    }

     // show error message
     const showError=()=>(
        error && <div className='alert alert-danger'>{error}</div>
    )
    // show success message
    const showSuccess=()=>(
        success && <div className='alert alert-success'>
            Reset password link sent to your email
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
                    Forget Password
                </h2>
                <div className="mb-3">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" className='form-control'
                    onChange={handleChange('email')}
                    value={email}
                     />
                </div>
                <div className="mb-3">
                    <button type='submit' className='btn btn-primary' onClick={handleSubmit}>
                        Send Reset Password Link
                    </button>
                </div>
            </form>
        </div>
    </div>
    </>
  )
}

export default ForgetPassword