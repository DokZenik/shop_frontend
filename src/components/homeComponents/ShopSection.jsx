import React, {useMemo, useState} from "react";
import {Link} from "react-router-dom";
import Rating from "./Rating";
import Pagination from "./pagination";
import {getPagesCount, getPageData} from "../../data/Products";
import SavePage from "../utils/SavePage";

const ShopSection = () => {

    const [currentPageNumber, setCurrentPageNumber] = useState(0);
    const [pagesCount, setPagesCount] = useState(1)
    const [currentPageItems, setCurrentPageItems] = useState([])
    const [maxItemsPerPage, setMaxItemsPerPage] = useState(8)

    useMemo(() => {

        setPagesCount(getPagesCount(maxItemsPerPage))

        setCurrentPageItems(getPageData(currentPageNumber, maxItemsPerPage))

    }, [])

    const changePage = (pageNumber) => {
        console.log(pageNumber)
        setCurrentPageNumber(pageNumber)
        updateDataOnPage(pageNumber)
    }
    const updateDataOnPage = (pageNumber) => {
        let buff = getPageData(pageNumber, maxItemsPerPage)
        console.log(buff)
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

                                        {/*</div>*/}
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
