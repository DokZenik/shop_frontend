import React, {useState} from 'react';
import Header from './../components/Header';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import products from "../data/Products";
import CartItemCounter from "../components/utils/CartItemCounter";
import {addItem, removeItem} from "../data/Cart";

const CartScreen = () => {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("storage")))

    const [totalCount, setTotalCount] = useState(cart.length)
    const [totalPrice, setTotalPrice] = useState([])
    const [sum, setSum] = useState(0);

    const dispatch = useDispatch();
    window.scrollTo(0, 0);


    const incrementPrice = (id) => {
        let prod = products.find(elem => elem._id === id)

        setTotalPrice(totalPrice.map(elem => {
            if (elem.key === id) {
                setSum(sum + prod.price)
                return {
                    key: id,
                    value: elem.value = elem.value + prod.price
                }
            }else
                return {
                    key: id,
                    value: elem.value
                }
        }))
    }

    const decrementPrice = (id) => {
        let prod = products.find(elem => elem._id === id)

        setTotalPrice(totalPrice.map(elem => {
            if (elem.key === id) {
                setSum(sum - prod.price)
                return {
                    key: id,
                    value: elem.value = elem.value - prod.price
                }
            }else
                return {
                    key: id,
                    value: elem.value
                }
        }))
    }

    return (
        <>
            <Header/>
            <div className="container">
                <div className=" alert alert-info text-center mt-3">
                    Total Cart Products
                    <Link
                        className="text-success mx-2"
                        to="/cart">
                        ({totalCount})
                    </Link>
                </div>


                <div className="cart__items">
                    {cart.map(idNumberItem => {
                        let prod = products.find(elem => elem._id === idNumberItem.key)
                        totalPrice.push({key: idNumberItem.key, value: prod.price * idNumberItem.value})

                        let buff = 0;
                        totalPrice.forEach(elem => buff += elem.value)
                        console.log(buff)

                        // setSum(buff)

                        return (
                            <div className="cart__item">
                                <div className="cart__item-image">
                                    <img src={prod.image} alt=""/>
                                </div>
                                <div className="cart__item-name">
                                    <p>{prod.name}</p>
                                </div>

                                <CartItemCounter
                                    counter={idNumberItem.value}
                                    elemId={idNumberItem.key}
                                    increment={incrementPrice}
                                    decrement={decrementPrice}/>

                                <div className="total__price">
                                    {totalPrice.find(elem => elem.key === idNumberItem.key).value} $
                                </div>

                                <div className="delete" onClick={() => {
                                    let buff = cart.filter(elem => elem.key !== idNumberItem.key)
                                    setCart(buff)
                                    localStorage.setItem("storage", JSON.stringify(buff))
                                    setTotalCount(totalCount - 1)
                                }
                                }>
                                    {/*<svg fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">*/}
                                    {/*    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>*/}
                                    {/*    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>*/}
                                    {/*    <g id="SVGRepo_iconCarrier">*/}
                                    {/*        <path*/}
                                    {/*            d="M7.004 23.087l7.08-7.081-7.07-7.071L8.929 7.02l7.067 7.069L23.084 7l1.912 1.913-7.089 7.093 7.075 7.077-1.912 1.913-7.074-7.073L8.917 25z"></path>*/}
                                    {/*    </g>*/}
                                    {/*</svg>*/}
                                    del
                                </div>
                            </div>
                        )
                    })}
                </div>


                <div className="total">
                    <span className="sub">total:</span>
                    <span className="total-price">{sum}$</span>
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
