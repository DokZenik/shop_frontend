import {useEffect, useState} from "react";
import axios from "axios";

const Product = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = () => {

            console.log("test1")
            axios.get(`https://platz-shop-api.onrender.com/api/products/`)
                .then(res => {
                    setProducts(res.data)
                    console.log(products)
                })
                .catch(e => console.log(e))
        }
        fetchData()
    }, [])


}
export default Product