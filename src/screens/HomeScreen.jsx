import React, {useContext, useMemo, useState} from 'react';
import Header from './../components/Header';
import ShopSection from './../components/homeComponents/ShopSection';
import ContactInfo from './../components/homeComponents/ContactInfo';
import CalltoActionSection from './../components/homeComponents/CalltoActionSection';
import Footer from './../components/Footer';
import PreFooter from "./PreFooter";
import Banner from "./Banner";
import {useHistory} from "react-router-dom";
import SingleProduct from "./SingleProduct";
import {CurrencyContext} from "../components/utils/Currency/CurrensyContext";

const HomeScreen = () => {
    const { baseCurrency, handleCurrencyChange } = useContext(CurrencyContext);
    window.scrollTo(0, 0);
    const [modal, setModal] = useState(false)
    const [filteredItems, setFilteredItems] = useState([]);
    const [categories, setCategories] = useState([])
    const history = useHistory()

    useMemo(() => {
        if (localStorage.getItem("roles"))
            if (JSON.parse(localStorage.getItem("roles")).includes("ADMIN"))
                history.push("/dashboard")
    }, [])

    return (
        <div>
            <Header setVisible={setModal}
                    cartEnable={true}
                    filteredItems={filteredItems}
                    setFilteredItems={setFilteredItems}
                    filterEnable={true}
                    profileButtonVisible={true}
                    baseCurrency={baseCurrency}
                    onCurrencyChange={handleCurrencyChange}
                    categories={categories}
                    setCategories={setCategories}
            />
            <Banner/>
            <ShopSection visible={modal}
                         setVisible={setModal}
                         filteredItems={filteredItems}
                         setFilteredItems={setFilteredItems}
                         baseCurrency={baseCurrency}
                         setCategories={setCategories}
            />
            <CalltoActionSection/>
            <ContactInfo/>
            <PreFooter/>
            <Footer/>
        </div>
    );
};

export default HomeScreen;
