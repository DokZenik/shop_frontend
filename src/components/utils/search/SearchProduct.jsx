
const SearchProduct = ( {products, setFilteredItems}) => {
    return (
        <form action={""} className={"form__section form"}>
            <input
                type="text"
<<<<<<< HEAD
=======
                placeholder="Search for a product"
                // value={search}
>>>>>>> parent of 25228fd (123)
                onChange={(e) => {
                    // setSearch(e.target.value)
                    // console.log("products")
                    // console.log(products)
                    // console.log(products.filter(elem => elem.name.toLowerCase().includes(e.target.value.toLowerCase())))
                    setFilteredItems(products.filter(elem => elem.name.toLowerCase().includes(e.target.value.toLowerCase())))
                }}
                className='form-control rounded search'
            />
            <button type={"submit"} onClick={e => {
                e.preventDefault()
            }}>search</button>
        </form>
    );
}
export default SearchProduct;