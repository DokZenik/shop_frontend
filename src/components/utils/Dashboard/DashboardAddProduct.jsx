import axios from "axios";
import React, {useState, useEffect} from "react";
import {useFetching} from "../CustomHooks/useFetching";

const AddProduct = () => {
    const [subcategories, setSubcategories] = useState({})
    const [categories, setCategories] = useState([]);
    let objectForDisplay = {}
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: 0,
        images: [],
        category: "", // Added category field
        countInStock: 0,
    });


    const formCategories = (data, title) => {
        const buff = data.filter(elem => elem.title === title)

        buff.forEach(elem => objectForDisplay[elem.value] = [])

        if (data.length > buff.length)
            Object.entries(objectForDisplay).forEach(([category, subcategoryList]) => {

                objectForDisplay[category] = data.filter(elem => elem.title === category).map(elem => {
                    return {name: elem.value, items: []}
                })

                objectForDisplay[category].forEach(elem => elem.items = data.filter(item => item.title === elem.name).map(elem => {
                    return {name: elem.value}
                }))

            })
        setSubcategories(objectForDisplay)
    }

    const [fetchCategories, areCategoriesLoading, error] = useFetching(() => {
        axios.get("https://platz-shop-api.onrender.com/api/categories", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => {
            formCategories(res.data, "")
        })
    })


    useEffect(() => {
        fetchCategories();
    }, []);

    // const fetchCategories = async () => {
    //     try {
    //         const response = await axios.get("https://platz-shop-api.onrender.com/api/categories");
    //         setCategories(response.data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

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
        newProductData.append("category", formData.category); // Add the selected category to the form data
        newProductData.append('countInStock', formData.countInStock);
        formData.images.forEach((image, index) => {
            newProductData.append(`images`, image); // Update the field name to 'images'
        });

        axios
            .post("https://platz-shop-api.onrender.com/api/products/", newProductData, {
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
                    category: "", // Reset the category field
                });
            })
            .catch((e) => console.log(e));
    };

    return (
        <div className={"d-flex flex-1 flex-column mx-5 gap-5 my-4"}>
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit} className={"d-flex gap-3 flex-column w-25"}>
                <input
                    className={"form-control"}
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <input
                    className={"form-control"}
                    type="text"
                    name="description"
                    placeholder="Product Description"
                    value={formData.description}
                    onChange={handleChange}
                />
                <input
                    className={"form-control"}
                    type="number"
                    name="price"
                    placeholder="Product price"
                    value={formData.price}
                    min={0}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    className={"form-control"}
                    name={'countInStock'}
                    placeholder={'Count of Stock'}
                    value={formData.countInStock}
                    onChange={handleChange}
                    required
                />
                <select
                    className={"form-control"}
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Category</option>
                    {/*{categories.map((category) => (*/}
                    {/*    <option key={category._id} value={category.title}>*/}
                    {/*        {category.value}*/}
                    {/*    </option>*/}
                    {/*))}*/}
                    {Object.entries(subcategories).map(([category, subcategoryList]) => {
                        return subcategoryList.map(subcat => {
                            return subcat.items.map(item => (
                                <option key={item.name} value={item.name}>
                                    {item.name}
                                </option>
                            ))
                        })
                    })}
                </select>
                <input className={"form-control"} type="file" name="image" onChange={handleImageChange} multiple/>
                <button className={"btn btn-dark"} type="submit" onClick={handleSubmit}>
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
