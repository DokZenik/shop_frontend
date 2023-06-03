import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

const Header = ({setVisible, setFilteredItems}) => {
    const [cartCount, setCartCount] = useState(JSON.parse(localStorage.getItem("storage")).length);

    useEffect(() => {
        let buff = 0;
        JSON.parse(localStorage.getItem("storage")).forEach(elem => buff += elem.value)
        setCartCount(buff)
    }, [JSON.parse(localStorage.getItem("storage")).length])

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
                                    <div className={"cart_icon__wrapper"} onClick={() => setVisible(true)}>
                                        <i className="fas fa-shopping-bag"></i>
                                        {console.log(cartCount)}
                                        {cartCount !== 0
                                            ? <span className="badge">{cartCount}</span>
                                            : null}

                                    </div>
                                </div>
                                <div className="col-12 d-flex align-items-center">
                                    <form className="input-group">
                                        <input
                                            type="search"
                                            className="form-control rounded search"
                                            placeholder="Search"
                                        />
                                        <button
                                            type="submit"
                                            className="search-button">
                                            search
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PC HEADER */}
                    <div className="pc-header">
                        <div className="row">
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
                            <div className="col-md-6 col-8 d-flex align-items-center">
                                <form className="input-group" action={""}>
                                    <input
                                        type="search"
                                        className="form-control rounded search"
                                        placeholder="Search"
                                    />
                                    <button
                                        type="submit"
                                        className="search-button"
                                        onClick={(e) => {
                                            setFilteredItems([
                                                {
                                                    _id: '45',
                                                    name: 'TEST3TESTSesame Street Unisex-Child ELMO Puppet Slipper',
                                                    image: '/images/4.png',
                                                    description:
                                                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
                                                    price: 929,
                                                    countInStock: 0,
                                                    rating: 3.5,
                                                    numReviews: 3,
                                                },
                                                {
                                                    _id: '46',
                                                    name: 'TEST3TESTLace Casual Boots For Boys & Girls  (Tan)',
                                                    image: '/images/3.png',
                                                    description:
                                                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
                                                    price: 399,
                                                    countInStock: 10,
                                                    rating: 5,
                                                    numReviews: 9,
                                                },
                                                {
                                                    _id: '47',
                                                    name: 'TEST3TESTLace Walking Shoes For Boys & Girls  (Pink)',
                                                    image: '/images/2.png',
                                                    description:
                                                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
                                                    price: 49,
                                                    countInStock: 7,
                                                    rating: 2,
                                                    numReviews: 2,
                                                },
                                                {
                                                    _id: '48',
                                                    name: 'TEST3TESTWomen Red Heels Sandal',
                                                    image: '/images/1.png',
                                                    description:
                                                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
                                                    price: 29,
                                                    countInStock: 0,
                                                    rating: 0,
                                                    numReviews: 0,
                                                },
                                                {
                                                    _id: '49',
                                                    name: 'TEST4Velcro Ballerinas For Girls  (Pink)',
                                                    image: '/images/6.png',
                                                    description:
                                                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
                                                    price: 89,
                                                    countInStock: 3,
                                                    rating: 4,
                                                    numReviews: 4,
                                                },
                                                {
                                                    _id: '50',
                                                    name: 'TEST4Velcro Sneakers For Boys & Girls  (Blue)',
                                                    image: '/images/5.png',
                                                    description:
                                                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
                                                    price: 599,
                                                    countInStock: 10,
                                                    rating: 2,
                                                    numReviews: 2,
                                                },
                                                {
                                                    _id: '51',
                                                    name: 'TEST4Sesame Street Unisex-Child ELMO Puppet Slipper',
                                                    image: '/images/4.png',
                                                    description:
                                                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
                                                    price: 929,
                                                    countInStock: 0,
                                                    rating: 3.5,
                                                    numReviews: 3,
                                                },
                                                {
                                                    _id: '52',
                                                    name: 'TEST4Lace Casual Boots For Boys & Girls  (Tan)',
                                                    image: '/images/3.png',
                                                    description:
                                                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
                                                    price: 399,
                                                    countInStock: 10,
                                                    rating: 5,
                                                    numReviews: 9,
                                                },
                                                {
                                                    _id: '53',
                                                    name: 'TEST4Lace Walking Shoes For Boys & Girls  (Pink)',
                                                    image: '/images/2.png',
                                                    description:
                                                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
                                                    price: 49,
                                                    countInStock: 7,
                                                    rating: 2,
                                                    numReviews: 2,
                                                },
                                                {
                                                    _id: '54',
                                                    name: 'TEST4Women Red Heels Sandal',
                                                    image: '/images/1.png',
                                                    description:
                                                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
                                                    price: 29,
                                                    countInStock: 0,
                                                    rating: 0,
                                                    numReviews: 0,
                                                }, {
                                                    _id: '55',
                                                    name: 'TEST4TESTVelcro Ballerinas For Girls  (Pink)',
                                                    image: '/images/6.png',
                                                    description:
                                                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
                                                    price: 89,
                                                    countInStock: 3,
                                                    rating: 4,
                                                    numReviews: 4,
                                                },
                                                {
                                                    _id: '56',
                                                    name: 'TEST4TESTVelcro Sneakers For Boys & Girls  (Blue)',
                                                    image: '/images/5.png',
                                                    description:
                                                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
                                                    price: 599,
                                                    countInStock: 10,
                                                    rating: 2,
                                                    numReviews: 2,
                                                },
                                                {
                                                    _id: '57',
                                                    name: 'TEST4TESTSesame Street Unisex-Child ELMO Puppet Slipper',
                                                    image: '/images/4.png',
                                                    description:
                                                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
                                                    price: 929,
                                                    countInStock: 0,
                                                    rating: 3.5,
                                                    numReviews: 3,
                                                },
                                                {
                                                    _id: '58',
                                                    name: 'TEST4TESTLace Casual Boots For Boys & Girls  (Tan)',
                                                    image: '/images/3.png',
                                                    description:
                                                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
                                                    price: 399,
                                                    countInStock: 10,
                                                    rating: 5,
                                                    numReviews: 9,
                                                },
                                                {
                                                    _id: '59',
                                                    name: 'TEST4TESTLace Walking Shoes For Boys & Girls  (Pink)',
                                                    image: '/images/2.png',
                                                    description:
                                                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
                                                    price: 49,
                                                    countInStock: 7,
                                                    rating: 2,
                                                    numReviews: 2,
                                                },
                                                {
                                                    _id: '60',
                                                    name: 'TEST4TESTWomen Red Heels Sandal',
                                                    image: '/images/1.png',
                                                    description:
                                                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
                                                    price: 29,
                                                    countInStock: 0,
                                                    rating: 0,
                                                    numReviews: 0,
                                                },
                                                {
                                                    _id: '61',
                                                    name: 'TEST5Velcro Ballerinas For Girls  (Pink)',
                                                    image: '/images/6.png',
                                                    description:
                                                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
                                                    price: 89,
                                                    countInStock: 3,
                                                    rating: 4,
                                                    numReviews: 4,
                                                },
                                                {
                                                    _id: '62',
                                                    name: 'TEST5Velcro Sneakers For Boys & Girls  (Blue)',
                                                    image: '/images/5.png',
                                                    description:
                                                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
                                                    price: 599,
                                                    countInStock: 10,
                                                    rating: 2,
                                                    numReviews: 2,
                                                },
                                                {
                                                    _id: '63',
                                                    name: 'TEST5Sesame Street Unisex-Child ELMO Puppet Slipper',
                                                    image: '/images/4.png',
                                                    description:
                                                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
                                                    price: 929,
                                                    countInStock: 0,
                                                    rating: 3.5,
                                                    numReviews: 3,
                                                },
                                                {
                                                    _id: '64',
                                                    name: 'TEST5Lace Casual Boots For Boys & Girls  (Tan)',
                                                    image: '/images/3.png',
                                                    description:
                                                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
                                                    price: 399,
                                                    countInStock: 10,
                                                    rating: 5,
                                                    numReviews: 9,
                                                },
                                                {
                                                    _id: '65',
                                                    name: 'TEST5Lace Walking Shoes For Boys & Girls  (Pink)',
                                                    image: '/images/2.png',
                                                    description:
                                                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
                                                    price: 49,
                                                    countInStock: 7,
                                                    rating: 2,
                                                    numReviews: 2,
                                                }
                                            ])
                                            e.preventDefault()
                                        }
                                        }>
                                        search
                                    </button>
                                </form>
                            </div>
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

                                <div className={"cart_icon__wrapper"} onClick={() => setVisible(true)}>
                                    <i className="fas fa-shopping-bag"></i>
                                    {console.log(cartCount)}
                                    {cartCount !== 0
                                        ? <span className="badge">{cartCount}</span>
                                        : null}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
