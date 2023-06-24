import {Link, useHistory} from "react-router-dom";
import React, {useMemo, useState} from "react";
import SubMenu from "../utils/subMenu/SubMenu";
import {useFetching} from "../utils/CustomHooks/useFetching";
import axios from "axios";
import Preloader from "../utils/Preloader/Preloader";

const Category = ({products, setFilteredItems, setCategories}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState("");
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
    const [fullCatData, setFullCatData] = useState([])
    const history = useHistory()

    const [fetchCategories, areCategoriesLoading, error] = useFetching(() => {
        axios.get("https://platz-shop-api.onrender.com/api/categories", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => {
            setFullCatData(res.data)
            formData(res.data, "")
        })
    })

    let objectForDisplay = {}


    const [subcategories, setSubcategories] = useState({
        // Clothing: [
        //     {
        //         name: "Accessories",
        //         items: [
        //             {name: "Beanies", link: "https://codyhouse.co/?p=748"},
        //             {name: "Caps & Hats", link: "https://codyhouse.co/?p=748"},
        //             {name: "Glasses", link: "https://codyhouse.co/?p=748"},
        //             {name: "Gloves", link: "https://codyhouse.co/?p=748"},
        //             {name: "Jewellery", link: "https://codyhouse.co/?p=748"},
        //         ],
        //     },
        // ],
        // Electronics: [
        //     {
        //         name: "Computers",
        //         items: [
        //             {name: "Laptops", link: "https://codyhouse.co/?p=748"},
        //             {name: "Desktops", link: "https://codyhouse.co/?p=748"},
        //             {name: "Monitors", link: "https://codyhouse.co/?p=748"},
        //             {name: "Keyboards", link: "https://codyhouse.co/?p=748"},
        //             {name: "Mice", link: "https://codyhouse.co/?p=748"},
        //         ],
        //     },
        //     {
        //         name: "Mobile Phones",
        //         items: [
        //             {name: "Apple", link: "https://codyhouse.co/?p=748"},
        //             {name: "Samsung", link: "https://codyhouse.co/?p=748"},
        //             {name: "Google", link: "https://codyhouse.co/?p=748"},
        //             {name: "OnePlus", link: "https://codyhouse.co/?p=748"},
        //             {name: "Xiaomi", link: "https://codyhouse.co/?p=748"},
        //         ],
        //     },
        //     {
        //         name: "Pc components",
        //         items: [
        //             {name: 'VideoCard', link: 'https://codyhouse.co/?p=748'},
        //             {name: 'MotherBoard', link: 'https://codyhouse.co/?p=748'},
        //             {name: 'Memory', link: 'https://codyhouse.co/?p=748'},
        //             {name: 'Processor', link: 'https://codyhouse.co/?p=748'},
        //             {name: 'HDD/SSD', link: 'https://codyhouse.co/?p=748'},
        //         ],
        //     },
        // ],
    })

    const formData = (data, title) => {
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


    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const toggleSubmenu = (category) => {
        setCurrentCategory(category);
        setIsSubmenuOpen(true);
    };

    const closeSubmenu = () => {
        setIsSubmenuOpen(false);
    };

    useMemo(() => {
        fetchCategories()
    }, [])

    return (
        <>
            {areCategoriesLoading
                ? <Preloader/>
                :
                <div className="category-button">
                    <div
                        className="overlay"
                        style={isOpen ? {display: "block"} : {display: "none"}}
                        onClick={toggleDropdown}
                    ></div>
                    <button
                        className="toggle-button btn btn-dark"
                        onClick={() => {
                            toggleDropdown();
                            setIsSubmenuOpen(false);
                        }}
                    >
                        Categories
                    </button>
                    {isOpen && (
                        <ul className="cd-dropdown-content">
                            {Object.entries(subcategories).map(([category, subcategoryList]) => (
                                <li className="has-children" key={category}
                                >
                                    <Link
                                        to="/"
                                        className="category-link"
                                        onMouseEnter={() => toggleSubmenu(category)}
                                    >
                                        <p>{category}</p>
                                        <svg
                                            width="20px"
                                            height="20px"
                                            viewBox="0 0 1024.00 1024.00"
                                            className="icon"
                                            version="1.1"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="#ebebeb"
                                            stroke="#ebebeb"
                                        >
                                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                            <g
                                                id="SVGRepo_tracerCarrier"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            ></g>
                                            <g id="SVGRepo_iconCarrier">
                                                <path
                                                    d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z"
                                                    fill="#ebebeb"
                                                ></path>
                                            </g>
                                        </svg>
                                    </Link>
                                    {currentCategory === category && (
                                        <SubMenu
                                            category={category}
                                            subcategories={subcategoryList}
                                            isSubmenuOpen={isSubmenuOpen}
                                            closeSubmenu={closeSubmenu}
                                            products={products}
                                            setFilteredItems={setFilteredItems}
                                            setCategories= {setCategories}
                                            catData={fullCatData}
                                        />
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            }
        </>
    );
};

export default Category;
