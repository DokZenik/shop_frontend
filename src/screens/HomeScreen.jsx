import React, {useState} from 'react';
import Header from './../components/Header';
import ShopSection from './../components/homeComponents/ShopSection';
import ContactInfo from './../components/homeComponents/ContactInfo';
import CalltoActionSection from './../components/homeComponents/CalltoActionSection';
import Footer from './../components/Footer';
import ModalCart from "../components/utils/Cart/ModalCart";
import Navigation from "./Navigation";
import PreFooter from "./PreFooter";

const HomeScreen = () => {
    window.scrollTo(0, 0);
    const [modal, setModal] = useState(false)
    const [filteredItems, setFilteredItems] = useState([]);

    return (
        <div>
            <Header setVisible={setModal} cartEnable={true} filteredItems={filteredItems} setFilteredItems={setFilteredItems} filterEnable={true}/>
            <Navigation/>
            <ShopSection visible={modal} setVisible={setModal} filteredItems={filteredItems} setFilteredItems={setFilteredItems}/>
            <CalltoActionSection/>
            <ContactInfo/>
            <PreFooter/>
            <Footer/>
        </div>
    );
};

export default HomeScreen;
