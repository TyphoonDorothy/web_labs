import React from 'react';
import { Link } from 'react-router-dom';
import './success.css';

const Success = () => {
  return (
    <div className="success-container">
      <h1>Thank You for Your Order!</h1>
      <p>Your order has been successfully placed. We will contact you soon.</p>
      <Link to="/" className="home-button">
        Go Back to Home
      </Link>
    </div>
  );
};

export default Success;
