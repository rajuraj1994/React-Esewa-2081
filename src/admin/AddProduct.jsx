import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { APP_URL } from '../config'
import { isAuthenticated } from '../auth'

const AddProduct = () => {
    const { token } = isAuthenticated()
    const [categories, setCategories] = useState([])
    // fetch category 
    useEffect(() => {
        axios.get(`${APP_URL}/categorylist`)
            .then(res => {
                setCategories(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const [productData, setProductData] = useState({
        product_name: '',
        product_price: '',
        countInStock: '',
        product_description: '',
        product_image: '',
        category: ''
    })
    const { product_name, product_price, product_description, countInStock, product_image, category } = productData
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const handleChange=name=>e=>{
        setProductData({...productData,[name]:e.target.value})
    }

    const handleImageChange=e=>{
        setProductData({...productData,product_image:e.target.files[0]})
    }

    const handleSubmit=async e=>{
        e.preventDefault()
        try{
            const formData= new FormData()
            formData.append('product_name',product_name)
            formData.append('product_price',product_price)
            formData.append('countInStock',countInStock)
            formData.append('product_description',product_description)
            formData.append('product_image',product_image)
            formData.append('category',category)

            const config={
                headers:{
                    'Content-Type':'multipart/form-data',
                    Authorization:`Bearer ${token}`
                }
            }
            const response= await axios.post(`${APP_URL}/postproduct`,formData,config)
            setSuccess(true)
            setProductData({
                product_name: '',
                product_price: '',
                countInStock: '',
                product_description: '',
                product_image: '',
                category: ''
            })
            setError('')
        }
        catch(err){
            setError(err.response.data.error)
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
            new product added
        </div>
    )

    return (
        <>
            <div className="container my-3">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-5 shadow p-3">
                        <form>
                            <h3 className='text-center'>Add Product Form</h3>
                            {showError()}
                            {showSuccess()}
                            <div className="mb-2">
                                <label htmlFor="pname">Product Name</label>
                                <input type="text" name="pname" id="pname" className='form-control' onChange={handleChange('product_name')} value={product_name} />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="price">Product proce</label>
                                <input type="number" name="price" id="price" className='form-control' onChange={handleChange('product_price')} value={product_price} />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="stock">Stock Quantity</label>
                                <input type="number" name="stock" id="stock" className='form-control' onChange={handleChange('countInStock')} value={countInStock} />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="description">Description</label>
                                <textarea name="description" id="description" cols="30" rows="10" onChange={handleChange('product_description')} value={product_description} className='form-control'></textarea>
                            </div>
                            <div className="mb-2">
                                <label htmlFor="image">Image</label>
                                <input type="file" name="image" id="image" onChange={handleImageChange} />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="category">Category</label>
                                <select name="category" id="category" className='form-control' onChange={handleChange('category')}>
                                    <option>Choose Category</option>
                                    {categories && categories.map((c,i)=>(
                                       <option value={c._id} key={i}>{c.category_name}</option> 
                                    ))}
                                </select>
                            </div>
                            <div className="mb-2">
                                <button className='btn btn-primary' onClick={handleSubmit}>Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default AddProduct