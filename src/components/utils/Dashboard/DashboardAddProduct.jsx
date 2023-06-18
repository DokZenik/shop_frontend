import axios from "axios";
import React, { useState } from "react";

const AddProduct = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        cost: 0,
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create a new product object with the form data
        const newProduct = {
            name: formData.name,
            description: formData.description,
            cost: formData.cost,
        };

        // Send a POST request to the server to add the product
        axios
            .post("http://localhost:5000/api/products/", newProduct)
            .then((res) => {
                console.log("Product added successfully");
                // Clear the form fields after adding the product
                setFormData({
                    name: "",
                    description: "",
                    cost: 0,
                });
            })
            .catch((e) => console.log(e));
    };

    return (
        <div className={'d-flex flex-1 flex-column mx-5 gap-5 my-4'}>
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit} className={'d-flex gap-3'}>
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
                    name="cost"
                    placeholder="Product Cost"
                    value={formData.cost}
                    onChange={handleChange}
                />
                <button className={'btn btn-dark'} type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;
