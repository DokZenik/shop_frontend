import React, { useEffect, useState } from 'react';
import axios from 'axios';
import classes from '../Dashboard/Dashboard.module.css'
const DashBanner = () => {
    const [banners, setBanners] = useState([]);
    const [altText, setAltText] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        fetchBanners();
    }, []);

    const fetchBanners = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/banners');
            setBanners(response.data);
        } catch (error) {
            console.error('Error fetching banners:', error);
        }
    };

    const handleImageUpload = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    const handleAltTextChanged = (event) => {
        setAltText(event.target.value);
    };

    const addBanner = async () => {
        try {
            const formData = new FormData();
            formData.append('image', selectedImage);
            formData.append('altText', altText);

            await axios.post('/api/banners', formData);

            // Clear the form
            setSelectedImage(null);
            setAltText('');

            // Refresh the banners
            fetchBanners();
        } catch (error) {
            console.error('Error adding banner:', error);
        }
    };

    const deleteBanner = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/banners/${id}`);

            // Refresh the banners
            fetchBanners();
        } catch (error) {
            console.error('Error deleting banner:', error);
        }
    };

    return (
        <div className={'d-flex flex-1 flex-column mx-5 gap-5 my-4 scroll'}>
            <h2>Banner Management</h2>
            <div className={'d-flex flex-column w-25 gap-3'}>
                <input className={'form-control'} type="file" accept="image/*" onChange={handleImageUpload} />
                <input className={'form-control'} type="text" placeholder="Alt Text" value={altText} onChange={handleAltTextChanged} />
                <button onClick={addBanner} className={'btn btn-dark'}>Add Banner</button>
            </div>
            <div className={'d-flex flex-column gap-3'}>
                <div>
                    <h5>List of current Banners:</h5>
                </div>
                {banners.map((banner) => (
                    <div key={banner._id} className={'d-flex flex-column p-5 gap-4'}>
                        <img src={banner.imageUrl} alt={banner.altText} />
                        <button onClick={() => deleteBanner(banner._id)} className={'btn btn-dark'}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashBanner;
