import React from "react";
import {Link} from "react-router-dom";
import Rating from "./Rating";
import Pagination from "./pagination";
import products from "../../data/Products";

const ShopSection = () => {
    return (
        <>
            <div className="container">
                <div className="section">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 article">
                            <div className="shopcontainer">
                                {products.map((product) => (
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
                            <Pagination/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShopSection;
