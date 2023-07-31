import React, {useContext, useMemo, useState} from "react";
import {useFetching} from "../utils/CustomHooks/useFetching";
import axios from "axios";
import {useHistory} from "react-router-dom";
import Preloader from "../utils/Loaders/Preloader";
import OrderWindow from "../utils/Orders/OrderWindow";
import {CurrencyContext} from "../utils/Currency/CurrensyContext";


const Orders = () => {
    const { baseCurrency } = useContext(CurrencyContext);
    const [orders, setOrders] = useState([])
    const [isOrderListVisible, setOrderListVisible] = useState(false)
    const [orderItems, setOrderItems] = useState([])
    const [conversionRate, setConversionRate] = useState({
        CZK: 1.00,
        EUR: 0.0465,
        PLN: 0.2198,
    });

    const history = useHistory()

    const [loadOrders, areOrdersLoading, error] = useFetching(() => {
        axios.get(`https://platz-shop-api.onrender.com/api/history/getAll/${localStorage.getItem("email")}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => setOrders(res.data)).catch(e => history.push("/login/403"))
    })

    useMemo(() => {
        loadOrders()
    }, [])
    return (
        <>
            {isOrderListVisible
                ? <OrderWindow setVisible={setOrderListVisible} orderItems={orderItems} baseCurrency={baseCurrency}/>
                : null}

            <div className=" d-flex justify-content-center align-items-center flex-column">

                <div className="table-responsive">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>STATUS</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/*<tr className={"alert-success"}>*/}
                        {/*  <td>*/}
                        {/*    <a href={`/`} className="link">*/}
                        {/*      1*/}
                        {/*    </a>*/}
                        {/*  </td>*/}
                        {/*  <td>Paid</td>*/}
                        {/*  <td>Dec 12 2021</td>*/}
                        {/*  <td>$234</td>*/}
                        {/*</tr>*/}
                        {/*/!* Cancelled *!/*/}
                        {/*<tr className={"alert-danger"}>*/}
                        {/*  <td>*/}
                        {/*    <a href={`/`} className="link">*/}
                        {/*      2*/}
                        {/*    </a>*/}
                        {/*  </td>*/}
                        {/*  <td>Not Paid</td>*/}
                        {/*  <td>Dec 12 2021</td>*/}
                        {/*  <td>$34</td>*/}
                        {/*</tr>*/}
                        {areOrdersLoading
                            ? <Preloader/>
                            : orders.map(item => (
                                <tr className={"alert-success"} onClick={() => {
                                    setOrderItems(item.order)
                                    setOrderListVisible(true)
                                }
                                }>
                                    <td>
                                        <a href={`/`} className="link">
                                            {item._id}
                                        </a>
                                    </td>
                                    <td>
                                        {item.status}
                                    </td>
                                    <td>
                                        {item.createdAt.slice(0, 10)}
                                    </td>
                                    <td>
                                        {`${baseCurrency} ${(item.total * conversionRate[baseCurrency]).toFixed(2)}`}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Orders;
