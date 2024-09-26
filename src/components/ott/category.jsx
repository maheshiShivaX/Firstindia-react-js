import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
const baseUrl = process.env.REACT_APP_BASE_URL;

const Category = () => {
    const [sections, setSections] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [swiper, setSwiper] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const id = localStorage.getItem('id');
    // console.log(id,'id')

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
                // console.log(response,"fgfgfgfgffgfgfgfgfgfgfgfgfgfgfg")
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

    const onPlay = (type_id, video_type, video_id, upcoming_type) => {
        localStorage.setItem('type_id', type_id);
        localStorage.setItem('video_type', video_type);
        localStorage.setItem('video_id', video_id);
        localStorage.setItem('upcoming_type', upcoming_type);
        navigate('/videos');
    };

    const handleSlideChange = () => {
        if (swiper) {
            setCurrentIndex(swiper.realIndex);
        }
    };

    return (
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
                                slidesPerView={5}
                                spaceBetween={15}
                            >
                                {section.data.map((video, index) => (
                                    <SwiperSlide key={index}>
                                        <div className='video-box'>
                                            <div
                                                key={video.id}
                                                onClick={() => onPlay(section.type_id, video.video_type, video.id, section.upcoming_type)}
                                                className="video-link"
                                            >
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
    );
};

export default Category;
