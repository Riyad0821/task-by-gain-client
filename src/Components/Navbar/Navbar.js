import React from "react";
import "./Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar_container">
                <ul className="navbar_menu">
                    <li className="navbar_item">
                        <a href="/students" className="navbar_links" id="students">Students</a>
                    </li>
                    <li className="navbar_item">
                        <a href="/subjects" className="navbar_links" id="subjects">Subjects</a>
                    </li>
                    <li className="navbar_item">
                        <a href="/chart" className="navbar_links" id="chart">Chart</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;