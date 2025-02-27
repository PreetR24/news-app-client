import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    const [country, setCountry] = useState("in");
    const [category, setCategory] = useState("business");
    const [searchUsing, setSearchUsing] = useState("");

    function handleCountryChange(event) {
        setCountry(event.target.value);
    }
    
    function handleCategoryChange(event) {
        setCategory(event.target.value);
    }

    function handleSearchChange(event) {
        setSearchUsing(event.target.value);
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3 fixed-top">
            <div className="container-fluid">
                <Link className="navbar-brand fs-2" to="/">NewsPulse</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <input 
                                type="text" 
                                className="form-control m-2" 
                                placeholder="Enter a Topic" 
                                value={searchUsing} 
                                onChange={handleSearchChange} 
                            />
                        </li>
                        <li className="nav-item">
                            <Link 
                                to={`/search/${searchUsing}`} 
                                className="btn btn-primary m-2"
                                onClick={() => {
                                    setCountry("in"); // Reset country
                                    setCategory("none"); // Reset category
                                }}
                            >
                                Search News
                            </Link>
                        </li>
                        <li className="nav-item">
                            <select 
                                className="form-select m-2"
                                name="country" 
                                value={country} 
                                onChange={handleCountryChange}
                            >
                                <option value="in">India</option>
                                <option value="us">United States</option>
                                <option value="gb">United Kingdom</option>
                                <option value="de">Germany</option>
                                <option value="fr">France</option>
                            </select>
                        </li>
                        <li className="nav-item">
                            <select 
                                className="form-select m-2"
                                name="category" 
                                value={category} 
                                onChange={handleCategoryChange}
                            >
                                <option value="none">None</option>
                                <option value="business">Business</option>
                                <option value="crime">Crime</option>
                                <option value="domestic">Domestic</option>
                                <option value="education">Education</option>
                                <option value="entertainment">Entertainment</option>
                                <option value="environment">Environment</option>
                                <option value="food">Food</option>
                                <option value="health">Health</option>
                                <option value="lifestyle">Lifestyle</option>
                                <option value="other">Other</option>
                                <option value="politics">Politics</option>
                                <option value="science">Science</option>
                                <option value="sports">Sports</option>
                                <option value="technology">Technology</option>
                                <option value="top">Top</option>
                                <option value="tourism">Tourism</option>
                                <option value="world">World</option>
                            </select>
                        </li>
                        <li className="nav-item">
                            <Link
                                to={`/${country}${category !== 'none' ? `/${category}` : ''}`} 
                                className="btn btn-primary m-2"
                                onClick={() => setSearchUsing("")} // Clear search query when using country/category
                            >
                                Fetch News
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;