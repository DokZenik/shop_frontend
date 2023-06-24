import React, {useEffect, useMemo, useState} from 'react';
import axios from 'axios';


const HistoryOrders = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('https://platz-shop-api.onrender.com/api/history/getAll', {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            console.log(response)
            setOrders(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useMemo(() => {
        fetchOrders();
    }, []);

    return (
        <div>
            <h2>History of Orders</h2>
            {orders.map((order) => (
                <div key={order._id}>
                    <p>Order ID: {order._id}</p>
                    <p>User ID: {order.userId}</p>
                    <p>Order date: {order.createdAt}</p>
                    <p>Order Items:</p>
                    <ul>
                        {order.order.map((item) => (
                            <li key={item._id}>
                                Product: {item.product.name} - Quantity: {item.count}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default HistoryOrders;

