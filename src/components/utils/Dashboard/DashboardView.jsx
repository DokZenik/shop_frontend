import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import classes from '../Dashboard/Dashboard.module.css';

const DashboardView = () => {
    const [totalSales, setTotalSales] = useState(0);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [salesData, setSalesData] = useState([]);

    const handleDateSelect = (date) => {
        const generatedSalesData = generateSalesData(date);
        setSalesData(generatedSalesData);
        calculateTotalSales(generatedSalesData);
    };

    const handleChange = (e) => {
        const date = new Date(e.target.value);
        setSelectedDate(date);
        handleDateSelect(date);
    };

    const generateSalesData = (selectedDate) => {
        const data = [];
        const startDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
        const endDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);

        for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
            const sales = Math.floor(Math.random() * 1000) + 1;
            data.push({ date: date.toISOString().split('T')[0], sales });
        }

        return data;
    };
    const calculateTotalSales = (data) => {
        const total = data.reduce((accumulator, currentValue) => accumulator + currentValue.sales, 0);
        setTotalSales(total);
    };

    return (
        <>
            <div className={`${classes['view-main']} d-flex align-items-start p-5 flex-column gap-5`}>
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
                    <div className={`${classes['dashboard-graph_item']} d-flex flex-column`}>
                        <p>Total sales</p>
                        <p className={`${classes.bolder}`}>25600$</p>
                    </div>
                    <div className={`${classes['dashboard-graph_item']} d-flex flex-column`}>
                        <p>Total sales</p>
                        <p className={`${classes.bolder}`}>25600$</p>
                    </div>
                </div>
                <div className={`${classes['dashboard-orders']} d-flex flex-column gap-5`}>
                    <h2>Recently orders</h2>
                    <table>
                        <thead>
                        <tr>
                            <th>Product name</th>
                            <th>Product id</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>ProductName</td>
                            <td>2281337</td>
                            <td>Successful</td>
                            <td>Delivered</td>
                            <td>Details</td>
                        </tr>
                        </tbody>
                    </table>
                    <button className={`btn btn-dark`}>Show All</button>
                </div>
            </div>
        </>
    );
};

export default DashboardView;
