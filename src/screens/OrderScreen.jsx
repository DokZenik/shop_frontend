import React, {useMemo, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import Header from "./../components/Header";
import {PayPalButton} from "react-paypal-button-v2";
import {useFetching} from "../components/utils/CustomHooks/useFetching";
import axios from "axios";
import Preloader from "../components/utils/Preloader/Preloader";

const OrderScreen = () => {
    window.scrollTo(0, 0);

    const [items, setItems] = useState([])
    const history = useHistory()
    let productsTotalPrice = 0;
    let tax = 0;
    let shippingPrice = 0
    let total = 0;
    let deliveryData = JSON.parse(localStorage.getItem("delivery_address"))

    const [fetchOrderItems, areOrderItemsLoading, error] = useFetching(async () => {
        axios.get(`https://platz-shop-api.onrender.com/api/cart/${localStorage.getItem("email")}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => setItems(res.data))
            .catch(e => history.push("/login/403"))
    })

    useMemo(() => {
        if (!localStorage.getItem("email") || !localStorage.getItem("username") || !localStorage.getItem("token"))
            history.push("/login/401")
        else {
            axios.get(`https://platz-shop-api.onrender.com/api/auth/users`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }).then(res => fetchOrderItems()).catch(e => history.push("/login/403"))
        }
    }, [])

    const paymentHandler = async () => {
        await axios.post(`https://platz-shop-api.onrender.com/api/history/addItem`, {
            item: {
                userId: localStorage.getItem("email"),
                order: items,
                total: productsTotalPrice,
                status: "PAID"
            }
        }, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })

        await axios.delete(`https://platz-shop-api.onrender.com/api/cart/clear/${localStorage.getItem("email")}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => console.log(res)).catch(e => console.log(e))
        localStorage.removeItem("delivery_address")
    }
    const onApprove = (data, actions) => {
        // Handle the payment approval
        return actions.order.capture().then(function (details) {
            console.log("Payment successful:", details);
            // Perform any necessary actions with the payment details
        });
    };

    return (
        <>
            <Header/>
            <div className="container">
                <div className="row order-detail">
                    <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                        <div className="row">
                            <div className="col-md-4 center">
                                <div className="alert-success order-box">
                                    <i className="fas fa-user"></i>
                                </div>
                            </div>
                            <div className="col-md-8 center">
                                <h5>
                                    <strong>Customer</strong>
                                </h5>
                                <p>{localStorage.getItem("username")}</p>
                                <p>{localStorage.getItem("email")}</p>
                            </div>
                        </div>
                    </div>
                    {/* 2 */}
                    <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                        <div className="row">
                            <div className="col-md-4 center">
                                <div className="alert-success order-box">
                                    <i className="fas fa-truck-moving"></i>
                                </div>
                            </div>
                            <div className="col-md-8 center">
                                <h5>
                                    <strong>Order info</strong>
                                </h5>
                                <p>Shipping: Tanzania</p>
                                <p>Pay method: Paypal</p>

                                <div className="bg-info p-2 col-12">
                                    <p className="text-white text-center text-sm-start">
                                        Paid on Jan 12 2021
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 3 */}
                    <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                        <div className="row">
                            <div className="col-md-4 center">
                                <div className="alert-success order-box">
                                    <i className="fas fa-map-marker-alt"></i>
                                </div>
                            </div>
                            <div className="col-md-8 center">
                                <h5>
                                    <strong>Deliver to</strong>
                                </h5>
                                <p>
                                    Address: {deliveryData.address}, {deliveryData.city}, P.O
                                    BOX {deliveryData.postalCode} {deliveryData.country}
                                </p>
                                <div className="bg-danger p-1 col-12">
                                    <p className="text-white text-center text-sm-start">
                                        Not Delivered
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row order-products justify-content-between">
                    <div className="col-lg-8">
                        {/* <Message variant="alert-info mt-5">Your order is empty</Message> */}

                        {areOrderItemsLoading
                            ? <Preloader/>
                            : <div>
                                {items.map(elem => {
                                        productsTotalPrice += elem.count * elem.product.price
                                        return (
                                            <div className="order-product row">
                                                <div className="col-md-3 col-6">
                                                    <Swiper
                                                        pagination={{
                                                            dynamicBullets: true,
                                                        }}
                                                        modules={[Pagination]}>
                                                        {elem.product.images && elem.product.images.map((image, index) => (
                                                            <SwiperSlide key={index} virtualIndex={index}>
                                                                <img src={image} alt={elem.product.name} />
                                                            </SwiperSlide>
                                                        ))}
                                                    </Swiper>
                                                </div>
                                                <div className="col-md-5 col-6 d-flex align-items-center">
                                                    <Link to={"/"}>
                                                        <h6>{elem.product.name}</h6>
                                                    </Link>
                                                </div>
                                                <div
                                                    className="mt-3 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center ">
                                                    <h4>QUANTITY</h4>
                                                    <h6>{elem.count}</h6>
                                                </div>
                                                <div
                                                    className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center ">
                                                    <h4>SUBTOTAL</h4>
                                                    <h6>{elem.count * elem.product.price}$</h6>
                                                </div>
                                            </div>
                                        )
                                    }
                                )}
                            </div>
                        }
                    </div>
                    {/* total */}
                    <div className="col-lg-3 d-flex align-items-end flex-column mt-5 subtotal-order">
                        <table className="table table-bordered">
                            <tbody>
                            <tr>
                                <td>
                                    <strong>Products</strong>
                                </td>
                                <td>${productsTotalPrice}</td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>Shipping</strong>
                                </td>
                                <td>${shippingPrice}</td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>Tax</strong>
                                </td>
                                <td>${tax}</td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>Total</strong>
                                </td>
                                <td>${productsTotalPrice + shippingPrice + tax}</td>
                            </tr>
                            </tbody>
                        </table>
                        <div className="col-12">
                            <PayPalButton fundingSource={'paypal'}
                                          style={{layout: "horizontal"}}
                                          createOrder={(data, actions) => {
                                              return actions.order.create({
                                                  purchase_units: [
                                                      {
                                                          amount: {
                                                              currency_code: "USD",
                                                              value: (
                                                                  productsTotalPrice + shippingPrice + tax
                                                              ).toFixed(2),
                                                          },
                                                      },
                                                  ],
                                              });
                                          }}
                                          onApprove={onApprove}
                            />
                        </div>
                        <button onClick={paymentHandler}>TEST</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderScreen;
