import React from 'react';
import logo from '../../assets/logo_frame.png'
import {Link} from "react-router-dom";


function Header() {

    return (

        <div className="header">
            <Link to={'/'}><img src={logo} alt="BWF Logo" height="150"/></Link>
        </div>

    );
}

export default Header;
