import React,{useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { isAuthenticated } from '../auth'
import { APP_URL } from '../config'

const PaymentSucces = () => {
    const navigate=useNavigate()
    const cartItems=JSON.parse(localStorage.getItem('cartItems'))
    const shippingInfo=JSON.parse(localStorage.getItem('shippingInfo'))
    const {user,token}=isAuthenticated()

    const order={
        orderItems:cartItems,
        shippingAddress1:shippingInfo.shippingAddress1,
        shippingAddress2:shippingInfo.shippingAddress2,
        city:shippingInfo.city,
        country:shippingInfo.country,
        zip:shippingInfo.zip,
        phone:shippingInfo.phone,
        user:user._id
    }
       
    useEffect(()=>{
        const processPayment=async()=>{
            try{
                const params= new URLSearchParams(window.location.search)
                const encodedData=params.get('data')
                if(!encodedData){
                    navigate('/payment-failure')
                }
                // decoded the encoded data 
                const decodedData=atob(encodedData)
                console.log('Decoded Data',decodedData)

                const paymentData=JSON.parse(decodedData)
                if( paymentData.status==='COMPLETE'){

                    const config = {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`
                        }
                    }

                    //save order data in the database 
                    await axios.post(`${APP_URL}/postorder`,order,config)
                    // remove item from from the cart
                    localStorage.removeItem('cartItems')
                    // redirect to thankYou page
                    navigate('/thank-you')
                }
                else{
                    // if payment was not successfull
                    navigate('/payment-failure')
                }
            }catch(err){
                navigate('/payment-failure')
            }
        }
        processPayment()
    },[navigate,token,order])
  return (
    <>
    <h1>Processing Payment ................</h1>

    </>
  )
}

export default PaymentSucces