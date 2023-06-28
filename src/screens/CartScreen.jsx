import React, {useContext, useEffect, useMemo, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import CartItemCounter from "../components/utils/CartItemCounter";
import axios from "axios";
import {CurrencyContext} from "../components/utils/Currency/CurrensyContext";
import {Pagination} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";


const CartScreen = ({setVisible}) => {
    const { baseCurrency, handleCurrencyChange } = useContext(CurrencyContext);
    const [cart, setCart] = useState([])
    const [totalCount, setTotalCount] = useState(cart.length)
    const [totalItemsPrice, setTotalItemsPrice] = useState([])
    const [sum, setSum] = useState(0);
    const history = useHistory()
    const [conversionRate, setConversionRate] = useState({
        CZK: 21.50,
        EUR: 1.00,
        PLN: 4.55
    });


    useMemo(() => {
        if (localStorage.getItem("email") && localStorage.getItem("token"))
            axios.get(`https://platz-shop-api.onrender.com/api/cart/${localStorage.getItem("email")}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
                .then(res => {
                    if (res.status !== 200)
                        history.push(`/login/${res.status}`)
                    let sum = 0;
                    setCart(res.data.map(elem => {
                        const newItem = {...elem.product, count: elem.count};
                        const itemPrice = newItem.price * conversionRate[baseCurrency];
                        sum += newItem.count * itemPrice;
                        totalItemsPrice.push({itemId: newItem._id, totalPrice: newItem.count * itemPrice * conversionRate[baseCurrency]});
                        return newItem;
                    }));
                    setSum(sum);
                    console.log(sum)
                });
    }, []);


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
        axios.put(`https://platz-shop-api.onrender.com/api/cart/increment/${localStorage.getItem("email")}/${itemId}`, {}, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).catch(e => e.status === 403 ? history.push("/login/403") : null)
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
        axios.put(`https://platz-shop-api.onrender.com/api/cart/decrement/${localStorage.getItem("email")}/${itemId}`, {}, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).catch(e => e.status === 403 ? history.push("/login/403") : null)
        setSum(sum - price)
    }

    const deleteItem = (itemId) => {
        setCart(cart.filter(elem => elem._id !== itemId))
        setSum(sum - totalItemsPrice.find(elem => elem.itemId === itemId).totalPrice)
        setTotalItemsPrice(totalItemsPrice.filter(elem => elem.itemId !== itemId))
        axios.delete(`https://platz-shop-api.onrender.com/api/cart/${localStorage.getItem("email")}/${itemId}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .catch(e => e.status === 403 ? history.push("/login/403") : null)
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

                {cart.length !== 0 ? (
                    <div className="cart__items">
                        {cart.map(item => (
                            <div className={"cart__item"} key={item._id}>
                                <div className="cart__item-image">
                                    <Swiper
                                        pagination={{
                                            dynamicBullets: true,
                                        }}
                                        modules={[Pagination]}>
                                        {item.images && item.images.map((image, index) => (
                                            <SwiperSlide key={index} virtualIndex={index}>
                                                <img src={image[0]} alt={item.name} />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                                <div className="cart__item-name">
                                    <p>{item.name}</p>
                                </div>
                                <div className="cart__item-price">
                                    <p>
                                        {totalItemsPrice.find(elem => elem.itemId === item._id).totalPrice * conversionRate[baseCurrency]} {baseCurrency}
                                    </p>
                                </div>
                                <CartItemCounter
                                    maxItems={item.countInStock}
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
                ) : null}

                <div className="total">
                    <span className="sub">total:</span>
                    <span className="total-price">{(sum * conversionRate[baseCurrency]).toFixed(2)} {baseCurrency}</span>
                </div>

                <hr/>
                <div className="cart-buttons d-flex align-items-center row">
                    <div
                        onClick={() => setVisible(false)}
                        className="col-md-6 ">
                        <button className={"bg-black"}>Continue To Shopping</button>
                    </div>
                    <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">

                        {cart.length !== 0
                            ? <Link to="/shipping" className='cart-buttons cart-btn'>
                                <p
                                    className="text-white">
                                    Checkout
                                </p>
                            </Link>
                            : <div className='cart-buttons cart-btn'>
                                <p
                                    className="text-white">
                                    Checkout
                                </p>
                            </div>}

                    </div>
                </div>
            </div>
        </>
    );
};

export default CartScreen;
