import React, { useState } from "react";
import DashboardNavigation from "./DashboardNavigation";
import DashboardView from "./DashboardView";
import DashProducts from "./DashProducts";
import AddProduct from "./DashboardAddProduct";

const Dashboard = () => {
    const [selectedComponent, setSelectedComponent] = useState("dashboard");

    const handleNavigationItemClick = (component) => {
        setSelectedComponent(component);
    };

    return (
        <div className="d-flex">
            <DashboardNavigation
                onItemClick={handleNavigationItemClick}
                selectedComponent={selectedComponent}
            />
            {selectedComponent === "dashboard" && <DashboardView />}
            {selectedComponent === "products" && <DashProducts />}
            {selectedComponent === "addProduct" && <AddProduct />}
        </div>
    );
};

export default Dashboard;
