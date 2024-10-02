import React,{useState} from 'react'
import { isAuthenticated } from '../auth'
import { addCategory } from './adminIndex'

const AddCategory = () => {
    const[category_name,setCategoryName]=useState('')
    const[error,setError]=useState('')
    const[success,setSuccess]=useState(false)

    // destructure token
    const {token}=isAuthenticated()

    const handleChange=e=>{
        setError('')
        setCategoryName(e.target.value.toLowerCase())
    }

    const handleSubmit=e=>{
        e.preventDefault()
        setError('')
        setSuccess(false)
        // make request to add category function
        addCategory(token,{category_name})
        .then(data=>{
            if(data.error){
                setError(data.error)
            }
            else{
                setError('')
                setCategoryName('')
                setSuccess(true)
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
            new category created
        </div>
    )

    return (
        <>
            <div className="container my-3">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-5 shadow p-3">
                        <form>
                            <h3 className='text-center'>Add Category Form</h3>
                            {showError()}
                            {showSuccess()}
                            <div className="mb-2">
                                <label htmlFor="cname">Category Name</label>
                                <input type="text" name="cname" id="cname" className='form-control' onChange={handleChange} value={category_name} />
                            </div>
                            <div className="mb-2">
                                <button className='btn btn-primary'
                                onClick={handleSubmit}
                                >Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddCategory