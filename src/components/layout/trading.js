import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Videos from './videos';

const TradingNow = () => {
    const [sections, setSections] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [type_id, setTypeId] = useState();
    const [video_type, setVideoType] = useState();
    const [video_id, setVideoId] = useState();
    const [upcoming_type, setUpcomingType] = useState();

    useEffect(() => {
        const fetchSections = async () => {
            try {
                const response = await axios.post(`https://ishivaxservices.com/admin_panel/public/api/section_list?type_id=1&is_home_page=1`);
                if (response.status === 200) {
                    setSections(response.data.result);
                    // console.log(response.data.result)
                } else {
                    setError("Failed to fetch sections");
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError("Failed to fetch sections. Please try again later.");
            }
        };

        fetchSections();
    }, []);

    const onPlay = (type_id, video_type, video_id, upcoming_type) => {
        setTypeId(type_id);
        setVideoType(video_type);
        setVideoId(video_id);
        setUpcomingType(upcoming_type);
        navigate('/videos');
    };

    return (
        <>
            {/* <div className="ott-container">
                {error ? (
                    <p>Error: {error}</p>
                ) : sections.length > 0 ? (
                    sections.map(section => (
                        <div key={section.id}>
                            <h1>{section.title}</h1>
                            <Carousel
                                showArrows={false}
                                showThumbs={false}
                                emulateTouch={true}
                                showIndicators={false}
                                swipeable={true}
                                infiniteLoop={true}
                            >
                                {section.data.map(video => (
                                    <div key={video.id} className="video" onClick={() => onPlay(section.type_id, video.video_type, video.id, section.upcoming_type)}>
                                        <img
                                            src={video.landscape}
                                            alt='videos'
                                        />
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div> */}
            <div>
            {error && <p>{error}</p>}
            <Videos sections={sections}/>
        </div>
        </>
    );
};

export default TradingNow;
