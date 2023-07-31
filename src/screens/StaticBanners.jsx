import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../scss/App.scss';

const StaticBanners = () => {
    const [staticBanners, setStaticBanners] = useState([]);

    useEffect(() => {
        fetchStaticBanners();
    }, []);

    const fetchStaticBanners = async () => {
        try {
            const response = await axios.get('https://platz-shop-api.onrender.com/api/staticBanners');
            setStaticBanners(response.data);
        } catch (error) {
            console.error('Error fetching static banners:', error);
        }
    };

    return (
        <div>
            {/* Computer version */}
            <div>
                <div className={'static-banners d-flex flex-column gap-1 justify-content-between m-1'}>
                    {staticBanners.map((banner) => (
                        <div key={banner._id} className={'static-image'}>
                            <img src={banner.imageUrl} alt="" />
                        </div>
                    ))}
                </div>
            </div>
            {/* Mobile version */}
            <div>
                <div className={'static-banners-mobile d-flex mt-2 gap-2'}>
                    {staticBanners.map((banner) => (
                        <div key={banner._id} className={'static-image-mobile'}>
                            <img src={banner.imageUrl} alt="" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StaticBanners;
