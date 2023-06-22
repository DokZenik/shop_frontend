import React from 'react';
import Header from "../../Header";
import classes from "./PartnersComponent.module.css";
import MapboxMap from "./PartnersMap";

const PartnersComponent = () => {
    const [selectedCategory, setSelectedCategory] = React.useState(null);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const partners = [
        {
            id: 1,
            image: "/images/1.png",
            bonus: "Bonus name 1",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum, quod?",
            category: "Category 1",
        },
        {
            id: 2,
            image: "/images/2.png",
            bonus: "Bonus name 2",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum, quod?",
            category: "Category 2",
        },
        {
            id: 3,
            image: "/images/2.png",
            bonus: "Bonus name 2",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum, quod?",
            category: "Category 2",
        },
        {
            id: 4,
            image: "/images/2.png",
            bonus: "Bonus name 2",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum, quod?",
            category: "Category 2",
        },
        {
            id: 5,
            image: "/images/2.png",
            bonus: "Bonus name 2",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum, quod?",
            category: "Category 2",
        },
        {
            id: 6,
            image: "/images/2.png",
            bonus: "Bonus name 2",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum, quod?",
            category: "Category 2",
        },
        // Add more partner objects with different categories
    ];

    const filteredPartners = selectedCategory
        ? partners.filter((partner) => partner.category === selectedCategory)
        : partners;

    return (
        <>
            <div>
                <Header cartEnable={false}/>
                <div className={`${classes.partners__container} d-flex flex-column gap-5`}>
                    <div className={'w-75 m-auto'}><MapboxMap/></div>
                    <div className={'d-flex'}>
                        <div className={`${classes.partners__filter} flex-1`}>
                            <h3>Filter by Category</h3>
                            <ul className={`list-unstyled ${classes.partners__categoryList}`}>
                                <li
                                    className={selectedCategory === null ? classes.active : ""}
                                    onClick={() => handleCategoryChange(null)}
                                >
                                    All
                                </li>
                                <li
                                    className={selectedCategory === "Category 1" ? classes.active : ""}
                                    onClick={() => handleCategoryChange("Category 1")}
                                >
                                    Category 1
                                </li>
                                <li
                                    className={selectedCategory === "Category 2" ? classes.active : ""}
                                    onClick={() => handleCategoryChange("Category 2")}
                                >
                                    Category 2
                                </li>
                                {/* Add more categories */}
                            </ul>
                        </div>
                        <div className={classes.partners__title}></div>
                        <div className={`classes.partners d-flex flex-1 flex-wrap gap-3`}>
                            {filteredPartners.map((partner) => (
                                <div className={classes.partner} key={partner.id}>
                                    <div className={classes.partner__image}>
                                        <img src={partner.image} alt="partner image"/>
                                    </div>
                                    <div className={classes.partner__bonus}>
                                        <p>{partner.bonus}</p>
                                    </div>
                                    <div className={classes.partner__description}>
                                        <p>{partner.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PartnersComponent;
