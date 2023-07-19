import React, {useEffect, useMemo, useState} from "react";
import {Link} from "react-router-dom";
import Rating from "./Rating";
import Pagination from "./pagination";
import axios from "axios";
import {setProd} from "../../data/Products";
import Preloader from "../utils/Loaders/Preloader";
import ModalCart from "../utils/Cart/ModalCart";
import SearchProduct from "../utils/search/SearchProduct";
import CurrencySelector from "../utils/Currency/CurrencySelector";
import category from "./Category";

const ShopSection = ({
                         visible,
                         setVisible,
                         filteredItems,
                         setFilteredItems,
                         baseCurrency,
                         setCategories,
                         categories
                     }) => {

    const [currentPageNumber, setCurrentPageNumber] = useState(0);
    const [pagesCount, setPagesCount] = useState(1)
    const [currentPageItems, setCurrentPageItems] = useState([])
    const [maxItemsPerPage, setMaxItemsPerPage] = useState(12)
    const [isItemsLoading, setIsItemsLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [conversionRate, setConversionRate] = useState({
        CZK: 21.50,
        EUR: 1.00,
        PLN: 4.55
    });

    const getPagesCount = (elemPerPageCount) => {
        return Math.ceil(filteredItems.length / elemPerPageCount)
    }

    const getPageData = (pageNumber, elemPerPageCount) => {
        return filteredItems.slice(pageNumber * elemPerPageCount, (pageNumber + 1) * elemPerPageCount)
    }

    const fetchData = () => {
        setIsItemsLoading(true)
        axios.get(`https://platz-shop-api.onrender.com/api/products/`)
            .then(res => {
                setProducts(res.data)
                setFilteredItems(res.data)
                setIsItemsLoading(false)
            })
            .catch(e => console.log(e))

    }

    useEffect(() => {
        updateDataOnPage(0)
        setCurrentPageNumber(0)
        setPagesCount(getPagesCount(maxItemsPerPage))
        setCurrentPageItems(getPageData(0, maxItemsPerPage))
        setProd(products)
    }, [products, filteredItems])

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
    const handleResetCategory = () => {
        setCategories([])
        setFilteredItems(products); // Reset the filtered items to the original product list
    };

    return (
        <>
            <div className="container-xxl">
                <div className="section">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 article">
                            <div className="row d-inline-block">
                                <div className="col-lg-12 col-md-12 article">
                                    <button className="btn btn-dark my-3" onClick={handleResetCategory}>
                                        Reset Category
                                    </button>
                                </div>
                            </div>
                            {categories.length !== 0
                                ? <span>Current category: {categories.join(", ")}</span>
                                : null
                            }

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
                                        <>
                                            <ModalCart visible={visible} setVisible={setVisible}/>
                                            {currentPageItems.map((product) => (
                                                <div
                                                    className="shop"
                                                    key={product._id}
                                                >
                                                    <Link to={`/products/${product._id}`}>
                                                        <div className="shopBack">
                                                            <img src={product.images[0]} alt={product.name}/>
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
                                                            value={product.rating / product.numReviews}
                                                            text={`${product.numReviews} reviews`}
                                                        />
                                                    </div>
                                                    <div className="item_price">
                                                        <h3>
                                                            {`${baseCurrency} ${(
                                                                product.price * conversionRate[baseCurrency]
                                                            ).toFixed(2)}`}
                                                        </h3>
                                                    </div>

                                                </div>
                                            ))
                                            }
                                        </>
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
