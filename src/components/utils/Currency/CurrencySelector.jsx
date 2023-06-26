import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CurrencySelector = ({ baseCurrency, onCurrencyChange }) => {
    const [conversionRate, setConversionRate] = useState(null);

    useEffect(() => {
        axios
            .get('https://api.exchangerate-api.com/v4/latest/EUR')
            .then((response) => {
                setConversionRate(response.data.rates);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

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
