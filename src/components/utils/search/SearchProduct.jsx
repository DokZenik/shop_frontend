import React, {useEffect, useState} from 'react';
import axios from "axios";

const SearchProduct = ( {products, setFilteredItems}) => {

    const [search, setSearch] = useState('');

    const handleChange = () => {
        setFilteredItems(products.filter(elem => elem.name.toLowerCase().includes(search.toLowerCase())))
    }

    const filteredProducts = products.filter(product => {
        return product.name.toLowerCase().includes(search.toLowerCase());
    });


    return (
        <form action={""} className={"form__section form"}>
            <input
                type="text"
                placeholder="Search for a product"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='form-control rounded search'
            />
            <button type={"submit"} onClick={e => {
                handleChange()
                e.preventDefault()
            }}>search</button>
        </form>
    );
}
export default SearchProduct;