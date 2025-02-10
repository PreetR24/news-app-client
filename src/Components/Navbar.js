import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const handleNavLinkClick = () => {
        setIsCollapsed(true); // Collapse the navbar on link click
    };

    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">NewsPulse</Link>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    aria-controls="navbarSupportedContent" 
                    aria-expanded={!isCollapsed} 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isCollapsed ? '' : 'show'}`} id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {["Home", "Business", "Entertainment", "General", "Health", "Science", "Sports", "Technology"].map((category) => (
                            <li className="nav-item" key={category}>
                                <Link className="nav-link" to={`/${category.toLowerCase()}`} onClick={handleNavLinkClick}>
                                    {category}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;