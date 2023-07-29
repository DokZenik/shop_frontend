import {Link} from "react-router-dom";
import PartnersComponent from "../components/utils/Partners/PartnersComponent";
import React from "react";


const PreFooter = () => {

    return (
        <div className='info container-lg border-top display-flex justify-content-evenly'>
            <Link to='/partners' element={PartnersComponent}><p>About us</p></Link>
            <Link to='/partners' element={PartnersComponent}><p>Our partners</p></Link>
            <Link to='/partners' element={PartnersComponent}><p>Terms & conditions</p></Link>
            <Link to='/businessForm'><p>For sellers</p></Link>
        </div>
    )

}

export default PreFooter