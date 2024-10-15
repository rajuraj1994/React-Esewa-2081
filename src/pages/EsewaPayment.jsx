import React from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { isAuthenticated } from '../auth'
import { APP_URL } from '../config'
import { Helmet } from 'react-helmet'

const EsewaPayment = () => {
    const { token } = isAuthenticated()
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))

    const submitHandler = async (e) => {
        e.preventDefault()
        document.querySelector('#pay-btn').disabled = true

        // define the esewa form data 
        const formData = {
            amount: orderInfo.totalPrice,
            tax_amount: 0,
            total_amount: orderInfo.totalPrice,
            transaction_uuid: `order-${Math.floor(Math.random() * 1000000)}`,
            product_code: 'EPAYTEST',
            product_service_charge: 0,
            product_delivery_charge: 0,
            success_url: 'http://localhost:3000/payment-success',
            failure_url: 'http://localhost:3000/payment-failure',
            signed_field_names:'total_amount,transaction_uuid,product_code'
        }
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            // send request to backend to generate signature for esewa
            const { data: signatureData } = await axios.post(`${APP_URL}/generate-signature`, formData, config)
            const { signature } = signatureData

            // create form and submit to esewa
            const form = document.createElement('form')
            form.method = 'POST'
            form.action = 'https://rc-epay.esewa.com.np/api/epay/main/v2/form'

            Object.keys(formData).forEach(key => {
                const input = document.createElement('input')
                input.type = 'hidden'
                input.name = key
                input.value = formData[key]
                form.appendChild(input)
            })

            const signatureInput = document.createElement('input')
            signatureInput.type = 'hidden'
            signatureInput.name = 'signature'
            signatureInput.value = signature
            form.appendChild(signatureInput)

            document.body.appendChild(form)
            form.submit()
        }
        catch (err) {
            document.querySelector('#pay-btn').disabled=false
            toast.error('Something went wrong.Please try again')
        }




    }



    return (
        <>
            <Helmet>
                <title>eSewa Payment</title>
            </Helmet>
            <ToastContainer theme='colored' />
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-5 p-3 my-4">
                        <form onSubmit={submitHandler}>
                            <h2 className='mb-3'>
                                eSewa Payment
                            </h2>
                            <div className="mb-2">
                                <label >Total Amount</label>
                                <p className='form-control'>Rs. {orderInfo.totalPrice}</p>
                            </div>
                            <div className="mb-2">
                                <button className='btn btn-warning form-control' id='pay-btn'>
                                    Pay with eSewa
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default EsewaPayment