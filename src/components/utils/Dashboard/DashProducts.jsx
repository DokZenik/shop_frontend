import axios from "axios";
import React, {useEffect, useState} from "react";
import Rating from "../../homeComponents/Rating";
import classes from '../Dashboard/Dashboard.module.css';
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination} from "swiper";
import 'swiper/swiper.scss';
import 'swiper/modules/pagination/pagination.scss';
import {useFetching} from "../CustomHooks/useFetching";

const DashProducts = () => {
    const [isItemsLoading, setIsItemsLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState({});

    let objectForDisplay = {};
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: 0,
        images: [], // Updated field name from "image" to "images"
        category: "", // Added category field
        countInStock: 0,
        editProductId: null, // Track the product ID being edited
    });

    const formCategories = (data, title) => {
        const buff = data.filter(elem => elem.title === title)

        buff.forEach(elem => objectForDisplay[elem.value] = [])

        if (data.length > buff.length)
            Object.entries(objectForDisplay).forEach(([category, subcategoryList]) => {

                objectForDisplay[category] = data.filter(elem => elem.title === category).map(elem => {
                    return { name: elem.value, items: [] }
                })

                objectForDisplay[category].forEach(elem => elem.items = data.filter(item => item.title === elem.name).map(elem => {
                    return { name: elem.value }
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
        fetchData();
        fetchCategories(); // Fetch categories when component mounts
    }, []);

    const fetchData = async () => {
        setIsItemsLoading(true);
        try {
            const response = await axios.get("https://platz-shop-api.onrender.com/api/products/", {
            // const response = await axios.get("http://localhost:5000/api/products/", {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            if(localStorage.getItem("roles").includes("ADMIN"))
                setProducts(response.data);
            else
                setProducts(response.data.filter(item => item.ownerEmail === localStorage.getItem("email")))
            // console.log(response.data)
            setIsItemsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        if (e.target.name === "images") {
            // Check if files are selected
            if (e.target.files && e.target.files.length > 0) {
                setFormData({
                    ...formData,
                    [e.target.name]: e.target.files, // Save the selected files as an array
                });
            } else {
                setFormData({
                    ...formData,
                    [e.target.name]: [], // Set images to an empty array if no files are selected
                });
            }
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleEdit = (productId) => {
        const product = products.find(prod => prod._id === productId)
        setFormData({
            ...formData,
            name: product.name,
            description: product.description,
            price: product.price,
            images: product.images, // Updated to use the "images" field
            category: product.categories[0], // Clear the category field when starting the edit
            countInStock: product.countInStock,
            editProductId: productId,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { editProductId, name, description, price, images, category, countInStock } = formData;

        const updatedFormData = new FormData();
        updatedFormData.append("name", name);
        updatedFormData.append("description", description);
        updatedFormData.append("price", price);
        updatedFormData.append("categories", category); // Updated field name from "category" to "categories"
        updatedFormData.append('countInStock', countInStock);

        // Append each image file to the form data
        if (images && images.length > 0) {
            for (let i = 0; i < images.length; i++) {
                updatedFormData.append("images", images[i]);
            }
        }

        try {
            // Make the POST request with the updatedFormData
            await axios.post(`https://platz-shop-api.onrender.com/api/products/${editProductId}/edit`, updatedFormData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
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
                        countInStock: countInStock,
                        categories: [category]
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
                category: "", // Clear the category field when submitting
                countInStock: 0,
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
                    <div className={'shop max-height-600 m-3 w-25'} key={product._id}>
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
                            <Rating value={product.rating / product.numReviews} text={`${product.numReviews} reviews`}/>
                        </div>
                        <div>
                            <p> {product.categories}</p>
                        </div>

                        {/* Render the form only if the product is being edited */}
                        {formData.editProductId === product._id && (
                            <form onSubmit={handleSubmit}
                                  className={'d-flex align-items-center gap-2 flex-column h-100'}>
                                <input
                                    className={'form-control'}
                                    placeholder={'Product Name'}
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    placeholder="Product Description"
                                    className={'form-control'}
                                    type="text"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    placeholder="Product price"
                                    className={'form-control'}
                                    type="number"
                                    name="price"
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
                                    className={'form-control'}
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Category</option>
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
                                <input
                                    className={'form-control'}
                                    type="file"
                                    name="images"
                                    onChange={handleChange}
                                    multiple
                                    required
                                />
                                <button className={'btn btn-dark m-3'} type="submit">Accept Changes</button>
                            </form>
                        )}

                        {/* Render the "Edit" button if the product is not being edited */}
                        <div className={'d-flex justify-content-center gap-5'}>
                            {formData.editProductId !== product._id && (
                                <button onClick={() => handleEdit(product._id)} className={'btn btn-dark'}>Edit</button>
                            )}
                            <button onClick={() => {
                                axios.delete(`https://platz-shop-api.onrender.com/api/products/delete/${product._id}`)
                                    .then(res => console.log(res))
                                    .catch(e => console.log(e))
                                const buff = products.filter(prod => prod._id !== product._id)
                                setProducts(buff)
                            }} className={'btn btn-dark'}>Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default DashProducts;
