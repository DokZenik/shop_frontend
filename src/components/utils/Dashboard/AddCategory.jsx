// AddCategory.jsx
import React, { useState } from "react";
import axios from "axios";

const AddCategory = ({ fetchCategories }) => {
    const [newCategory, setNewCategory] = useState({
        title: "",
        value: "",
    });

    const handleCategoryChange = (e) => {
        setNewCategory({
            ...newCategory,
            [e.target.name]: e.target.value,
        });
    };

    const handleCategorySubmit = (e) => {
        e.preventDefault();
        axios
            .post(
                "https://platz-shop-api.onrender.com/api/categories",
                newCategory,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            )
            .then((res) => {
                console.log("Category added successfully");
                // Trigger fetchCategories from the parent component (AddProduct)
                fetchCategories();
                setNewCategory({
                    title: "",
                    value: "",
                });
            })
            .catch((e) => console.log(e));
    };

    return (
        <form onSubmit={handleCategorySubmit} className={"d-flex gap-3 flex-column w-25"}>
            <input
                className={"form-control"}
                type="text"
                name="title"
                placeholder="Category Title"
                value={newCategory.title}
                onChange={handleCategoryChange}
                required
            />
            <input
                className={"form-control"}
                type="text"
                name="value"
                placeholder="Category Value"
                value={newCategory.value}
                onChange={handleCategoryChange}
                required
            />
            <button className={"btn btn-dark"} type="submit" onClick={handleCategorySubmit}>
                Add Category
            </button>
        </form>
    );
};

export default AddCategory;
