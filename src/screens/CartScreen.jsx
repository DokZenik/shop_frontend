import React, {useEffect, useMemo, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import CartItemCounter from "../components/utils/CartItemCounter";
import axios from "axios";

const CartScreen = ({setVisible}) => {
    const [cart, setCart] = useState([])
    const [totalCount, setTotalCount] = useState(cart.length)
    const [totalItemsPrice, setTotalItemsPrice] = useState([])
    const [sum, setSum] = useState(0);
    const history = useHistory()


    useMemo(() => {
        if (localStorage.getItem("email") && localStorage.getItem("token"))
            axios.get(`http://localhost:5000/api/cart/${localStorage.getItem("email")}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
                .then(res => {
                    let sum = 0
                    setCart(res.data.map(elem => {
                        const newItem = {...elem.product, count: elem.count}
                        sum += newItem.count * newItem.price
                        totalItemsPrice.push({itemId: newItem._id, totalPrice: newItem.count * newItem.price})
                        return newItem
                    }))
                    setSum(sum)
                })
                .catch(error => {
                    console.log(error)
                    history.push("/login")
                })
    }, [])

    const incrementItemPrice = (itemId) => {
        const price = cart.find(item => item._id === itemId).price
        console.log(price)
        setTotalItemsPrice(totalItemsPrice.map(elem =>
            elem.itemId === itemId
                ? {
                    itemId: elem.itemId,
                    totalPrice: elem.totalPrice + price
                }
                : elem
        ))
        axios.put(`http://localhost:5000/api/cart/increment/${localStorage.getItem("email")}/${itemId}`, {}, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).catch(e => e.status === 403 ? history.push("/login") : null)
        setSum(sum + price)
    }

    const decrementItemPrice = (itemId) => {
        const price = cart.find(item => item._id === itemId).price
        console.log(price)
        setTotalItemsPrice(totalItemsPrice.map(elem =>
            elem.itemId === itemId
                ? {
                    itemId: elem.itemId,
                    totalPrice: elem.totalPrice - price
                }
                : elem
        ))
        axios.put(`http://localhost:5000/api/cart/decrement/${localStorage.getItem("email")}/${itemId}`, {}, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).catch(e => e.status === 403 ? history.push("/login") : null)
        setSum(sum - price)
    }

    const deleteItem = (itemId) => {
        setCart(cart.filter(elem => elem._id !== itemId))
        setSum(sum - totalItemsPrice.find(elem => elem.itemId === itemId).totalPrice)
        setTotalItemsPrice(totalItemsPrice.filter(elem => elem.itemId !== itemId))
        axios.delete(`http://localhost:5000/api/cart/${localStorage.getItem("email")}/${itemId}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .catch(e => e.status === 403 ? history.push("/login") : null)
    }

    window.scrollTo(0, 0);


    return (
        <>
            {/*<Header/>*/}
            <div className="cart__container">
                <div className=" alert alert-info text-center mt-3">
                    Total Cart Products
                    <Link
                        className="text-success mx-2"
                        to="/cart">
                        ({totalCount})
                    </Link>
                </div>

                {cart.length !== 0
                    ? <div className="cart__items">
                        {cart.map(item => (
                            <div className={"cart__item"} key={item._id}>
                                <div className="cart__item-image">
                                    <img src={item.image} alt="Item image"/>
                                </div>
                                <div className="cart__item-name">
                                    <p>{item.name}</p>
                                </div>
                                <div className="cart__item-price">
                                    <p>{totalItemsPrice.find(elem => elem.itemId === item._id).totalPrice} $</p>
                                </div>
                                <CartItemCounter
                                    counter={item.count}
                                    elemId={item._id}
                                    decrement={decrementItemPrice}
                                    increment={incrementItemPrice}
                                />
                                <div className="delete" onClick={() => deleteItem(item._id)}>
                                    del
                                </div>
                            </div>
                        ))}
                    </div>
                    : null}


                <div className="total">
                    <span className="sub">total:</span>
                    <span className="total-price">{sum}$</span>
                </div>
                <hr/>
                <div className="cart-buttons d-flex align-items-center row">
                    <div
                        onClick={() => setVisible(false)}
                        className="col-md-6 ">
                        <button className={"bg-black"}>Continue To Shopping</button>
                    </div>
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
