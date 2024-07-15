// Header.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const baseUrl = process.env.REACT_APP_BASE_URL;

const Header = () => {
    const [menu, setMenu] = useState(null);
    const [error, setError] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isDropdownOpenp, setIsDropdownOpenp] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState(localStorage.getItem('user'));

    const handleMouseEnter = () => {
        if (isDropdownOpen) {
            setIsDropdownOpen(true);
        }
        else if (isDropdownOpenp) {
            setIsDropdownOpenp(true);
        }
    };

    const handleMouseLeave = () => {
        if (isDropdownOpen) {
            setIsDropdownOpen(false);
        }
        else if (isDropdownOpenp) {
            setIsDropdownOpenp(false);
        }
    };

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.post(`${baseUrl}get_type`);
                if (response.status === 200) {
                    setMenu(response.data.result);
                    // console.log("gettype:", response.data.result);
                } else {
                    setError("Failed to fetch banner");
                }
            } catch (error) {
                // console.error('Error fetching data:', error);
                if (error.response && error.response.status === 400) {
                    setError(error.response.data.message);
                } else {
                    setError("Failed to fetch banner. Please try again later.");
                }
            }
        };

        fetchVideos();
    }, []);

    // useEffect(() => {
    //     window.onscroll = () => {
    //       document.getElementById('header-sticky').classList.add('sticky')
    //     }
    //   }, [])

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const onMenuChange = (id) => {
        localStorage.setItem('id', id);
        navigate(`/ott`);
        closeMenu();
    };

    const onHome = () => {
        if (user == 'true') {
            localStorage.removeItem('id');
            navigate('/ott');
        } else {
            navigate('/');
        }
    }

    const onPlayLive = () => {
        navigate('/live');
        closeMenu();
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <header className='sticky-header' >
            <div>
                <div className='mobile-logo'>
                    <div className='logo text-center' onClick={onHome}>
                        <img src='../images/header-logo.png' alt='logo' />
                    </div>
                </div>
                <div className='header d-flex align-items-center justify-content-between container-screen py-2'>
                    <div className='d-flex align-items-center h-100'>
                        <div className='logo desktop-logo' onClick={onHome}>
                            <img src='../images/header-logo.png' alt='logo' />
                        </div>
                        <div className='header-menu text-white'>
                            <span className='burger-menu' onClick={toggleMenu}>
                                <img src='images/options-lines.png' alt='burger-menu' style={{ height: '25px', width: '25px' }} />
                            </span>
                            <ul className={`d-lg-flex ${isMenuOpen ? 'show' : 'hide'}`}>
                                <li className="nav-item" >
                                    <span className="nav-link hover-color" onClick={onPlayLive}>Live TV</span>
                                </li>
                                <li className="nav-item" onClick={closeMenu}>
                                    <Link to="/toptenvote" className='nav-link'>Voting</Link>
                                </li>
                                {error ? (
                                    <p>Error: {error}</p>
                                ) : menu !== null ? (
                                    menu.length > 0 ? (
                                        <React.Fragment>
                                            {menu.slice(0, 4).map(menuItem => (
                                                <li key={menuItem.id} className="nav-item" onClick={() => onMenuChange(menuItem.id)}>
                                                    <span className="nav-link active hover-color">{menuItem.name}</span>
                                                </li>
                                            ))}
                                            {menu.length > 4 && (
                                                <li key={menu.id} className="nav-item dropdown" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                                    <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded={isDropdownOpen}>
                                                        More
                                                    </span>
                                                    <div className={`dropdown-menu burger-moremenu ${isDropdownOpen ? 'show' : ''}`} aria-labelledby="navbarDropdown" >
                                                        {menu.slice(4).map(menuItem => (
                                                            <div key={menuItem.id} onClick={() => onMenuChange(menuItem.id)} className='moremenulist'>
                                                                <span key={menuItem.id} className="dropdown-item dropdown-contain">{menuItem.name}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </li>
                                            )}
                                        </React.Fragment>
                                    ) : (
                                        <p>No menu items available</p>
                                    )
                                ) : (
                                    <p>Loading...</p>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div>
                        <div className="nav-item dropdown user" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            <span className="nav-link user-profile" id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded={isDropdownOpenp}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff" width='24' height='23'>
                                    <path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13Z">
                                    </path>
                                </svg>
                            </span>
                            <div className={`dropdown-menu ${isDropdownOpenp ? 'show' : ''}`} aria-labelledby="navbarDropdown" style={{ position: "absolute", right: 0,zIndex:'9999' }}>
                                <div className='user-icon'>
                                    <a className="dropdown-item" href='#'>My Profile</a>
                                </div>
                                <div onClick={handleLogout} className='user-icon'>
                                    <a className="dropdown-item">Logout</a>
                                </div>

                            </div>
                        </div>
                    </div>
                </div >
            </div>
        </header >
    )
}

export default Header;