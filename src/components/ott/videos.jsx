import React, { useEffect, useState, useRef } from 'react';
import Layout from '../layout/layout';
import axios from 'axios';
import ReactHlsPlayer from 'react-hls-player';
import ReactPlayer from 'react-player'
const baseUrl = process.env.REACT_APP_BASE_URL;

const Videos = ({ sections }) => {
    const videoRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [playerReady, setPlayerReady] = useState(true);
    const [showAd, setShowAd] = useState(false);
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [typeId, setTypeId] = useState(localStorage.getItem('type_id'));
    const [videoType, setVideoType] = useState(localStorage.getItem('video_type'));
    const [videoId, setVideoId] = useState(localStorage.getItem('video_id'));
    const [upcomingType, setUpcomingType] = useState(localStorage.getItem('upcoming_type'));
    const adUrl = [
        'https://www.youtube.com/watch?v=BLHATepF8fY',
        'https://www.youtube.com/watch?v=IVyy-VBU-Cc'
    ]

    // useEffect(() => {
    //     return () => {
    //         localStorage.removeItem('type_id');
    //         localStorage.removeItem('video_type');
    //         localStorage.removeItem('video_id');
    //         localStorage.removeItem('upcoming_type');
    //     };
    // }, []);

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const response = await axios.post(`${baseUrl}section_detail`, {
                    type_id: typeId,
                    video_type: videoType,
                    video_id: videoId,
                    upcoming_type: upcomingType,
                    user_id: ''
                });

                if (response.status === 200) {
                    if(response.data.status === 200){
                        setVideo(response.data);
                    }
                } else {
                    setError("Failed to fetch video");
                }
            } catch (error) {
                // console.error('Error', error);
                setError("Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchVideo();
    }, [sections]);

    function formatDuration(durationInMilliseconds) {
        let seconds = Math.floor(durationInMilliseconds / 1000);

        let minutes = Math.floor(seconds / 60);
        // seconds = seconds % 60;

        return `${minutes} min`;
        // return `${minutes} minutes ${seconds} seconds`;
    }

    useEffect(() => {
        let interval;
        let adInterval;

        if (videoRef.current && videoRef.current.getInternalPlayer()) {
            setPlayerReady(true);
            videoRef.current.seekTo(0);
            videoRef.current.getInternalPlayer();
        }

        interval = setInterval(() => {
            if (playerReady && videoRef.current) {
                setCurrentTime(videoRef.current.getCurrentTime());
            }
        }, 1000);

        adInterval = setInterval(() => {
            setShowAd(true);

            setTimeout(() => {
                setShowAd(false);
            }, 15000);
        }, 35000);

        return () => {
            clearInterval(adInterval);
            clearInterval(interval);
            if (videoRef.current && videoRef.current.getInternalPlayer()) {
                videoRef.current.getInternalPlayer();
            }
        };
    }, [videoRef.current, playerReady]);

    const handleSkip = () => {
        if (videoRef.current) {
            const newTime = currentTime + 60;
            videoRef.current.seekTo(newTime);
            setCurrentTime(newTime);
        }
    };

    return (
        <Layout>
            <div className="ott-videos container-screen">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : video.result ? (
                    <div className='videos d-md-flex'>
                        <div className='w-md-50 w-100'>
                            {/* <div className='add-player'>
                                {showAd && (
                                    <div className="advertisement-overlay">
                                        <ReactPlayer
                                            url={adUrl}
                                            playing={true}
                                            controls={true}
                                            width="100%"
                                            height="auto"
                                            config={{
                                                file: {
                                                    attributes: {
                                                        poster: video.result.landscape
                                                    }
                                                }
                                            }}
                                        />
                                    </div>
                                )}
                            </div> */}

                            {/* <div className={`video-player w-md-50 w-100 ${showAd ? 'hidden' : ''}`}> */}
                            <div className='video-player w-md-50 w-100'>
                                <ReactPlayer
                                    ref={videoRef}
                                    url={video.result.video_1080}
                                    // playing={!showAd}
                                    playing={true}
                                    controls={true}
                                    width="100%"
                                    height="auto"
                                    config={{
                                        file: {
                                            attributes: {
                                                poster: video.result.landscape
                                            }
                                        }
                                    }}
                                />
                                <div className='skip-btn'>
                                    <button onClick={handleSkip}>SKIP</button>
                                </div>
                            </div>
                        </div>
                        {/* <ReactHlsPlayer
                                ref={videoRef}
                                src={video.result.video_1080}
                                autoPlay={false}
                                controls={true}
                                width="100%"
                                height="auto"
                                poster={video.result.landscape}
                            /> */}
                        {/* <p className='text-white'>Current Time: {currentTime.toFixed(2)} seconds</p> */}
                        <div className='v-content w-md-50 w-100'>
                            <div className='v-title'>
                                <h2 className='mb-0'>{video.result.name}</h2>
                            </div>
                            <div className='v-duration-category d-flex'>
                                <div className='duration'>
                                    <span>Duration : </span>
                                    <span>{formatDuration(video.result.video_duration)}</span>
                                </div>
                                <div className='category'>
                                    <span>Category Name : </span>
                                    <span>{video.result.category_name}</span>
                                </div>
                            </div>
                            <div className='v-description'>
                                <p>{video.result.description}</p>
                            </div>
                            <div className='v-cast-section d-md-flex text-white justify-content-between'>
                                <div className='col-md-4'>
                                    <h6>Cast</h6>
                                    {video.cast.map((cast,i) => (
                                        <div key={i} className='mb-md-3 mb-2'>
                                            <span>{cast.name}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className='col-md-4 mt-md-0 mt-4'>
                                    <h6>Language</h6>
                                    {video.language.map((lang ,i)=> (
                                        <div key={i}>
                                            <span>{lang.name}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className='col-md-4 mt-md-0 mt-4'>
                                    <h6>More Detail</h6>
                                    {video.more_details.slice(0, 2).map((item,i) => (
                                        <div key={i} className='mb-md-3 mb-2'>
                                            <span>{item.title} : </span>
                                            <span>{item.description}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>No video available</p>
                )}
            </div>
        </Layout>
    );
};

export default Videos;
