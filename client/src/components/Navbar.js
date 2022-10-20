import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom'
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from 'react-router-dom'

const Navbar = () => {
    const auth = useContext(AuthContext)
    const navigate = useNavigate()
    const logoutHandler = (e) => {
        e.preventDefault()
        auth.logout()
        navigate('/')
    }
    return (
        <nav>
            <div className="nav-wrapper blue-grey darken-1">
                <span className="brand-logo">Make your links</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to={'/create'}>Create</NavLink></li>
                    <li><NavLink to={'/links'}>Links</NavLink></li>
                    <li><a href={'/'} onClick={logoutHandler}>Logout</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;