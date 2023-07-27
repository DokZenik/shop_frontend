import React from 'react';
import CartScreen from "../../../screens/CartScreen";
import classes from "./ModalCart.module.css";

const ModalCart = ({visible, setVisible, setIndVisible}) => {

    const rootClasses = [classes.cart_container]
    if(visible){
        rootClasses.push(classes.active)
    }

    return (
        <div onClick={() => setVisible(false)} className={rootClasses.join(' ')}>
            <div className={classes.cart_wrapper} onClick={e => e.stopPropagation()}>
                <CartScreen setIndVisible={setIndVisible} setVisible={setVisible}/>
            </div>
        </div>
    );
};

export default ModalCart;