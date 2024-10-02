import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import { APP_URL } from '../config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    const shippingInfo = JSON.parse(localStorage.getItem('shippingInfo'));


    const { user, token } = isAuthenticated();

    const order = {
        orderItems: cartItems,
        shippingAddress1: shippingInfo.shippingAddress1,
        shippingAddress2: shippingInfo.shippingAddress2,
        city: shippingInfo.city,
        zip: shippingInfo.zip,
        country: shippingInfo.country,
        phone: shippingInfo.phone,
        user: user._id,
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const status = params.get('status');
        const transactionCode = params.get('transaction_code');

        if (status === 'COMPLETE') {
            // Process the success data, such as saving order details to the database
            console.log('Payment Success:', transactionCode);

            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = axios.post(`${APP_URL}/postorder`, order, config)
                localStorage.removeItem('cartItems')
                // Redirect to thank-you page
                navigate('/thank-you');
            }
            catch (error) {
                toast.error(error)
            }

        } else {
            // If not successful, navigate to failure page
            navigate('/payment-failure');
        }
    }, [navigate]);

    return (
        <>
            <ToastContainer theme="colored" />
            <h1>Processing Payment...</h1>;
        </>

    )
};

export default PaymentSuccess;
