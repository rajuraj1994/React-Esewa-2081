import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signin, authenticate, isAuthenticated } from '../auth'

const Login = () => {
    const navigate = useNavigate()
    const{user}=isAuthenticated()
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        redirectTo: false
    })
    const { email, password, error, redirectTo } = values
    // handling or reading the input value 
    const handleChange=name=>event=>{
        setValues({...values,[name]:event.target.value})
    }
    // handling the form 
    const handleSubmit=e=>{
        e.preventDefault()
        // setValues({...values})
        // call the signin function 
        signin({email,password})
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error})
            }
            else{
                authenticate(data,()=>{
                    setValues({...values,redirectTo:true})
                })
            }
        })
    }
    // show error message
    const showError=()=>(
        error && <div className='alert alert-danger'>{error}</div>
    )

    // to redirect user 
    const redirectUser=()=>{
        if(redirectTo){
            let redirect='/profile'
            if(user && user.role===1){
                navigate('/admin/dashboard')
            }
            else{
                navigate(redirect)
            }
        }
    }
    return (
        <>
            <div className="container my-3">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-5 shadow p-3">
                        <form>
                            {showError()}
                            {redirectUser()}
                            <div className="mb-2">
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" id="email" className='form-control' onChange={handleChange('email')} value={email} />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" id="password" className='form-control' onChange={handleChange('password')} value={password} />
                            </div>
                            <button className='btn btn-primary' onClick={handleSubmit}>Signin</button>
                            <div className="d-flex justify-content-between mt-2">
                                <Link to='/forgetpassword' className='text-decoration-none'>
                                Forget Password?
                                </Link>
                                <Link to='/register' className='text-decoration-none'>
                                Create an account instead
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login