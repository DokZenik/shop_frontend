import React from 'react';
import { Link } from 'react-router-dom';
import Header from './../components/Header';

const PaymentScreen = () => {
  window.scrollTo(0, 0);

  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login2 col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}>
          <h6>SELECT PAYMENT METHOD</h6>
          <div className="payment-container">
            <div className="radio-container">
              <input
                className="form-check-input"
                type="radio"
                value="PayPal"
              />
              <label className="form-check-label">PayPal or Credit Card</label>
            </div>
          </div>

          <Link to='/placeorder' className='btn btn-success d-flex align-items-center justify-content-center mt-4' type="submit">
            <p
              className="text-white">
              Continue
            </p>
          </Link>
        </form>
      </div>
    </>
  );
};

export default PaymentScreen;
