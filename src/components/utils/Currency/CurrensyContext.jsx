import React, { createContext, useState } from 'react';

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
    const [baseCurrency, setBaseCurrency] = useState('CZK');

    const handleCurrencyChange = (currency) => {
        setBaseCurrency(currency);
    };

    return (
        <CurrencyContext.Provider value={{ baseCurrency, handleCurrencyChange }}>
            {children}
        </CurrencyContext.Provider>
    );
};

export default CurrencyProvider