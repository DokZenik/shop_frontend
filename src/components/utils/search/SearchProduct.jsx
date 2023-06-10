
const SearchProduct = ( {products, setFilteredItems}) => {
    return (
        <form action={""} className='form__section form'>
            <input
                type="text"
                onChange={(e) => {
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