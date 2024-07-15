// Home.jsx
import React from 'react';
import LoginForm from './auth/login';

const Home = () => {
    return (
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
        </div>
    );
};

export default Home;