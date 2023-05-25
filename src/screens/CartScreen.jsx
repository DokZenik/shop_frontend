import React from 'react';
import Header from './../components/Header';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import CartItem from '../components/CartItem';

const CartScreen = () => {
    const dispatch = useDispatch();
    window.scrollTo(0, 0);
    return (
        <>
            <Header/>
            {/* Cart */}
            <div className="container">
                {/* <div className=" alert alert-info text-center mt-3">
          Your cart is empty
          <Link
            className="btn btn-success mx-5 px-5 py-3"
            to="/"
            style={{
              fontSize: "12px",
            }}
          >
            SHOPPING NOW
          </Link>
        </div> */}
                <div className=" alert alert-info text-center mt-3">
                    Total Cart Products
                    <Link
                        className="text-success mx-2"
                        to="/cart">
                        (4)
                    </Link>
                </div>
                {/* cartiterm */}
                <div className="cart-item-row">
                    <CartItem/>
                </div>

                {/* End of cart iterms */}
                <div className="total">
                    <span className="sub">total:</span>
                    <span className="total-price">$567</span>
                </div>
                <hr/>
                <div className="cart-buttons d-flex align-items-center row">
                    <Link
                        to="/"
                        className="col-md-6 ">
                        <button>Continue To Shopping</button>
                    </Link>
                    <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
                        <button>
                            <Link
                                to="/shipping"
                                className="text-white">
                                Checkout
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartScreen;
