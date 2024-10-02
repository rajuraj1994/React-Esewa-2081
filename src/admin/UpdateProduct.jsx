import React,{useEffect,useState} from 'react'
import { APP_URL } from '../config'
import { isAuthenticated } from '../auth'
import { useParams } from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

const UpdateProduct = () => {
    const params=useParams()
    const id=params.productId
    const[categories,setCategories]=useState([])
    const[initialValues,setInitialValues]=useState({})
    const {token} =isAuthenticated()

    const[product_name,setProductname]=useState('')
    const[product_price,setPrice]=useState('')
    const[countInStock,setStock]=useState('')
    const[product_description,setDescription]=useState('')
    const[product_image,setImage]=useState(null)
    const[categoryId,setCategoryId]=useState('')
    const[success,setSuccess]=useState(false)
    const[error,setError]=useState('')

    useEffect(()=>{
        axios.get(`${APP_URL}/categorylist`)
        .then(res => {
            setCategories(res.data)
        })
        .catch(err => console.log(err))

        // fetch product details using id 
        axios.get(`${APP_URL}/productdetails/${id}`)
        .then(res=>{
            setInitialValues(res.data)
            setProductname(res.data.product_name)
            setPrice(res.data.product_price)
            setStock(res.data.countInStock)
            setDescription(res.data.product_description)
            setImage(res.data.product_image)
            setCategoryId(res.data.category._id)
        })
        .catch(err => console.log(err))
    },[])

    // handling the submit 
    const handleSubmit=async event=>{
        event.preventDefault()
        const formData= new FormData()
            formData.append('product_name',product_name)
            formData.append('product_price',product_price)
            formData.append('countInStock',countInStock)
            formData.append('product_description',product_description)
            formData.append('product_image',product_image)
            formData.append('category',categoryId)
        try{
            const reponse= await axios.put(
                `${APP_URL}/updateproduct/${id}`,
                formData,
                {
                    headers:{
                        'Content-Type':'multipart/form-data',
                        Authorization:`Bearer ${token}`
                    }
                }
            )
            setSuccess(true)
            setError('')
        }
        catch(err){
            err.response && setError(err.response.data.error)
            setSuccess(false)
        }
    }

    // show error message
    const showError=()=>(
        error && <div className='alert alert-danger'>{error}</div>
    )
    // show success message
    const showSuccess=()=>(
        success && <div className='alert alert-success'>
            product updated
        </div>
    )

  return (
    <>
     <div className="container my-3">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-5 shadow p-3">
                        <form>
                            <h3 className='text-center'>Update Product Form</h3>
                            {showError()}
                            {showSuccess()}
                            <div className="mb-2">
                                <label htmlFor="pname">Product Name</label>
                                <input type="text" name="pname" id="pname" className='form-control' onChange={e=>setProductname(e.target.value)} value={product_name} />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="price">Product proce</label>
                                <input type="number" name="price" id="price" className='form-control' onChange={e=>setPrice(e.target.value)} value={product_price} />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="stock">Stock Quantity</label>
                                <input type="number" name="stock" id="stock" className='form-control' onChange={e=>setStock(e.target.value)} value={countInStock} />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="description">Description</label>
                                <textarea name="description" id="description" cols="30" rows="10" onChange={e=>setDescription(e.target.value)} value={product_description} className='form-control'></textarea>
                            </div>
                            <div className="mb-2">
                                <label htmlFor="image">Image</label>
                                <input type="file" name="image" id="image" onChange={e=>setImage(e.target.files[0])} />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="category">Category</label>
                                <select name="category" id="category" className='form-control' onChange={e=>setCategoryId(e.target.value)}>
                                    <option value={categoryId}>{initialValues.category && initialValues.category.category_name}</option>
                                    {categories && categories.map((c,i)=>(
                                       <option value={c._id} key={i}>{c.category_name}</option> 
                                    ))}
                                </select>
                            </div>
                            <div className="mb-2">
                                <button className='btn btn-primary' onClick={handleSubmit}>Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    </>
  )
}

export default UpdateProduct