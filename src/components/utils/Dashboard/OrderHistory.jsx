import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';


const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
};

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
        <div className="container mx-5">
            <h2 className="my-4">History of Orders</h2>
            {orders.map((order) => (
                <div key={order._id} className="card mb-4">
                    <div className="card-header">
                        Order ID: {order._id}
                    </div>
                    <div className="card-body">
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th>Product name</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                            </thead>
                            <tbody>
                            {order.order.map((item) => (
                                <tr key={item._id}>
                                    <td>{item.product.name}</td>
                                    <td>{item.count}</td>
                                    <td>{`${order.total}`}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="card-footer">
                        <div className="row">
                            <div className="col-md-6">
                                User ID: {order.userId}
                            </div>
                            <div className="col-md-6 text-md-end">
                                Date: {formatDate(order.createdAt)}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HistoryOrders;
