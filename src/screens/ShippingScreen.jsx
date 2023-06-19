import React, {useMemo} from "react";
import {Link, useHistory} from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";

const ShippingScreen = () => {
    const history = useHistory()


    useMemo(() => {
        if (!localStorage.getItem("email") || !localStorage.getItem("username") || !localStorage.getItem("token"))
            history.push("/login/401")
        else {
            axios.get(`http://localhost:5000/api/auth/users`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }).catch(e => history.push("/login/403"))
        }
    }, [])

    window.scrollTo(0, 0);

    let address;
    let city;
    let postalCode;
    let country;

    const saveData = () => {
        localStorage.setItem("delivery_address", JSON.stringify({
            address: address,
            city: city,
            postalCode: postalCode,
            country: country
        }))
    }
    const submitHandler = (e) => {
        e.preventDefault();
    };
    return (
        <>
            <Header/>
            <div className="container d-flex justify-content-center align-items-center login-center">
                <form
                    className="Login col-md-8 col-lg-4 col-11"
                    onSubmit={submitHandler}
                >
                    <h6>DELIVERY ADDRESS</h6>
                    <input type="text" placeholder="Enter address" onChange={e => address = e.target.value}/>
                    <input type="text" placeholder="Enter city" onChange={e => city = e.target.value}/>
                    <input type="text" placeholder="Enter postal code" onChange={e => postalCode = e.target.value}/>
                    <input type="text" placeholder="Enter country" onChange={e => country = e.target.value}/>
                    <div onClick={saveData}>
                        <Link to="/payment"
                              className='btn btn-success d-flex align-items-center justify-content-center mt-4'
                              type="submit">
                            <p className="text-white align-self-center">
                                Continue
                            </p>
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ShippingScreen;
