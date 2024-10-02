import React,{useState} from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Helmet } from 'react-helmet'
import {signup} from '../auth'

const Register = () => {
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
            new account created
        </div>
    )
    return (
        <>
            <Helmet>
                <title>Register</title>
            </Helmet>
            <Formik
                initialValues={{ name: '', email: '', password: '', cpassword: '' }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .max(20, 'must be 20 characters or less')
                        .required('name is mandatory'),

                    email: Yup.string()
                        .email('invalid email address')
                        .required('email is mandatory'),

                    password: Yup.string()
                        .matches(/(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$?!])[A-Za-z\d@#$?!]{8,50}$/, 'must contain one uppercase,one lowercase,one numeric and one special character and must be at least 8 characters')
                        .required('password is required'),

                    cpassword: Yup.string()
                        .required('confirm password is mandatory')
                        .oneOf([Yup.ref('password'), null], 'password and confirm password must match')
                })}
                onSubmit={(values,{setSubmitting,resetForm})=>{
                    setSubmitting(true)
                    signup(values)
                    .then(data=>{
                        if(data.error){
                            setValues({...values,error:data.error})
                        }
                        else{
                            setValues({...values,success:true})
                            resetForm()
                        }
                        setSubmitting(false)
                    })
                    .catch(err=>console.log(err))
                }}
            >
                <div className="container my-3">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-5 shadow p-3">
                            <Form>
                                {showError()}
                                {showSuccess()}
                                <div className="mb-2">
                                    <label htmlFor="name">FullName</label>
                                    <Field type="text" name="name" id="name" className="form-control" />
                                    <ErrorMessage name='name'>
                                        {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                    </ErrorMessage>
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="email">Email</label>
                                    <Field type="email" name="email" id="email" className="form-control" />
                                    <ErrorMessage name='email'>
                                        {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                    </ErrorMessage>
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="password">Password</label>
                                    <Field type="password" name="password" id="password" className="form-control" />
                                    <ErrorMessage name='password'>
                                        {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                    </ErrorMessage>
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="cpassword">Confirm Password</label>
                                    <Field type="password" name="cpassword" id="cpassword" className="form-control" />
                                    <ErrorMessage name='cpassword'>
                                        {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                    </ErrorMessage>
                                </div>
                                <div className="mb-2">
                                    <button type='submit' className='btn btn-primary'>Register</button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>

            </Formik>
        </>
    )
}

export default Register