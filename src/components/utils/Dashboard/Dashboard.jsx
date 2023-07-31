import React, {useMemo, useState} from "react";
import { useHistory, useLocation } from "react-router-dom";
import DashboardNavigation from "./DashboardNavigation";
import DashboardView from "./DashboardView";
import DashProducts from "./DashProducts";
import AddProduct from "./DashboardAddProduct";
import axios from "axios";
import DashBanner from "./DashBanner";
import HistoryOrders from "./OrderHistory";
import SellerApplicationsList from "./SellerApplicationsList";

const Dashboard = () => {
    const [selectedComponent, setSelectedComponent] = useState("dashboard");
    const history = useHistory();

    useMemo(() => {
        if (
            !localStorage.getItem("email") ||
            !localStorage.getItem("username") ||
            !localStorage.getItem("token")
        )
            history.push("/");
        else {
            if (localStorage.getItem("roles")) {
                if (JSON.parse(localStorage.getItem("roles")).includes("USER"))
                    history.push("/");
                if (JSON.parse(localStorage.getItem("roles")).includes("SELLER"))
                    history.push(`/dashboard/${localStorage.getItem("username")}`);
                axios
                    .get(`https://platz-shop-api.onrender.com/api/auth/users`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    })
                    .catch((e) => history.push("/login/403"));
            }
        }
    }, []);

    // Helper function to check if the user is a seller
    const isSeller = () =>
        JSON.parse(localStorage.getItem("roles")).includes("SELLER");

    // Handle navigation item click
    const handleNavigationItemClick = (component) => {
        if (isSeller() && (component === "banners" || component === "customers")) {
            return;
        }
        setSelectedComponent(component);
    };

    return (
        <div className="d-flex h100vh">
            <DashboardNavigation
                onItemClick={handleNavigationItemClick}
                selectedComponent={selectedComponent}
            />
            {selectedComponent === "dashboard" && <DashboardView />}
            {selectedComponent === "products" && <DashProducts />}
            {selectedComponent === "addProduct" && <AddProduct />}
            {selectedComponent === "banners" && localStorage.getItem("roles").includes("ADMIN") && <DashBanner />}
            {selectedComponent === "historyOrder" && <HistoryOrders/>}
            {selectedComponent === "customers" && localStorage.getItem("roles").includes("ADMIN") && <SellerApplicationsList/>}
        </div>
    );
};

export default Dashboard;
