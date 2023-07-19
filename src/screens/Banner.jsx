import React, { useEffect, useState } from 'react';
import '../scss/App.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Autoplay, Navigation, Pagination} from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/modules/pagination/pagination.scss';

const Banner = () => {
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/banners')
            .then((response) => response.json())
            .then((data) => setBanners(data))
            .catch((error) => console.error(error));
        console.log(banners)
    }, []);

    return (
        <div className="container-xxl">
            <Swiper speed={1500} pagination={{ dynamicBullets: true }} navigation={true} autoplay={true} modules={[Pagination, Navigation, Autoplay]}>
                {banners.map((banner) => (
                    <SwiperSlide key={banner._id}>
                        <img className="d-block w-100" src={banner.imageUrl} alt={banner.altText} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Banner;
