
const SearchProduct = ( {products, setFilteredItems, categories}) => {
    return (
        <form action={""} className='form__section form'>
            <input
                type="text"
                placeholder="Search for a product"
                onChange={(e) => {
                    let buff = products.filter(elem => elem.name.toLowerCase().includes(e.target.value.toLowerCase()))
                    if(categories)
                        buff = buff.filter(elem => {
                            let index = false
                            elem.categories.forEach(category => {
                                if(categories.includes(category))
                                    index = true
                            })
                            return index
                        })
                    setFilteredItems(buff)
                }}
                className='form-control rounded search'
            />
            <button className='search-button' type={"submit"} onClick={e => {
                e.preventDefault()
            }}>search</button>
        </form>
    );
}
export default SearchProduct;