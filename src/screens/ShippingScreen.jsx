import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const ShippingScreen = () => {
  window.scrollTo(0, 0);

  let address;
  let city;
  let postalCode;
  let country;

  const saveData = () => {
    localStorage.setItem("delivery_address", JSON.stringify({
      address: address,
      city: city,
      postalCode: postalCode,
      country: country
    }))
  }
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
          <input type="text" placeholder="Enter address" onChange={e => address = e.target.value} />
          <input type="text" placeholder="Enter city" onChange={e => city = e.target.value} />
          <input type="text" placeholder="Enter postal code" onChange={e => postalCode = e.target.value}/>
          <input type="text" placeholder="Enter country" onChange={e => country = e.target.value}/>
          <button type="submit" onClick={saveData}>
            <Link to="/payment" className="text-white">
              Continue
            </Link>
          </button>
        </form>
      </div>
    </>
  );
};

export default ShippingScreen;
