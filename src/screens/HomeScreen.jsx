import React, {useMemo, useState} from 'react';
import Header from './../components/Header';
import ShopSection from './../components/homeComponents/ShopSection';
import ContactInfo from './../components/homeComponents/ContactInfo';
import CalltoActionSection from './../components/homeComponents/CalltoActionSection';
import Footer from './../components/Footer';
import PreFooter from "./PreFooter";
import Banner from "./Banner";
import {useHistory} from "react-router-dom";

const HomeScreen = () => {
    window.scrollTo(0, 0);
    const [modal, setModal] = useState(false)
    const [filteredItems, setFilteredItems] = useState([]);
    const [baseCurrency, setBaseCurrency] = useState('EUR');
    const history = useHistory()
    const handleCurrencyChange = (selectedCurrency) => {
        setBaseCurrency(selectedCurrency);
    };

    useMemo(() => {
        if (localStorage.getItem("roles"))
            if (JSON.parse(localStorage.getItem("roles")).includes("ADMIN"))
                history.push("/dashboard")
    }, [])

    return (
        <div>
            <Header setVisible={setModal} cartEnable={true} filteredItems={filteredItems}
                    setFilteredItems={setFilteredItems} filterEnable={true} profileButtonVisible={true} baseCurrency={baseCurrency} onCurrencyChange={handleCurrencyChange}/>
            <Banner/>
            <ShopSection visible={modal} setVisible={setModal} filteredItems={filteredItems}
                         setFilteredItems={setFilteredItems} baseCurrency={baseCurrency} />
            <CalltoActionSection/>
            <ContactInfo/>
            <PreFooter/>
            <Footer/>
        </div>
    );
};

export default HomeScreen;
