import React, {useMemo, useState} from "react";
import DashboardNavigation from "./DashboardNavigation";
import DashboardView from "./DashboardView";
import DashProducts from "./DashProducts";
import AddProduct from "./DashboardAddProduct";
import {useHistory} from "react-router-dom";
import axios from "axios";

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
            axios.get(`http://localhost:5000/api/auth/users`, {}, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }).catch(e => history.push("/"))
        }
    }, [])

    return (
        <div className="d-flex">
            <DashboardNavigation
                onItemClick={handleNavigationItemClick}
                selectedComponent={selectedComponent}
            />
            {selectedComponent === "dashboard" && <DashboardView/>}
            {selectedComponent === "products" && <DashProducts/>}
            {selectedComponent === "addProduct" && <AddProduct/>}
        </div>
    );
};

export default Dashboard;
