import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { FaTrash,FaEdit } from 'react-icons/fa'
import { APP_URL, IMG_URL } from '../config'
import { Link } from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { isAuthenticated } from '../auth'

const AllProduct = () => {
    const {token}=isAuthenticated()
    const[products,setProducts]=useState([])
    useEffect(()=>{
        axios.get(`${APP_URL}/productlist`)
        .then(res=>setProducts(res.data))
        .catch(err=>console.log(err))
    },[])
    //delete product 
    const deleteProduct=id=>{
        const confirmed=window.confirm('Are you sure want to delete this product?')
        if(confirmed){
            axios.delete(`${APP_URL}/deleteproduct/${id}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            .then(res=>{
                toast.success('product deleted')
                // update the state of product page
                setProducts(products.filter(p=>p._id!==id))
            })
            .catch(err=>{
                toast.error('failed to delete product')
            })
        }
    }
  return (
    <>
    <ToastContainer theme='colored' position='top-center'/>
    <div className="container">
        <div className="row d-flex justify-content-center">
            <div className="col-md-10">
                <table className='table table-ordered table-striped'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Description</th>
                            <th>Image</th>
                            <th>Category</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products && products.map((p,i)=>(
                            <tr key={i}>
                                <td>{p.product_name}</td>
                                <td>Rs.{p.product_price}</td>
                                <td>{p.countInStock}</td>
                                <td>{p.product_description}</td>
                                <td><img src={`${IMG_URL}/${p.product_image}`} alt={p.product_name} width='100' /></td>
                                <td>{p.category.category_name}</td>
                                <td>
                                    <Link to={`/admin/update-product/${p._id}`} className='btn btn-primary'><FaEdit/></Link>
                                    <button className='btn btn-danger' onClick={()=>deleteProduct(p._id)}><FaTrash/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    </>
  )
}

export default AllProduct