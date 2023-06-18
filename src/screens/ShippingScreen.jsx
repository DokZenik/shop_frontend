import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const ShippingScreen = () => {
  window.scrollTo(0, 0);

  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <h6>DELIVERY ADDRESS</h6>
          <input type="text" placeholder="Enter address" />
          <input type="text" placeholder="Enter city" />
          <input type="text" placeholder="Enter postal code" />
          <input type="text" placeholder="Enter country" />
          <Link to="/payment" className='btn btn-success d-flex align-items-center justify-content-center mt-4' type="submit">
            <p className="text-white align-self-center">
              Continue
            </p>
          </Link>
        </form>
      </div>
    </>
  );
};

export default ShippingScreen;
