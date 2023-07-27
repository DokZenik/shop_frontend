import React, {useContext, useMemo, useState} from 'react';
import Header from './../components/Header';
import ShopSection from './../components/homeComponents/ShopSection';
import ContactInfo from './../components/homeComponents/ContactInfo';
import CalltoActionSection from './../components/homeComponents/CalltoActionSection';
import Footer from './../components/Footer';
import PreFooter from "./PreFooter";
import Banner from "./Banner";
import {useHistory} from "react-router-dom";
import {CurrencyContext} from "../components/utils/Currency/CurrensyContext";
import PopupMessage from "../components/homeComponents/PopupMessage";

const HomeScreen = ({indVisible, setIndVisible}) => {
    const { baseCurrency, handleCurrencyChange } = useContext(CurrencyContext);
    // window.scrollTo(0, 0);
    const [modal, setModal] = useState(false)
    const [filteredItems, setFilteredItems] = useState([]);
    // const [indVisible, setIndVisible] = useState(true);
    const [categories, setCategories] = useState([])
    const history = useHistory()

    useMemo(() => {
        if (localStorage.getItem("roles"))
            if (JSON.parse(localStorage.getItem("roles")).includes("ADMIN") || JSON.parse(localStorage.getItem("roles")).includes("SELLER"))
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
                    indVisible={indVisible}
            />
            <Banner/>
            <ShopSection visible={modal}
                         setVisible={setModal}
                         filteredItems={filteredItems}
                         setFilteredItems={setFilteredItems}
                         baseCurrency={baseCurrency}
                         setCategories={setCategories}
                         categories={categories}
                         setIndVisible={setIndVisible}
            />
            <CalltoActionSection/>
            <ContactInfo/>
            <PreFooter/>
            <PopupMessage/>
            <Footer/>
        </div>
    );
};

export default HomeScreen;
