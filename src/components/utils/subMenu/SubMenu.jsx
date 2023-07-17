import React from "react";

const SubMenu = ({ category, subcategories, isSubmenuOpen, closeSubmenu, products, setFilteredItems, setCategories, catData, setIsOpen}) => {
    return (
        isSubmenuOpen && (
            <ul className="cd-secondary-dropdown scroll">
                {subcategories.map((subcategory, index) => (
                    <li className="has-children" key={index}>
                        <a className='category-title' href="#0">{subcategory.name}</a>
                        <ul className="third-dropdown is-open">
                            {/*<li className="go-back">*/}
                            {/*    <a href="#0" onMouseEnter={closeSubmenu}>*/}
                            {/*        {category}*/}
                            {/*    </a>*/}
                            {/*</li>*/}
                            {subcategory.items.map((item, i) => (
                                <li key={i} onClick={() => {
                                    setCategories([item.name])
                                    setFilteredItems(products.filter(elem => elem.categories.includes(item.name)))
                                    setIsOpen()
                                }}>
                                    <a href={item.link}>{item.name}</a>
                                </li>
                            ))}
                            <li className="see-all" onClick={() => {
                                const buff = catData.filter(item => item.title === subcategory.name).map(elem => elem.value)
                                setCategories(buff)
                                setFilteredItems(products.filter(elem => {
                                    let index = false
                                    elem.categories.forEach(category => {
                                        if(buff.includes(category))
                                            index = true
                                    })
                                    return index
                                }))
                                setIsOpen()
                            }}>
                                <a href="#">All {subcategory.name}</a>
                            </li>
                        </ul>
                    </li>
                ))}
            </ul>
        )
    );
};

export default SubMenu;
