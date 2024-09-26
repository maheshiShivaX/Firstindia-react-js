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
                                <svg
                                    version="1.1"
                                    id="Capa_1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    x="0px"
                                    y="0px"
                                    viewBox="0 0 460.054 460.054"
                                    style={{ enableBackground: 'new 0 0 460.054 460.054' }}
                                    xmlSpace="preserve"
                                    width="25"
                                    height="25"
                                    xmlnssvgjs="http://svgjs.dev/svgjs"
                                >
                                    <g transform="matrix(1,0,0,1,0,0)">
                                        <g>
                                            <g>
                                                <path
                                                    d="M40.003,69.679C17.914,69.679,0,87.592,0,109.697c0,22.089,17.914,39.987,40.003,39.987&#xA;&#9;&#9;&#9;c22.089,0,40.003-17.898,40.003-39.987C80.006,87.592,62.092,69.679,40.003,69.679z"
                                                    fill="#ffffffff"
                                                    data-original-color="#000000ff"
                                                    stroke="none"
                                                />
                                            </g>
                                            <g>
                                                <path
                                                    d="M40.003,190.032C17.914,190.032,0,207.93,0,230.035c0,22.089,17.914,40.002,40.003,40.002&#xA;&#9;&#9;&#9;c22.089,0,40.003-17.913,40.003-40.002C80.006,207.93,62.092,190.032,40.003,190.032z"
                                                    fill="#ffffffff"
                                                    data-original-color="#000000ff"
                                                    stroke="none"
                                                />
                                            </g>
                                            <g>
                                                <path
                                                    d="M40.003,310.37C17.914,310.37,0,328.283,0,350.372c0,22.089,17.914,40.003,40.003,40.003&#xA;&#9;&#9;&#9;c22.089,0,40.003-17.914,40.003-40.003C80.006,328.283,62.092,310.37,40.003,310.37z"
                                                    fill="#ffffffff"
                                                    data-original-color="#000000ff"
                                                    stroke="none"
                                                />
                                            </g>
                                            <g>
                                                <path
                                                    d="M429.973,79.601H145.419c-16.611,0-30.081,13.47-30.081,30.096c0,16.612,13.469,30.081,30.081,30.081h284.554&#xA;&#9;&#9;&#9;c16.61,0,30.081-13.469,30.081-30.081C460.054,93.071,446.583,79.601,429.973,79.601z"
                                                    fill="#ffffffff"
                                                    data-original-color="#000000ff"
                                                    stroke="none"
                                                />
                                            </g>
                                            <g>
                                                <path
                                                    d="M429.973,199.939H145.419c-16.611,0-30.081,13.469-30.081,30.096c0,16.612,13.469,30.081,30.081,30.081h284.554&#xA;&#9;&#9;&#9;c16.61,0,30.081-13.469,30.081-30.081C460.054,213.408,446.583,199.939,429.973,199.939z"
                                                    fill="#ffffffff"
                                                    data-original-color="#000000ff"
                                                    stroke="none"
                                                />
                                            </g>
                                            <g>
                                                <path
                                                    d="M429.973,320.291H145.419c-16.611,0-30.081,13.469-30.081,30.081c0,16.611,13.469,30.08,30.081,30.08h284.554&#xA;&#9;&#9;&#9;c16.61,0,30.081-13.469,30.081-30.08C460.054,333.759,446.583,320.291,429.973,320.291z"
                                                    fill="#ffffffff"
                                                    data-original-color="#000000ff"
                                                    stroke="none"
                                                />
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                                {/* <img src='images/options-lines.png' alt='burger-menu' style={{ height: '25px', width: '25px' }} /> */}
                            </span>
                            <ul className={`d-lg-flex ${isMenuOpen ? 'show' : 'hide'}`}>
                                <li className="nav-item" >
                                    <span className="nav-link hover-color" onClick={onPlayLive}>Live TV</span>
                                </li>
                                <li className="nav-item" onClick={closeMenu}>
                                    <Link to="/public/topvotelist" className='nav-link'>Voting</Link>
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
                            <div className={`dropdown-menu ${isDropdownOpenp ? 'show' : ''}`} aria-labelledby="navbarDropdown" style={{ position: "absolute", right: 0, zIndex: '9999' }}>
                                <div className='user-icon'>
                                    {/* <a className="dropdown-item" href='/myprofile'>My Profile</a> */}
                                    <Link to="/myprofile" className="dropdown-item">My Profile</Link>
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