import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "../../homeComponents/Rating";

const DashProducts = () => {
    const [isItemsLoading, setIsItemsLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        cost: 0,
        editProductId: null, // Track the product ID being edited
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        setIsItemsLoading(true);
        axios
            .get(`http://localhost:5000/api/products/`)
            .then((res) => {
                setProducts(res.data);
                setIsItemsLoading(false);
            })
            .catch((e) => console.log(e));
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleEdit = (productId) => {
        setFormData({
            ...formData,
            name: "", // Clear the form fields when starting the edit
            description: "",
            cost: 0,
            editProductId: productId, // Set the ID of the product being edited
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { editProductId, name, description, cost } = formData;

        // Update the product with the new data
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
            editProductId: null,
        });
    };

    return (
        <>
            {/* Render the list of products */}
            {products.map((product) => (
                <div className="shop" key={product._id}>
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
                        <form onSubmit={handleSubmit}>
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
                            <button type="submit">Accept Changes</button>
                        </form>
                    )}

                    {/* Render the "Edit" button if the product is not being edited */}
                    {formData.editProductId !== product._id && (
                        <button onClick={() => handleEdit(product._id)}>Edit</button>
                    )}
                </div>
            ))}
        </>
    );
};

export default DashProducts;
