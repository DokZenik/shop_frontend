import React, {useEffect, useState} from 'react';
import './scss/App.scss';
import './responsive.scss';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import SingleProduct from './screens/SingleProduct';
import Login from './screens/Login';
import Register from './screens/Register';
import ShippingScreen from './screens/ShippingScreen';
import ProfileScreen from './screens/ProfileScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import NotFound from './screens/NotFound';
import Cookies from "js-cookie";
import PartnersComponent from "./components/utils/Partners/PartnersComponent";
import Dashboard from "./components/utils/Dashboard/Dashboard";
import DashProducts from "./components/utils/Dashboard/DashProducts";
import BusinessForm from "./components/homeComponents/BusinessForm";

const App = () => {
    const [baseCurrency, setBaseCurrency] = useState('EUR');
    const [indVisible, setIndVisible] = useState(false);
    const handleCurrencyChange = (selectedCurrency) => {
        setBaseCurrency(selectedCurrency);
    };
    useEffect(() => {
        const COOKIE_NAME = "visit"
        const cookie = document.querySelector('.cookie--js')
        const cookieButton = document.querySelector('.cookie__btn')
        if (!Cookies.get(COOKIE_NAME)) {
            setTimeout(() => {
                cookie.classList.add('cookie__show')
            }, 1000)
            cookieButton.addEventListener('click', () => {
                cookie.classList.remove('cookie__show')
                Cookies.set(COOKIE_NAME, true)
            })

        }
    })


    return (
        <>
            <div className="cookie_wrapper cookie--js">
                <div className="cookie__left">
                    This website uses cookies
                    We use cookies to personalise content and ads, to provide social media features and to analyse our
                    traffic. We also share information about your use of our site with our social media, advertising and
                    analytics partners who may combine it with other information that you’ve provided to them or that
                    they’ve collected from your use of their services.
                </div>
                <div className="cookie__right">
                    <button className="cookie__success cookie__btn">accept</button>
                    <a href="#" className="cookie__details">Details</a>
                </div>
            </div>

            <Router>
                <Switch>
                    <Route
                        path="/"
                        render={(props) => (
                            <HomeScreen
                                {...props}
                                baseCurrency={baseCurrency}
                                onCurrencyChange={handleCurrencyChange}
                                indVisible={indVisible}
                                setIndVisible={setIndVisible}
                            />
                        )}
                        exact
                    />
                    <Route
                        path='/businessForm'
                        component={BusinessForm}
                        />
                    <Route
                        path="/products/:id"
                        render={(props) =>
                            <SingleProduct
                                {...props}
                                baseCurrency={baseCurrency}
                                onCurrencyChange={handleCurrencyChange}
                                indVisible={indVisible}
                                setIndVisible={setIndVisible}
                            />}
                    />
                    <Route
                        path="/login/:status"
                        component={Login}
                    />
                    <Route
                        path="/register"
                        component={Register}
                    />
                    <Route
                        path="/profile"
                        render={(props) => <ProfileScreen {...props} baseCurrency={baseCurrency} onCurrencyChange={handleCurrencyChange}/>}
                    />
                    <Route
                        path="/shipping"
                        component={ShippingScreen}
                    />
                    <Route
                        path="/payment"
                        component={PaymentScreen}
                    />
                    <Route
                        path="/placeorder"
                        component={PlaceOrderScreen}
                    />
                    <Route
                        path="/order"
                        render={(props) => <OrderScreen {...props} baseCurrency={baseCurrency} onCurrencyChange={handleCurrencyChange}/>}
                    />
                    <Route
                        path="/partners"
                        component={PartnersComponent}
                    />
                    <Route
                        path="/dashboard"
                        render={(props) => <Dashboard {...props} baseCurrency={baseCurrency} onCurrencyChange={handleCurrencyChange}/>}
                    />
                    <Route
                    path='/dashProducts'
                    component={DashProducts}
                    />
                    <Route
                        path="*"
                        component={NotFound}
                    />
                </Switch>
            </Router>
        </>
    );
};

export default App;
