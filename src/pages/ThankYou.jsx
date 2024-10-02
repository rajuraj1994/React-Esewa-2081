import React from 'react';
import { Link } from 'react-router-dom';

const ThankYou = () => {
  return (
    <div className="container text-center my-5">
      <h2>Payment Successful!</h2>
      <p>Your order has been placed successfully. Thank you for shopping with us.</p>
      <Link to="/" className="btn btn-success mt-4">
        Go to Homepage
      </Link>
    </div>
  );
};

export default ThankYou;
