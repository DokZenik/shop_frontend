import React, {useMemo} from 'react';
import {Link, useHistory} from 'react-router-dom';
import Header from './../components/Header';
import axios from "axios";

const PaymentScreen = () => {
  window.scrollTo(0, 0);

  const history = useHistory();
  const [paymentMethod, setPaymentMethod] = useState('');

  useMemo(() => {
    if (
        !localStorage.getItem('email') ||
        !localStorage.getItem('username') ||
        !localStorage.getItem('token')
    )
      history.push('/login/401');
    else {
      axios.get(`https://platz-shop-api.onrender.com/api/auth/users`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      }).catch(e => history.push("/login/403"))
    }
  }, [])



  const submitHandler = (e) => {
    e.preventDefault();
    if (paymentMethod) {
      history.push('/placeorder');
      console.log('Form submitted!');
    } else {
      // Display an alert message
      alert('Please select a payment method!');
    }
  };
  return (
      <>
        <Header />
        <div className="container d-flex justify-content-center align-items-center login-center">
          <form className="Login2 col-md-8 col-lg-4 col-11" onSubmit={submitHandler}>
            <h6>SELECT PAYMENT METHOD</h6>
            <div className="payment-container">
              <div className="radio-container">
                <input
                    className="form-check-input"
                    type="radio"
                    value="PayPal"
                    required
                    checked={paymentMethod === 'PayPal'}
                    onChange={() => setPaymentMethod('PayPal')}
                />
                <label className="form-check-label">PayPal or Credit Card</label>
              </div>
            </div>

            <button className="btn btn-success d-flex align-items-center justify-content-center mt-4" type="submit">
              <p className="text-white">Continue</p>
            </button>
          </form>
        </div>
      </>
  );
};

export default PaymentScreen;
