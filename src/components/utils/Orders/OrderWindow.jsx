import React from 'react';
import classes from "./OrderWindow.module.css";

const OrderWindow = ({orderItems, setVisible}) => {
    let sum = 0;
    return (
        <div className={classes.order__wrapper} onClick={() => setVisible(false)}>
            <div className={classes.order__container} onClick={e => e.stopPropagation()}>
                {orderItems.map(elem => {
                    sum += elem.count * elem.product.price
                    return (
                    <div className={classes.order__item}>
                        <div className={classes.item__image}>
                            <img src={elem.product.image} alt=""/>
                        </div>
                        <div className={classes.item__name}>
                            <p>{elem.product.name}</p>
                        </div>
                        <div className={classes.item__count}>
                            <p>{elem.count}</p>
                        </div>
                        <div className={classes.item__price}>
                            <p>{elem.product.price * elem.count}$</p>
                        </div>
                    </div>
                )})}
                <div className={classes.total}><p>total: {sum}$</p></div>
            </div>
        </div>
    );
};

export default OrderWindow;