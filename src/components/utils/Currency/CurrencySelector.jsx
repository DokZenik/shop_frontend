import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CurrencySelector = ({ baseCurrency, onCurrencyChange }) => {
    const [exchangeRates, setExchangeRates] = useState({});

    useEffect(() => {
        fetchExchangeRates();
    }, []);
    const fetchExchangeRates = async () => {
        try {
            // Check if exchange rates are available in local storage
            const storedRates = localStorage.getItem('exchangeRates');
            const lastUpdateTime = localStorage.getItem('lastUpdateTime');

            if (storedRates && lastUpdateTime) {
                // If exchange rates and last update time are available, check if 24 hours have passed
                const currentTime = Date.now();
                const twentyFourHours = 24 * 60 * 60 * 1000;

                if (currentTime - Number(lastUpdateTime) <= twentyFourHours) {
                    // If less than 24 hours, use the stored rates
                    setExchangeRates(JSON.parse(storedRates));
                    return;
                }
            }

            // If rates are not available in local storage or 24 hours have passed, make API call
            const response = await axios.get(
                `https://openexchangerates.org/api/latest.json?app_id=1ace611cdcf449f0b9bc47ccefc060fe&base=${baseCurrency}`
            );

            const { rates, timestamp } = response.data;

            // Update the exchange rates state
            setExchangeRates(rates);

            // Store the rates and last update time in local storage
            localStorage.setItem('exchangeRates', JSON.stringify(rates));
            localStorage.setItem('lastUpdateTime', timestamp);
        } catch (error) {
            console.error('Error fetching exchange rates:', error);
        }
    };

    return (
        <div>
            <select
                id="baseCurrency"
                value={baseCurrency}
                onChange={(e) => onCurrencyChange(e.target.value)}
                className={'btn btn-dark'}
            >
                <option value="EUR">EUR</option>
                <option value="CZK">CZK</option>
                <option value="PLN">PLN</option>
            </select>
        </div>
    );
};

export default CurrencySelector;
