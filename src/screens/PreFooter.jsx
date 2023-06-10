import {Link} from "react-router-dom";
import PartnersComponent from "../components/utils/Partners/PartnersComponent";


const PreFooter = () => {

    return (
        <div className='container-lg border-top display-flex justify-content-between'>
            <div className='info'>
                <h1 className='info_heading'>Information about Company</h1>
                <Link to='/partners' element={PartnersComponent}><p>About us</p></Link>
                <Link to='/partners' element={PartnersComponent}><p>Our partners</p></Link>
                <Link to='/partners' element={PartnersComponent}><p>Terms & conditions</p></Link>
            </div>
            <div className='info'>
                <h1 className='info_heading'>Information about Company</h1>
                <Link to='/partners' element={PartnersComponent}><p>About us</p></Link>
                <Link to='/partners' element={PartnersComponent}><p>Our partners</p></Link>
                <Link to='/partners' element={PartnersComponent}><p>Terms & conditions</p></Link>
            </div>
            <div className='info'>
                <h1 className='info_heading'>Information about Company</h1>
                <Link to='/partners' element={PartnersComponent}><p>About us</p></Link>
                <Link to='/partners' element={PartnersComponent}><p>Our partners</p></Link>
                <Link to='/partners' element={PartnersComponent}><p>Terms & conditions</p></Link>
            </div>
        </div>
    )

}

export default PreFooter