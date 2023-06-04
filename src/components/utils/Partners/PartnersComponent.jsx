import React from 'react';
import Header from "../../Header";
import classes from "./PartnersComponent.module.css";

const PartnersComponent = () => {
    return (
        <div>
            <Header cartEnable={false}/>
            <div className={classes.partners__container}>
                <div className={classes.partners__title}></div>
                <div className={classes.partners}>
                    <div className={classes.partner}>
                        <div className={[classes.partner__image, classes.partner__discount].join(" ")}>
                            <img src="/images/1.png" alt="partner image"/>
                        </div>
                        <div className={classes.partner__bonus}>
                            <p>Bonus name</p>
                        </div>
                        <div className={classes.partner__description}>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum, quod?</p>
                        </div>
                    </div>
                    <div className={classes.partner}>
                        <div className={classes.partner__image}>
                            <img src="/images/1.png" alt="partner image"/>
                        </div>
                        <div className={classes.partner__bonus}>
                            <p>Bonus name</p>
                        </div>
                        <div className={classes.partner__description}>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum, quod?</p>
                        </div>
                    </div>
                    <div className={classes.partner}>
                        <div className={classes.partner__image}>
                            <img src="/images/1.png" alt="partner image"/>
                        </div>
                        <div className={classes.partner__bonus}>
                            <p>Bonus name</p>
                        </div>
                        <div className={classes.partner__description}>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum, quod?</p>
                        </div>
                    </div>
                    <div className={classes.partner}>
                        <div className={classes.partner__image}>
                            <img src="/images/1.png" alt="partner image"/>
                        </div>
                        <div className={classes.partner__bonus}>
                            <p>Bonus name</p>
                        </div>
                        <div className={classes.partner__description}>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum, quod?</p>
                        </div>
                    </div>
                    <div className={classes.partner}>
                        <div className={classes.partner__image}>
                            <img src="/images/1.png" alt="partner image"/>
                        </div>
                        <div className={classes.partner__bonus}>
                            <p>Bonus name</p>
                        </div>
                        <div className={classes.partner__description}>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum, quod?</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PartnersComponent;