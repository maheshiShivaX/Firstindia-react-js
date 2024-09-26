import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Layout from '../layout/layout';
import axios from 'axios';
import Category from './category';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { useNavigate } from 'react-router-dom';

const baseUrl = process.env.REACT_APP_BASE_URL;

const Ott = () => {
    const [banners, setBanner] = useState(null);
    const [error, setError] = useState(null);
    const [swiper, setSwiper] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();
    const [sections, setSections] = useState([]);
    const id = localStorage.getItem('id');
    const is_buy = localStorage.getItem('is_buy');

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                let url = `${baseUrl}get_banner`;
                if (id == null) {
                    url += `?type_id=1&is_home_page=1`;
                } else {
                    url += `?type_id=${id}&is_home_page=2`;
                }

                const response = await axios.post(url);
                if (response.status === 200) {
                    setBanner(response.data.result);
                    // console.log("Fetched data successfully:", response);
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
    }, [id]);

    useEffect(() => {
        const fetchSections = async () => {
            try {
                let url = `${baseUrl}section_list`;
                if (id == null) {
                    url += `?type_id=0&is_home_page=1`;
                } else {
                    url += `?type_id=${id}&is_home_page=2`;
                }

                const response = await axios.post(url);
                // console.log(response, "fgfgfgfgffgfgfgfgfgfgfgfgfgfgfg")
                if (response.status === 200) {
                    setSections(response.data.result);
                } else {
                    setError("Failed to fetch sections");
                }
            } catch (error) {
                setError("Failed to fetch sections. Please try again later.");
            }
        };

        fetchSections();
    }, [id]);

    const handleSlideChange = () => {
        if (swiper) {
            setCurrentIndex(swiper.realIndex);
        }
    };

    const onPlay = (type_id, video_type, video_id, upcoming_type) => {
        localStorage.setItem('type_id', type_id);
        localStorage.setItem('video_type', video_type);
        localStorage.setItem('video_id', video_id);
        localStorage.setItem('upcoming_type', upcoming_type);
        navigate('/videos');
    };

    return (
        <Layout>
            <div className="ott-container">
                {error ? (
                    <p>Error: {error}</p>
                ) : banners !== null ? (
                    banners.length > 0 ? (
                        <Swiper
                            onSwiper={swiper => setSwiper(swiper)}
                            onSlideChange={handleSlideChange}
                            pagination={{ clickable: true }}
                            slidesPerView={1}
                            spaceBetween={15}
                            loop={true}
                            autoplay={{ delay: 3000 }}
                            speed={1000}
                        >
                            {banners.map((banner, index) => (
                                <SwiperSlide key={index}>
                                    <div className='banner-box'>
                                        <div
                                            key={banner.id}
                                            onClick={() => onPlay(banner.type_id, banner.video_type, banner.id, banner.upcoming_type)}
                                            className="banner-link"
                                        >
                                            <div className='play-icon-banner'>
                                                <span>
                                                    <svg version="1.1" id="Capa_1" viewBox="0 0 58 58" style={{ enableBackground: 'new 0 0 58 58' }} width="100" height="100">
                                                        <circle cx="29" cy="29" r="29" fill="#050000df" />
                                                        <g>
                                                            <polygon points="44,29 22,44 22,29.273 22,14" fill="#ffffffff" />
                                                            <path d="M22,45c-0.16,0-0.321-0.038-0.467-0.116C21.205,44.711,21,44.371,21,44V14
                                                         c0-0.371,0.205-0.711,0.533-0.884c0.328-0.174,0.724-0.15,1.031,0.058l22,15C44.836,28.36,45,28.669,45,29
                                                         s-0.164,0.64-0.437,0.826l-22,15C22.394,44.941,22.197,45,22,45z M23,15.893v26.215L42.225,29L23,15.893z" fill="#ffffffff" />
                                                        </g>
                                                    </svg>
                                                </span>
                                            </div>
                                            <img
                                                src={banner.landscape}
                                                alt='banner'
                                                style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
                                            />
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <p>No banner available</p>
                    )
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <div className="pt-lg-5 pt-4 supersingerbannmer">
                <img src="images/supersingerbannmer.jpg" alt="Super Singer Banner" />
            </div>
            <div className='container-screen'>
                <div className="category-container">
                    {error ? (
                        <p>Error: {error}</p>
                    ) : sections.length > 0 ? (
                        sections.map(section => (
                            <div key={section.id}>
                                <h1 className='sectiontitle'>{section.title}</h1>
                                <div className='videos-slider pb-6'>
                                    <Swiper
                                        onSwiper={setSwiper}
                                        onSlideChange={handleSlideChange}
                                        pagination={true}
                                        spaceBetween={15}
                                        breakpoints={{
                                            // when window width is >= 320px
                                            300: {
                                                slidesPerView: 2,
                                            },
                                            // when window width is >= 480px
                                            480: {
                                                slidesPerView: 3,
                                            },
                                            // when window width is >= 640px
                                            640: {
                                                slidesPerView: 4,
                                            },
                                            // when window width is >= 1024px
                                            992: {
                                                slidesPerView: 5,
                                            },
                                        }}
                                    >
                                        {section.data.map((video, index) => (
                                            <SwiperSlide key={index}>
                                                <div className='video-box'>
                                                    <div
                                                        key={video.id}
                                                        onClick={() => onPlay(section.type_id, video.video_type, video.id, section.upcoming_type)}
                                                        className="video-link"
                                                    >
                                                        <div className='play-icon-content'>
                                                            <span>
                                                                <svg version="1.1" id="Capa_1" viewBox="0 0 58 58" style={{ enableBackground: 'new 0 0 58 58' }} width="100" height="100">
                                                                    <circle cx="29" cy="29" r="29" fill="#050000df" />
                                                                    <g>
                                                                        <polygon points="44,29 22,44 22,29.273 22,14" fill="#ffffffff" />
                                                                        <path d="M22,45c-0.16,0-0.321-0.038-0.467-0.116C21.205,44.711,21,44.371,21,44V14
                                                                        c0-0.371,0.205-0.711,0.533-0.884c0.328-0.174,0.724-0.15,1.031,0.058l22,15C44.836,28.36,45,28.669,45,29
                                                                        s-0.164,0.64-0.437,0.826l-22,15C22.394,44.941,22.197,45,22,45z M23,15.893v26.215L42.225,29L23,15.893z" fill="#ffffffff" />
                                                                    </g>
                                                                </svg>
                                                            </span>
                                                        </div>
                                                        <img
                                                            src={video.landscape}
                                                            alt='videos'
                                                        />
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </Layout >
    );
};

export default Ott;
