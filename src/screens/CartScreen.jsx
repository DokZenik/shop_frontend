import React, {useEffect, useMemo, useState} from 'react';
import Header from './../components/Header';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {getAllItems} from "../data/Products";
import CartItemCounter from "../components/utils/CartItemCounter";
import {addItem, removeItem} from "../data/Cart";

const CartScreen = () => {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("storage")))

    const [totalCount, setTotalCount] = useState(cart.length)
    const [totalPrice, setTotalPrice] = useState([])
    const [sum, setSum] = useState(0);

    const findSum = (arr) => {
        let s = 0
        arr.forEach(elem => s += elem.fullPrice)
        console.log("s: " + s)
        return s
    }
    useMemo(() => {
        const foo = () => {
            let buff = []

            cart.forEach(idNumberItem => {
                console.log(idNumberItem.key)
                let prod = getAllItems().find(elem => elem._id === idNumberItem.key)
                buff.push({key: idNumberItem.key, fullPrice: idNumberItem.value * prod.price})
            })
            // console.log(buff)
            setTotalPrice(buff)
            setSum(findSum(buff))
        }
        foo()
    }, [])

    const incrementItemPrice = (itemId) => {
        let buff = totalPrice
        let prod = getAllItems().find(elem => elem._id === itemId)
        buff = buff.map(elem => {
            if(elem.key === itemId) {
                console.log({key: elem.key, fullPrice: elem.fullPrice + prod.price})
                return {key: elem.key, fullPrice: elem.fullPrice + prod.price}
            }
            else
                return elem
        })

        console.log(buff)

        setTotalPrice(buff)
        setSum(findSum(buff))

    }

    const decrementItemPrice = (itemId) => {
        let buff = totalPrice
        let prod = getAllItems().find(elem => elem._id === itemId)
        buff = buff.map(elem => {
            if(elem.key === itemId) {
                console.log({key: elem.key, fullPrice: elem.fullPrice - prod.price})
                return {key: elem.key, fullPrice: elem.fullPrice - prod.price}
            }
            else
                return elem
        })

        console.log(buff)

        setTotalPrice(buff)
        setSum(findSum(buff))

    }

    const deleteItem = (itemId) => {
        let buffPrice = totalPrice
        buffPrice = buffPrice.filter(elem => elem.key !== itemId)

        let buffItems = cart
        buffItems = buffItems.filter(elem => elem.key !== itemId)

        console.log(buffPrice)
        console.log(buffItems)

        setTotalPrice(buffPrice)
        setSum(findSum(buffPrice))
        setCart(buffItems)
        setTotalCount(buffItems.length)
        localStorage.setItem("storage", JSON.stringify(buffItems))
    }

    window.scrollTo(0, 0);


    return (
        <>
            {/*<Header/>*/}
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
                        let prod = getAllItems().find(elem => elem._id === idNumberItem.key)

                        return (
                            <div className="cart__item" key={idNumberItem.key}>
                                <div className="cart__item-image">
                                    <img src={prod.image} alt=""/>
                                </div>
                                <div className="cart__item-name">
                                    <p>{prod.name}</p>
                                </div>

                                {
                                    totalPrice.find(elem => elem.key === idNumberItem.key) ?
                                        <div className="total__price">
                                            {totalPrice.find(elem => elem.key === idNumberItem.key).fullPrice} $
                                        </div> : "ERROR"
                                }

                                <CartItemCounter
                                    counter={idNumberItem.value}
                                    elemId={idNumberItem.key}
                                    increment={incrementItemPrice}
                                    decrement={decrementItemPrice}
                                />



                                <div className="delete" onClick={() => deleteItem(idNumberItem.key)}>
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
