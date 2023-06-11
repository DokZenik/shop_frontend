import React from "react";

const SubMenu = ({ category, subcategories, isSubmenuOpen, closeSubmenu }) => {
    return (
        isSubmenuOpen && (
            <ul className="cd-secondary-dropdown">
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
                                <li key={i}>
                                    <a href={item.link}>{item.name}</a>
                                </li>
                            ))}
                            <li className="see-all">
                                <a href="https://codyhouse.co/?p=748">All {subcategory.name}</a>
                            </li>
                        </ul>
                    </li>
                ))}
            </ul>
        )
    );
};

export default SubMenu;
