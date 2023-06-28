import React, { useMemo, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";

const ShippingScreen = () => {
    const history = useHistory()


    useMemo(() => {
        if (
            !localStorage.getItem("email") ||
            !localStorage.getItem("username") ||
            !localStorage.getItem("token")
        )
            history.push("/login/401");
        else {
            axios.get(`https://platz-shop-api.onrender.com/api/auth/users`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }).catch(e => history.push("/login/403"))
        }
    }, [])

    window.scrollTo(0, 0);

    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");

    const saveData = () => {
        localStorage.setItem(
            "delivery_address",
            JSON.stringify({
                address: address,
                city: city,
                postalCode: postalCode,
                country: country,
            })
        );
    };

    const submitHandler = (e) => {
        e.preventDefault();
        // Check if all fields are filled
        if (address && city && postalCode && country) {
            // Proceed with the form submission
            saveData();
            history.push('/payment');
            console.log("Form submitted!");
        } else {
            // Display an error message or handle incomplete fields
            alert("Please fill in all fields!");
        }
    };
    return (
        <>
            <Header />
            <div className="container d-flex justify-content-center align-items-center login-center">
                <form className="Login col-md-8 col-lg-4 col-11" onSubmit={submitHandler}>
                    <h6>DELIVERY ADDRESS</h6>
                    <input
                        type="text"
                        placeholder="Enter address"
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Enter city"
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Enter postal code"
                        onChange={(e) => setPostalCode(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Enter country"
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                    <div onClick={saveData}>
                        <button
                            className="btn btn-success d-flex align-items-center justify-content-center mt-4"
                            type="submit"
                        >
                            <p className="text-white align-self-center">Continue</p>
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ShippingScreen;
