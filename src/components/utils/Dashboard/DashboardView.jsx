import React, {useEffect, useMemo, useState} from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import classes from '../Dashboard/Dashboard.module.css';
import axios from "axios";

const DashboardView = () => {
    const [totalSales, setTotalSales] = useState(0);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [salesData, setSalesData] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('https://platz-shop-api.onrender.com/api/history/getAll', {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            // Update the sales data
            setSalesData(response.data);

            // Calculate total sales by date
            const selectedDateISO = selectedDate.toISOString().split('T')[0];
            const totalSalesByDate = response.data.reduce((total, order) => {
                const orderDate = new Date(order.createdAt).toISOString().split('T')[0];
                if (orderDate === selectedDateISO) {
                    total += order.total;
                }
                return total;
            }, 0);

            // Update the total sales state
            setTotalSales(totalSalesByDate);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [selectedDate]);

    const handleChange = (e) => {
        const date = new Date(e.target.value);
        setSelectedDate(date);
    };

    return (
        <>
            <div className={`${classes['view-main']} d-flex align-items-start p-5 flex-column gap-5 flex-1`}>
                <div className={`d-flex flex-column gap-3 align-items-center`}>
                    <h1 className={`${classes['text-title']}`}>Dashboard</h1>
                    <div className={`${classes['dashboard-calendar']}`}>
                        <input
                            type="date"
                            value={selectedDate.toISOString().split('T')[0]}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className={`${classes['dashboard-graphs']} d-flex align-items-center justify-content-between gap-5`}>
                    <div className={`${classes['dashboard-graph_item']} d-flex flex-column`}>
                        <p>Total sales</p>
                        <LineChart width={600} height={300} data={salesData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="sales" stroke="#8884d8" />
                        </LineChart>
                        <p className={`${classes.bolder}`}>{totalSales}</p>
                    </div>
                    {/*<div className={`${classes['dashboard-graph_item']} d-flex flex-column`}>*/}
                    {/*    <p>Total sales</p>*/}
                    {/*    <p className={`${classes.bolder}`}>25600$</p>*/}
                    {/*</div>*/}
                    {/*<div className={`${classes['dashboard-graph_item']} d-flex flex-column`}>*/}
                    {/*    <p>Total sales</p>*/}
                    {/*    <p className={`${classes.bolder}`}>25600$</p>*/}
                    {/*</div>*/}
                </div>
            </div>
        </>
    );
};

export default DashboardView;
