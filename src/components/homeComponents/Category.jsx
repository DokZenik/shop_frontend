import {Link} from "react-router-dom";
import React, {useState} from "react";

const Category = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return(
        <div className='category-button'>
        <div className='overlay'
             style={isOpen ? {display: 'block'} : {display: 'none'}}
             onClick={toggleDropdown}
        ></div>
        <button className="toggle-button btn btn-dark" onClick={toggleDropdown}>
            Categories
        </button>
        {isOpen &&
            <div className="dropdown-content">
                <ul className='list-group border-0 rounded-0 nav-list scroll w-30'>
                    <li className='list-group-item border-0'><Link to='/'>Красота и
                        здоровье</Link></li>
                    <li className='list-group-item border-0'><Link to='/'>Дом и сад</Link>
                    </li>
                    <li className='list-group-item border-0'><Link to='/'>Одежда и
                        обувь</Link></li>
                    <li className='list-group-item border-0'><Link to='/'>Техника и
                        электроника</Link>
                    </li>
                    <li className='list-group-item border-0'><Link to='/'>Товары для
                        детей</Link></li>
                    <li className='list-group-item border-0'><Link to='/'>Авто-, мото</Link>
                    </li>
                    <li className='list-group-item border-0'><Link to='/'>Подарки, хобби,
                        книги</Link>
                    </li>
                    <li className='list-group-item border-0'><Link to='/'>Аксессуары и
                        украшения</Link>
                    </li>
                    <li className='list-group-item border-0'><Link to='/'>Аксессуары и
                        украшения</Link>
                    </li>
                    <li className='list-group-item border-0'><Link to='/'>Аксессуары и
                        украшения</Link>
                    </li>
                </ul>
                <div className='display-flex flex-wrap gap-5 subMenu_Wrapper scroll'>
                    <ul className='subMenu'>
                        <li>Косметика по догляду</li>
                        <li>Догляд за обличчям</li>
                        <li>Догляд за волоссям</li>
                        <li>Догляд за тілом</li>
                    </ul>
                    <ul className='subMenu'>
                        <li>Косметика по догляду</li>
                        <li>Догляд за обличчям</li>
                        <li>Догляд за волоссям</li>
                        <li>Догляд за тілом</li>
                    </ul>
                    <ul className='subMenu'>
                        <li>Косметика по догляду</li>
                        <li>Догляд за обличчям</li>
                        <li>Догляд за волоссям</li>
                        <li>Догляд за тілом</li>
                    </ul>
                    <ul className='subMenu'>
                        <li>Косметика по догляду</li>
                        <li>Догляд за обличчям</li>
                        <li>Догляд за волоссям</li>
                        <li>Догляд за тілом</li>
                    </ul>
                    <ul className='subMenu'>
                        <li>Косметика по догляду</li>
                        <li>Догляд за обличчям</li>
                        <li>Догляд за волоссям</li>
                        <li>Догляд за тілом</li>
                    </ul>
                    <ul className='subMenu'>
                        <li>Косметика по догляду</li>
                        <li>Догляд за обличчям</li>
                        <li>Догляд за волоссям</li>
                        <li>Догляд за тілом</li>
                    </ul>
                    <ul className='subMenu'>
                        <li>Косметика по догляду</li>
                        <li>Догляд за обличчям</li>
                        <li>Догляд за волоссям</li>
                        <li>Догляд за тілом</li>
                    </ul>
                    <ul className='subMenu'>
                        <li>Косметика по догляду</li>
                        <li>Догляд за обличчям</li>
                        <li>Догляд за волоссям</li>
                        <li>Догляд за тілом</li>
                    </ul>
                </div>
            </div>}
    </div>)
}
export default Category
