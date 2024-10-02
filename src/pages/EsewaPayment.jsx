import React from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isAuthenticated } from '../auth';
import { APP_URL } from '../config';

const EsewaPayment = () => {
    const {token } = isAuthenticated();

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));

    const submitHandler = async (e) => {
        e.preventDefault();
        document.querySelector('#pay-btn').disabled = true;

        const formData = {
            amount: orderInfo.totalPrice, // Example: total price excluding tax
            tax_amount: 0, // Example: tax amount
            total_amount: orderInfo.totalPrice, // Total price with tax
            transaction_uuid: `order-${Math.floor(Math.random() * 1000000)}`, // Unique transaction ID
            product_code: 'EPAYTEST', // Test product code for eSewa
            product_service_charge: '0',
            product_delivery_charge: '0',
            success_url: 'http://localhost:3000/payment-success',
            failure_url: 'http://localhost:3000/payment-failure',
        };

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };

            // Send request to your backend to generate signature for eSewa
            const { data: signatureData } = await axios.post(`${APP_URL}/generate-signature`, formData, config);
            const { signature } = signatureData;

            // Create form and submit to eSewa
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = 'https://rc-epay.esewa.com.np/api/epay/main/v2/form';

            Object.keys(formData).forEach((key) => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = formData[key];
                form.appendChild(input);
            });

            const signatureInput = document.createElement('input');
            signatureInput.type = 'hidden';
            signatureInput.name = 'signature';
            signatureInput.value = signature;
            form.appendChild(signatureInput);

            const signedFieldNames = document.createElement('input');
            signedFieldNames.type = 'hidden';
            signedFieldNames.name = 'signed_field_names';
            signedFieldNames.value = "total_amount,transaction_uuid,product_code";
            form.appendChild(signedFieldNames);

            document.body.appendChild(form);
            form.submit();
        } catch (error) {
            document.querySelector('#pay-btn').disabled = false;
            toast.error('Something went wrong. Please try again.');
        }
    };

    return (
        <>
            <ToastContainer theme="colored" />
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-5 shadow p-3 my-4">
                        <form onSubmit={submitHandler}>
                            <h2 className="mb-3">eSewa Payment</h2>
                            <div className="mb-3">
                                <label>Total Amount:</label>
                                <p className="form-control">Rs. {orderInfo.totalPrice}</p>
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-warning form-control" id="pay-btn">
                                    Pay with eSewa
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EsewaPayment;
