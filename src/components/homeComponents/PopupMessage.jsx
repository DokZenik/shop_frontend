import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

const PopupMessage = () => {
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const popupTimer = setInterval(() => {
            setShowPopup(true);
        }, 100000);

        return () => {
            clearInterval(popupTimer);
        };
    }, []);


    const handleClosePopup = () => {
        setShowPopup(false);
    };


    return (
        <>
            {showPopup && (
                <div className="popup-message">
                    <div className="popup-content">
            <span className="close" onClick={handleClosePopup}>
              &times;
            </span>
                        <p>Wanna be a seller?</p>
                        <Link to='/businessForm' className='btn btn-dark'>
                            Fill the Form!
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
};

export default PopupMessage;
