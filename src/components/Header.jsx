import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import SearchProduct from "./utils/search/SearchProduct";
import Category from "./homeComponents/Category";
import axios from "axios";

const Header = ({setVisible, cartEnable, filteredItems, setFilteredItems, filterEnable, profileButtonVisible}) => {
    const [cartCount, setCartCount] = useState(0);
    const [prod, setProd] = useState([])
    const history = useHistory();
    const [categories, setCategories] = useState([])

    useEffect(() => {
        if (prod.length === 0) {
            console.log("TEST")
            setProd(filteredItems)
        }
    }, [filteredItems])


    const userValidate = () => {
        axios.get("http://localhost:5000/api/auth/users", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .catch(e => history.push("/login/403"))
    }
    return (
        <div>
            {/* Top Header */}
            <div className="Announcement ">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-md-6 d-flex align-items-center display-none justify-content-between">
                            <p>+420 728 445 671</p>
                            <p>zbonted@gmail.com</p>
                        </div>
                        <div
                            className="icons col-12 col-lg-6 justify-content-center justify-content-lg-end d-flex align-items-center">
                            <Link to="">
                                <i className="fab fa-facebook-f"></i>
                            </Link>
                            <Link to="">
                                <i className="fab fa-instagram"></i>
                            </Link>
                            <Link to="">
                                <i className="fab fa-linkedin-in"></i>
                            </Link>
                            <Link to="">
                                <i className="fab fa-youtube"></i>
                            </Link>
                            <Link to="">
                                <i className="fab fa-pinterest-p"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* Header */}
            <div className="header">
                <div className="container-xxl">
                    {/* MOBILE HEADER */}
                    <div className="mobile-header">
                        <div className="container ">
                            <div className="row flex-nowrap mobile-top">
                                <div className="col-3 d-flex align-items-center">
                                    <Link
                                        className="navbar-brand"
                                        to="/">
                                        <img
                                            alt="logo"
                                            src="/images/logo.png"
                                        />
                                    </Link>
                                </div>
                                {filterEnable
                                    ? <div className="col-6 d-flex align-items-center search-adaptive">
                                        <SearchProduct products={prod} setFilteredItems={setFilteredItems} categories={categories}/>
                                    </div>
                                    : null}
                                <div className="col-3 d-flex align-items-center justify-content-end Login-Register">
                                    <div className="btn-group">
                                        <button
                                            type="button"
                                            className="name-button dropdown-toggle"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false">
                                            <i class="fas fa-user"></i>
                                        </button>
                                        <div className="dropdown-menu">
                                            <Link
                                                className="dropdown-item"
                                                to="/profile">
                                                Profile
                                            </Link>

                                            <Link
                                                className="dropdown-item"
                                                to="#">
                                                Logout
                                            </Link>
                                        </div>
                                    </div>
                                    {cartEnable
                                        ?
                                        <div className={"cart_icon__wrapper"} onClick={() => setVisible(true)}>
                                            <i className="fas fa-shopping-bag"></i>
                                            {/*{console.log(cartCount)}*/}
                                            {cartCount !== 0
                                                ? <span className="badge">{cartCount}</span>
                                                : null}

                                        </div>
                                        : null}
                                </div>
                            </div>
                            {filterEnable
                                ? <div className="d-flex align-items-center justify-content-center search-small">
                                    <SearchProduct products={prod} setFilteredItems={setFilteredItems} categories={categories}/>
                                </div>
                                : null}
                        </div>
                    </div>

                    {/* PC HEADER */}
                    <div className="pc-header">
                        <div className="d-flex justify-content-center gap-5">
                            <div className="d-flex align-items-center justify-content-start flex-1">
                                <Link
                                    className="navbar-brand"
                                    to="/">
                                    <img
                                        alt="logo"
                                        src="/images/logo.png"
                                    />
                                </Link>
                                <Category setFilteredItems={setFilteredItems} products={prod} setCategories={setCategories}/>
                            </div>
                            <div className="w-50 flex-1">
                                {filterEnable
                                    ? <SearchProduct products={prod} setFilteredItems={setFilteredItems} categories={categories}/>
                                    : null}
                            </div>

                            <div className="d-flex align-items-center justify-content-end Login-Register gap-3">
                                {profileButtonVisible
                                    ? localStorage.getItem("email") && localStorage.getItem("token")
                                        ? <div className="btn-group">
                                            <button
                                                type="button"
                                                className="name-button dropdown-toggle"
                                                data-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false">
                                                Hi, {localStorage.getItem("username")}
                                            </button>
                                            <div className="dropdown-menu">
                                                <Link
                                                    className="dropdown-item"
                                                    to="/profile">
                                                    Profile
                                                </Link>

                                                <Link
                                                    className="dropdown-item"
                                                    to="#">
                                                    <div onClick={() => {
                                                        localStorage.removeItem("token")
                                                        localStorage.removeItem("username")
                                                        localStorage.removeItem("email")
                                                        localStorage.removeItem("roles")
                                                    }}>Logout
                                                    </div>

                                                </Link>
                                            </div>
                                        </div>
                                        : <button className={"login__button"} onClick={() => history.push("/login/0")}>
                                            login
                                        </button>
                                    : null
                                }


                                {cartEnable
                                    ?
                                    <div className={"cart_icon__wrapper"} onClick={() => {
                                        if (!localStorage.getItem("token"))
                                            history.push("/login/401")
                                        else
                                            userValidate()
                                            setVisible(true)
                                    }}>
                                        <i className="fas fa-shopping-bag"></i>
                                        {/*{console.log(cartCount)}*/}
                                        {cartCount !== 0
                                            ? <span className="badge">{cartCount}</span>
                                            : null}

                                    </div>
                                    : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
