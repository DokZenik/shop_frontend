import React, {useEffect, useMemo, useState} from "react";
import {Link} from "react-router-dom";
import Rating from "./Rating";
import Pagination from "./pagination";
import axios from "axios";
import {setProd} from "../../data/Products";
import Preloader from "../utils/Preloader/Preloader";

const ShopSection = () => {

    const [currentPageNumber, setCurrentPageNumber] = useState(0);
    const [pagesCount, setPagesCount] = useState(1)
    const [currentPageItems, setCurrentPageItems] = useState([])
    const [maxItemsPerPage, setMaxItemsPerPage] = useState(8)
    const [isItemsLoading, setIsItemsLoading] = useState(false);
    const [products, setProducts] = useState([]);

    const getPagesCount = (elemPerPageCount) => {
        console.log(Math.ceil(products.length / elemPerPageCount))
        return Math.ceil(products.length / elemPerPageCount)
    }

    const getPageData = (pageNumber, elemPerPageCount) => {
        return products.slice(pageNumber * elemPerPageCount, (pageNumber + 1) * elemPerPageCount)
    }

    const fetchData = () => {
        setIsItemsLoading(true)
        axios.get(`http://localhost:5000/api/products/`)
            .then(res => {
                setProducts(res.data)
                setIsItemsLoading(false)

            })
            .catch(e => console.log(e))

    }

    useEffect(() => {
        updateDataOnPage(currentPageNumber)
        setPagesCount(getPagesCount(maxItemsPerPage))
        setCurrentPageItems(getPageData(currentPageNumber, maxItemsPerPage))
        setProd(products)
    }, [products])

    useMemo(() => {
        fetchData()
        setPagesCount(getPagesCount(maxItemsPerPage))
        setCurrentPageItems(getPageData(currentPageNumber, maxItemsPerPage))
    }, [])


    const changePage = (pageNumber) => {
        setCurrentPageNumber(pageNumber)
        updateDataOnPage(pageNumber)
    }

    const updateDataOnPage = (pageNumber) => {
        let buff = getPageData(pageNumber, maxItemsPerPage)
        setCurrentPageItems(buff)
    }

    return (
        <>
            <div className="container">
                <div className="section">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 article">
                            <div className="shopcontainer">
                                {isItemsLoading
                                    ?
                                    <div className="preloader_wrapper">
                                        <Preloader/>
                                    </div>
                                    :
                                    currentPageItems.length === 0
                                        ? <h1>No one items(((</h1>
                                        :
                                        currentPageItems.map((product) => (
                                            <div
                                                className="shop"
                                                key={product._id}
                                            >
                                                <Link to={`/products/${product._id}`}>
                                                    <div className="shopBack">
                                                        <img src={product.image} alt={product.name}/>
                                                    </div>
                                                </Link>

                                                <div className="shoptext">
                                                    <Link to={`/products/${product._id}`}>
                                                        <p>
                                                            {product.name}
                                                        </p>
                                                    </Link>
                                                </div>

                                                <div className="item__rating">
                                                    <Rating
                                                        value={product.rating}
                                                        text={`${product.numReviews} reviews`}
                                                    />
                                                </div>
                                                <div className="item_price">
                                                    <h3>${product.price}</h3>
                                                </div>

                                            </div>
                                        ))
                                }

                            </div>
                            {currentPageItems.length !== 0
                                ? <Pagination maxPagesCount={pagesCount} changePage={changePage}
                                              currentPage={currentPageNumber}/>
                                : null
                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShopSection;
