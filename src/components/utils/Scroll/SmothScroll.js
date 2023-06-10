import React from 'react';

function SmoothScrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
export default SmoothScrollToTop;