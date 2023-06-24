import React, {useMemo, useState} from "react";
import DashboardNavigation from "./DashboardNavigation";
import DashboardView from "./DashboardView";
import DashProducts from "./DashProducts";
import AddProduct from "./DashboardAddProduct";
import {useHistory} from "react-router-dom";
import axios from "axios";
import DashBanner from "./DashBanner";
import HistoryOrders from "./OrderHistory";

const Dashboard = () => {
    const [selectedComponent, setSelectedComponent] = useState("dashboard");
    const history = useHistory()


    const handleNavigationItemClick = (component) => {
        setSelectedComponent(component);
    };

    useMemo(() => {
        if (!localStorage.getItem("email") || !localStorage.getItem("username" || !localStorage.getItem("token")))
            history.push("/")
        else {
            if (localStorage.getItem("roles"))
                if (JSON.parse(localStorage.getItem("roles")).includes("USER"))
                    history.push("/")
            axios.get(`https://platz-shop-api.onrender.com/api/auth/users`,  {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }).catch(e => history.push("/login/403"))
        }
    }, [])

    return (
        <div className="d-flex h100vh">
            <DashboardNavigation
                onItemClick={handleNavigationItemClick}
                selectedComponent={selectedComponent}
            />
            {selectedComponent === "dashboard" && <DashboardView />}
            {selectedComponent === "products" && <DashProducts />}
            {selectedComponent === "addProduct" && <AddProduct />}
            {selectedComponent === "banners" && <DashBanner />}
            {selectedComponent === "historyOrder" && <HistoryOrders />}
        </div>
    );
};

export default Dashboard;
