import axios from "axios";
import React, { useState } from "react";

const AddProduct = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: 0,
        images: [],
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e) => {
        const imageFiles = Array.from(e.target.files);
        setFormData({
            ...formData,
            images: imageFiles,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProductData = new FormData();
        newProductData.append("name", formData.name);
        newProductData.append("description", formData.description);
        newProductData.append("price", formData.price);
        formData.images.forEach((image, index) => {
            newProductData.append(`images`, image); // Update the field name to 'images'
        });

        axios
            .post("http://localhost:5000/api/products/", newProductData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                console.log("Product added successfully");
                setFormData({
                    name: "",
                    description: "",
                    price: 0,
                    images: [],
                });
            })
            .catch((e) => console.log(e));
    };

    return (
        <div className={"d-flex flex-1 flex-column mx-5 gap-5 my-4"}>
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit} className={"d-flex gap-3"}>
                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Product Description"
                    value={formData.description}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Product price"
                    value={formData.price}
                    onChange={handleChange}
                />
                <input type="file" name="image" onChange={handleImageChange} multiple />
                <button className={"btn btn-dark"} type="submit" onClick={handleSubmit}>
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
