// Subscription.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../layout/layout';

const Subscribtion = () => {
    const navigate = useNavigate();

    const onSubscribe = () => {
        navigate('/paymentgateway');
    };

    return (
        <Layout>
            <div className='subscription-page row justify-content-center w-100'>
                <div className='subscribe-main col-md-4 col-sm-6 col-12'>
                    <div className='subscription-box card'>
                        <div className='text-white'>
                            <h2 className='text-center'>Premium</h2>
                            <h5 className='text-center'>₹ 1 For 3 Months</h5>
                            <div className='show-services'>
                                <ul>
                                    <li><img src="images/tick-circle.png" alt="check" /><span>checkAll Content</span></li>
                                    <li><img src="images/tick-circle.png" alt="check" /><span>checkMovies, Live Sports, TV, Specials</span></li>
                                    <li><img src="images/tick-circle.png" alt="check" /><span>checkWatch on web</span></li>
                                    <li><img src="images/tick-circle.png" alt="check" /><span>checkNumber of devices that can be logged in</span></li>
                                    <li><img src="images/tick-circle.png" alt="check" /><span>checkMax video quality (1080p)</span></li>
                                </ul>
                            </div>
                        </div>
                        <div className='subscribe-btn d-flex justify-content-center'>
                            <button onClick={onSubscribe}>Subscribe Now </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Subscribtion;