import React, {useContext, useState} from 'react';
import classes from "./OrderWindow.module.css";
import {CurrencyContext} from "../Currency/CurrensyContext";

const OrderWindow = ({orderItems, setVisible, baseCurrency}) => {
    const [conversionRate, setConversionRate] = useState({
        CZK: 1,
        EUR: 0.0465,
        PLN: 0.2198
    });
    let sum = 0;
    return (
        <div className={classes.order__wrapper} onClick={() => setVisible(false)}>
            <div className={classes.order__container} onClick={e => e.stopPropagation()}>
                {orderItems.map(elem => {
                    sum += elem.count * elem.product.price
                    return (
                    <div className={classes.order__item}>
                        <div className={classes.item__image}>
                            <img src={elem.product.images[0]} alt=""/>
                        </div>
                        <div className={classes.item__name}>
                            <p>{elem.product.name}</p>
                        </div>
                        <div className={classes.item__count}>
                            <p>{elem.count}</p>
                        </div>
                        <div className={classes.item__price}>
                            <p>{`${baseCurrency} ${(elem.product.price * elem.count * conversionRate[baseCurrency]).toFixed(2)}`}</p>
                        </div>
                    </div>
                )})}
                <div className={classes.total}><p>total: {`${baseCurrency} ${(sum * conversionRate[baseCurrency]).toFixed(2)}`}</p></div>
            </div>
        </div>
    );
};

export default OrderWindow;