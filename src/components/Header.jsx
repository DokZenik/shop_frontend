import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import SearchProduct from "./utils/search/SearchProduct";

const Header = ({setVisible, cartEnable, filteredItems, setFilteredItems, filterEnable}) => {
    const [cartCount, setCartCount] = useState(JSON.parse(localStorage.getItem("storage")).length);
    const [prod, setProd] = useState([])
    const history = useHistory();


    useEffect(() => {
        let buff = 0;
        JSON.parse(localStorage.getItem("storage")).forEach(elem => buff += elem.value)
        setCartCount(buff)
    }, [JSON.parse(localStorage.getItem("storage")).length])

    useEffect(() => {
        if (prod.length === 0)
            setProd(filteredItems)
    }, [filteredItems])

    return (
        <div>
            {/* Top Header */}
            <div className="Announcement ">
                <div className="container">
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
                <div className="container">
                    {/* MOBILE HEADER */}
                    <div className="mobile-header">
                        <div className="container ">
                            <div className="row ">
                                <div className="col-6 d-flex align-items-center">
                                    <Link
                                        className="navbar-brand"
                                        to="/">
                                        <img
                                            alt="logo"
                                            src="/images/logo.png"
                                        />
                                    </Link>
                                </div>


                                <div className="col-6 d-flex align-items-center justify-content-end Login-Register">
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
                                {filterEnable
                                    ? <div className="col-12 d-flex align-items-center">
                                        <SearchProduct products={prod} setFilteredItems={setFilteredItems}/>
                                    </div>
                                    : null}
                            </div>
                        </div>
                    </div>

                    {/* PC HEADER */}
                    <div className="pc-header">
                        <div className="row justify-content-between">
                            <div className="col-md-3 col-4 d-flex align-items-center">
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
                                ? <SearchProduct products={prod} setFilteredItems={setFilteredItems}/>
                                : null}

                            <div className="col-md-3 d-flex align-items-center justify-content-end Login-Register">
                                <div className="btn-group">
                                    <button
                                        type="button"
                                        className="name-button dropdown-toggle"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false">
                                        Hi, Zbon
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
                                    <div className={"cart_icon__wrapper"} onClick={() => {
                                        if (!localStorage.getItem("token"))
                                            history.push("/login")
                                        else
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
