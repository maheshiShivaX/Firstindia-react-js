// Home.jsx
import React, { useEffect, useState } from 'react';
import LoginForm from './auth/login';
import './home.css';
import { Link } from 'react-router-dom';

const Home = () => {
    const [isOffer, setIsOffer] = useState(true);

    return (
        <>
            <div className='youthfestival_apply_button'>
                <Link to='/youthfestivalplus'>YOUTH FESTIVAL PLUS</Link>
            </div>
            <div className='d-flex justify-content-center home'>
                <div className='homeimagebg d-flex justify-content-center align-items-center w-100'>
                    <div className='homepagecontent'>
                        <div className='d-flex justify-content-center'>
                            <div className='homeheading col-9'>
                                <h1>TV Shows, Movies And More ...</h1>
                                <p>Ready to watch? Enter your Phone No to create or restart your account.</p>
                            </div>
                        </div>
                        <LoginForm />
                    </div>
                </div>

                <div id="termpopupContainer" className={`homepopup-container homepopup ${isOffer ? 'open' : ''}`}>
                    <div className="closebtnhome">
                        <button onClick={() => setIsOffer(false)} className="">
                            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M17.0007 31.1668C9.17661 31.1668 2.83398 24.8241 2.83398 17.0002C2.83398 9.17613 9.17661 2.8335 17.0007 2.8335C24.8246 2.8335 31.1673 9.17613 31.1673 17.0002C31.1673 24.8241 24.8246 31.1668 17.0007 31.1668ZM17.0007 14.9967L12.9937 10.9898L10.9902 12.9932L14.9972 17.0002L10.9902 21.0071L12.9937 23.0105L17.0007 19.0036L21.0076 23.0105L23.011 21.0071L19.0041 17.0002L23.011 12.9932L21.0076 10.9898L17.0007 14.9967Z"
                                    fill="#FF0200" />
                                <path
                                    d="M17.0006 14.9967L12.9937 10.9897L10.9902 12.9932L14.9972 17.0002L10.9902 21.0071L12.9937 23.0105L17.0006 19.0036L21.0075 23.0105L23.011 21.0071L19.0041 17.0002L23.011 12.9932L21.0075 10.9897L17.0006 14.9967Z"
                                    fill="white" />
                            </svg>
                        </button>
                    </div>
                    <div className="offerbanner">
                        <img src='./images/summer-offer.png' alt='offerbanner' />
                    </div>
                </div>
            </div>

        </>

    );
};

export default Home;