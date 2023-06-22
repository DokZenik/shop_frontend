import axios from "axios";
import React, {useEffect, useState} from "react";
import Rating from "../../homeComponents/Rating";
import classes from '../Dashboard/Dashboard.module.css';
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination} from "swiper";
import 'swiper/swiper.scss';
import 'swiper/modules/pagination/pagination.scss'



const DashProducts = () => {
    const [isItemsLoading, setIsItemsLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [image, setImage] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: 0,
        image: "", // Added image field for editing
        editProductId: null, // Track the product ID being edited
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsItemsLoading(true);
        try {
            const response = await axios.get("http://localhost:5000/api/products/");
            setImage(response.data);
            setProducts(response.data);
            console.log(response.data)
            setIsItemsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        if (e.target.name === "images") { // Updated field name from "image" to "images"
            setFormData({
                ...formData,
                [e.target.name]: e.target.files, // Save the selected files as an array
            });
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }
    };


    const handleEdit = (productId) => {
        setFormData({
            ...formData,
            name: "", // Clear the form fields when starting the edit
            description: "",
            price: 0,
            image: [], // Clear the image field when starting the edit
            editProductId: productId, // Set the ID of the product being edited
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {editProductId, name, description, price, images} = formData; // Updated field name from "image" to "images"

        const updatedFormData = new FormData();
        updatedFormData.append("name", name);
        updatedFormData.append("description", description);
        updatedFormData.append("price", price);

        // Append each image file to the form data
        for (let i = 0; i < images.length; i++) {
            updatedFormData.append("images", images[i]);
        }

        try {
            // Make the POST request with the updatedFormData
            await axios.post(`http://localhost:5000/api/products/${editProductId}/edit`, updatedFormData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            // Update the products list with the updated values
            const updatedProducts = products.map((product) => {
                if (product._id === editProductId) {
                    return {
                        ...product,
                        name: name,
                        description: description,
                        price: price,
                    };
                }
                return product;
            });

            setProducts(updatedProducts);
            setFormData({
                name: "",
                description: "",
                price: 0,
                images: [], // Clear the images field when submitting
                editProductId: null,
            });
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <>
            <div className={`d-flex flex-1 flex-wrap scroll ${classes['shop_wrapper']}`}>
                {products.map((product) => (
                    <div className={'shop h-50 m-3 w-25'} key={product._id}>
                        <div className="shopBack">
                            <Swiper
                                pagination={{
                                    dynamicBullets: true,
                                }}
                                modules={[Pagination]}
                            >
                                {product.images.map((image, index) => (
                                    <SwiperSlide key={index} virtualIndex={index}>
                                        <img src={image} alt={product.name}/>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                        <div className="shoptext">
                            <p>{product.name}</p>
                        </div>
                        <div className="item__rating">
                            <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                        </div>

                        {/* Render the form only if the product is being edited */}
                        {formData.editProductId === product._id && (
                            <form onSubmit={handleSubmit} className={'d-flex align-items-center gap-2'}>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                />
                                <input
                                    type="file"
                                    name="images"
                                    onChange={handleChange}
                                    multiple
                                />
                                <button className={'btn btn-dark m-3'} type="submit">Accept Changes</button>
                            </form>
                        )}

                        {/* Render the "Edit" button if the product is not being edited */}
                        {formData.editProductId !== product._id && (
                            <button onClick={() => handleEdit(product._id)} className={'btn btn-dark'}>Edit</button>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};

export default DashProducts;
