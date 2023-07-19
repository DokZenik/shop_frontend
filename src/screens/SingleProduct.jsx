import React, {useContext, useEffect, useMemo, useState} from 'react';
import Header from './../components/Header';
import Rating from '../components/homeComponents/Rating';
import {Link, useHistory} from 'react-router-dom';
import Message from './../components/LoadingError/Error';
import axios from 'axios';
import {setProd} from "../data/Products";
import Preloader from "../components/utils/Preloader/Preloader";
import ModalCart from "../components/utils/Cart/ModalCart";
import {useFetching} from "../components/utils/CustomHooks/useFetching";
import rating from "../components/homeComponents/Rating";
import {CurrencyContext} from "../components/utils/Currency/CurrensyContext";
import {Navigation, Pagination} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/swiper.scss';
import 'swiper/modules/pagination/pagination.scss';
import 'swiper/modules/navigation/navigation.min.css'

const SingleProduct = ({match}) => {
    const { baseCurrency, handleCurrencyChange } = useContext(CurrencyContext);
    const [product, setProduct] = useState({});
    const [products, setProducts] = useState([]);
    const [isItemsLoading, setIsItemsLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [comments, setComments] = useState([]);
    const [showCommentWindow, setShowCommentWindow] = useState(false);
    const [conversionRate, setConversionRate] = useState({
        CZK: 21.50,
        EUR: 1.00,
        PLN: 4.55
    });
    let commentText = "";
    let itemRating = 1;
    const history = useHistory();

    console.log(baseCurrency)

    const [fetchComments, areCommentsLoading, error] = useFetching(async () => {
        axios.get(`http://localhost:5000/api/comments/${match.params.id}`)
            .then(res => {
                setComments(res.data)

            })
            .catch(e => {
                console.log(e.status)
            })
    })

    let count = 1

    useEffect(() => {

        const fetchProduct = async () => {
            const {data} = await axios.get(`/api/products/${match.params.id}`);
            setProduct(data);
        };
        fetchProduct();
        fetchComments();
    }, []);

    const fetchData = () => {
        setIsItemsLoading(true)
        axios.get(`http://localhost:5000/api/products/`)
            .then(res => {
                setProducts(res.data)
                setProd(res.data)
                setIsItemsLoading(false)
            })
            .catch(e => console.log(e))

    }
    const userValidate = () => {
        axios.get("http://localhost:5000/api/auth/users", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => setShowCommentWindow(res.status === 200))
    }
    useMemo(() => {
        fetchData()
        userValidate()
    }, [])

    let handleSubmit = async (e) => {
        axios.post(`http://localhost:5000/api/comments/save`, {
            userId: localStorage.getItem("email"),
            itemId: product._id,
            text: commentText,
            rating: itemRating
        }, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                'Content-type': 'application/json'
            }
        }).catch(e => e.status === 403 ? history.push("/login") : null)
    }
    return (
        <>
            <Header setVisible={setModal} cartEnable={true} baseCurrency={baseCurrency} onCurrencyChange={handleCurrencyChange} />

            {isItemsLoading
                ?
                <div className="preloader_wrapper">
                    <Preloader/>
                </div>
                :
                <>
                    <ModalCart visible={modal} setVisible={setModal}/>
                    <div className="container single-product">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="single-image">
                                    <Swiper
                                        pagination={{
                                            dynamicBullets: true,
                                        }}
                                        navigation={true}
                                    modules={[Pagination, Navigation]}>
                                        {product.images && product.images.map((image, index) => (
                                            <SwiperSlide key={index} virtualIndex={index}>
                                                <img src={image} alt={product.name} />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="product-dtl">
                                    <div className="product-info">
                                        <div className="product-name">{product.name}</div>
                                    </div>
                                    <p>{product.description}</p>

                                    <div className="product-count col-lg-7 ">
                                        <div className="flex-box d-flex justify-content-between align-items-center">
                                            <h6>Price</h6>
                                            <span>{`${baseCurrency} ${(
                                                product.price * conversionRate[baseCurrency]
                                            ).toFixed(2)}`}</span>
                                        </div>
                                        <div className="flex-box d-flex justify-content-between align-items-center">
                                            <h6>Status</h6>
                                            {product.countInStock > 0 ? <span>In Stock</span> :
                                                <span>unavailable</span>}
                                        </div>
                                        <div className="flex-box d-flex justify-content-between align-items-center gap-5">
                                            <h6>Reviews</h6>
                                            <Rating
                                                value={product.rating / product.numReviews}
                                                text={`${product.numReviews} reviews`}
                                            />
                                        </div>
                                        {product.countInStock > 0 ? (
                                                <>
                                                    <div
                                                        className="flex-box d-flex justify-content-between align-items-center">
                                                        <h6>Quantity</h6>
                                                        <select onChange={(e) => count = e.target.value}>
                                                            {[...Array(product.countInStock).keys()].map((x) => (
                                                                <option
                                                                    key={x + 1}
                                                                    value={x + 1}>
                                                                    {x + 1}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <button className="round-black-btn" onClick={() => {
                                                        if (!localStorage.getItem("token")) {
                                                            history.push("/login/401")
                                                        } else {
                                                            axios.post("http://localhost:5000/api/cart", {
                                                                item: {
                                                                    userId: localStorage.getItem("email"),
                                                                    count: count,
                                                                    product: product
                                                                }
                                                            }, {
                                                                headers: {
                                                                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                                                                }
                                                            }).then(res => window.location.reload())
                                                                .catch(e =>  history.push("/login/403"))
                                                        }
                                                    }}>Add To Cart
                                                    </button>
                                                </>
                                            ) :
                                            <div className="unavailable__item">
                                                <p className="text">
                                                    No one in stock
                                                </p>
                                            </div>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RATING */}
                        <div className="row my-5">
                            <div className="col-md-6 order-1">
                                <h6 className="mb-3">REVIEWS</h6>
                                {areCommentsLoading
                                    ? <Preloader/>
                                    : comments.length !== 0
                                        ? <div className={"comments__container"}>
                                            {comments.map(elem => (
                                                <div className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded">
                                                    <strong>{elem.userId}</strong>
                                                    <Rating value={elem.rating}/>
                                                    <span>{elem.createdAt.slice(0, 10)}</span>
                                                    <div className="alert alert-info mt-3">
                                                        {elem.text}
                                                    </div>
                                                </div>

                                            ))}
                                        </div>
                                        : <Message variant={'alert-info mt-3'}>No Reviews</Message>
                                }
                            </div>
                            {showCommentWindow
                                ? <div className="col-md-6 order-2">
                                    <h6>WRITE A CUSTOMER REVIEW</h6>
                                    <div className="my-4"></div>

                                    <form onSubmit={handleSubmit}>
                                        <div className="my-4 ">
                                            <strong>Rating</strong>
                                            <select className="col-12 bg-light p-3 mt-2 border-0 rounded"
                                                    onChange={e => itemRating = e.target.value}>
                                                <option value="">Select...</option>
                                                <option value="1">1 - Poor</option>
                                                <option value="2">2 - Fair</option>
                                                <option value="3">3 - Good</option>
                                                <option value="4">4 - Very Good</option>
                                                <option value="5">5 - Excellent</option>
                                            </select>
                                        </div>
                                        <div className="my-4">
                                            <strong>Comment</strong>
                                            <textarea
                                                row="3"
                                                className="col-12 bg-light p-3 mt-2 border-0 rounded"
                                                onChange={e => commentText = e.target.value}
                                            ></textarea>
                                        </div>
                                        <div className="my-3">
                                            <button className="col-12 bg-black border-0 p-3 rounded text-white">SUBMIT
                                            </button>
                                        </div>
                                    </form>

                                </div>
                                : <div className="my-3 order-0">
                                    <Message variant={'alert-warning'}>
                                        Please{' '}
                                        <Link to="/login">
                                            " <strong>Login</strong> "
                                        </Link>{' '}
                                        to write a review{' '}
                                    </Message>
                                </div>}

                        </div>
                    </div>
                </>
            }
        </>
    );
};

export default SingleProduct;
