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
        const processPayment = async () => {
            try {
                const params = new URLSearchParams(window.location.search);
                const encodedData = params.get('data');
                
                if (!encodedData) {
                    navigate('/payment-failure');
                    return;
                }
                
                const decodedData = atob(encodedData);
                console.log('Decoded Response:', decodedData);

                const paymentData = JSON.parse(decodedData);

                if (paymentData.status === 'COMPLETE') {
                    console.log('Payment Success:', paymentData.transaction_code);

                    const config = {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`
                        }
                    };

                    // Save order details to the database
                    const { data } = await axios.post(`${APP_URL}/postorder`, order, config);
                    localStorage.removeItem('cartItems');

                    // Redirect to thank-you page
                    navigate('/thank-you');
                } else {
                    // If payment was not successful
                    navigate('/payment-failure');
                }
            } catch (error) {
                console.error('Error processing payment:', error);
                toast.error('Error processing payment');
                navigate('/payment-failure');
            }
        };

        processPayment();
    }, [navigate, token, order]);

    return (
        <>
            <ToastContainer theme="colored" />
            <h1>Processing Payment...</h1>
        </>
    );
};

export default PaymentSuccess;
