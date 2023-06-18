import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "../../homeComponents/Rating";
import classes from '../Dashboard/Dashboard.module.css';

const DashProducts = () => {
    const [isItemsLoading, setIsItemsLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        cost: 0,
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
            setProducts(response.data);
            setIsItemsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        if (e.target.name === "image") {
            setFormData({
                ...formData,
                [e.target.name]: e.target.files[0], // Save the selected file
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
            cost: 0,
            image: "", // Clear the image field when starting the edit
            editProductId: productId, // Set the ID of the product being edited
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { editProductId, name, description, cost, image } = formData;

        const updatedFormData = new FormData();
        updatedFormData.append("name", name);
        updatedFormData.append("description", description);
        updatedFormData.append("cost", cost);
        updatedFormData.append("image", image);

        try {
            await axios.post(`http://localhost:5000/api/products/${editProductId}/edit`, updatedFormData, {
                headers: {
                    "Content-Type": "multipart/form-data", // Set the content type for file uploads
                },
            });

            const updatedProducts = products.map((product) => {
                if (product._id === editProductId) {
                    return {
                        ...product,
                        name: name,
                        description: description,
                        cost: cost,
                    };
                }
                return product;
            });

            setProducts(updatedProducts);
            setFormData({
                name: "",
                description: "",
                cost: 0,
                image: "",
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
                    <div className={'shop h-50 m-3'} key={product._id}>
                        <div className="shopBack">
                            <img src={product.image} alt={product.name} />
                        </div>
                        <div className="shoptext">
                            <p>{product.name}</p>
                        </div>
                        <div className="item__rating">
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
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
                                    name="cost"
                                    value={formData.cost}
                                    onChange={handleChange}
                                />
                                <input
                                    type="file"
                                    name="image"
                                    onChange={handleChange}
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
