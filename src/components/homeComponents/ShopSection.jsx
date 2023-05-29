import React, {useEffect, useMemo, useState} from "react";
import {Link} from "react-router-dom";
import Rating from "./Rating";
import Pagination from "./pagination";
import axios from "axios";
import {setProd} from "../../data/Products";
// import {getPagesCount, getPageData, fetchData} from "../../data/Products";
// import SavePage from "../utils/SavePage";

const ShopSection = () => {

    const [currentPageNumber, setCurrentPageNumber] = useState(0);
    const [pagesCount, setPagesCount] = useState(1)
    const [currentPageItems, setCurrentPageItems] = useState([])
    const [maxItemsPerPage, setMaxItemsPerPage] = useState(8)
    const [products, setProducts] = useState([
        {
            _id: '72',
            name: 'TEST5TESTWomen Red Heels Sandal',
            image: '/images/1.png',
            description:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
            price: 29,
            countInStock: 0,
            rating: 0,
            numReviews: 0,
        }
    ]);
    const getPagesCount = (elemPerPageCount) => {
        console.log(Math.ceil(products.length / elemPerPageCount))
        return Math.ceil(products.length / elemPerPageCount)
    }

    const getPageData = (pageNumber, elemPerPageCount) => {
        return products.slice(pageNumber * elemPerPageCount, (pageNumber + 1) * elemPerPageCount)
    }

    const fetchData = () => {

        axios.get(`http://localhost:5000/api/products/`)
            .then(res => {
                setProducts(res.data)
            })
            .catch(e => console.log(e))

    }

    useEffect(() => {
        console.log("TEST2")
        updateDataOnPage(currentPageNumber)
        setPagesCount(getPagesCount(maxItemsPerPage))
        setCurrentPageItems(getPageData(currentPageNumber, maxItemsPerPage))
        // console.log(products)
        setProd(products)
    }, [products])

    useMemo(() => {
        console.log("TEST1")
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
                                {currentPageItems.map((product) => (
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
                                ))}
                            </div>
                            <Pagination maxPagesCount={pagesCount} changePage={changePage}
                                        currentPage={currentPageNumber}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShopSection;
