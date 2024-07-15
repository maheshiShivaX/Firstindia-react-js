import React, { useEffect, useState, useRef } from 'react';
import Layout from '../layout/layout';
import axios from 'axios';
import ReactHlsPlayer from 'react-hls-player';
const baseUrl = process.env.REACT_APP_BASE_URL;

const Videos = ({ sections }) => {
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [typeId, setTypeId] = useState(localStorage.getItem('type_id'));
    const [videoType, setVideoType] = useState(localStorage.getItem('video_type'));
    const [videoId, setVideoId] = useState(localStorage.getItem('video_id'));
    const [upcomingType, setUpcomingType] = useState(localStorage.getItem('upcoming_type'));

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
                    setVideo(response.data.result);
                    console.log("Fetched data successfully:", response.data);
                } else {
                    setError("Failed to fetch video");
                }
            } catch (error) {
                console.error('Error', error);
                setError("Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchVideo();
    }, [sections]);

    return (
        <Layout>
            <div className="ott-videos container-screen">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : video ? (
                    <div className='videos d-sm-flex'>
                        <div className="video-player w-sm-50">
                            <div>
                                <button className="skip-button">
                                    <svg
                                        version="1.1"
                                        id="Capa_1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                        x="0px"
                                        y="0px"
                                        width="30px"
                                        height="30px"
                                        viewBox="0 0 45.974 45.975"
                                        style={{ enableBackground: 'new 0 0 45.974 45.975' }}
                                        xmlSpace="preserve"
                                    >
                                        <g transform="matrix(1,0,0,1,0,0)">
                                            <g>
                                                <g>
                                                    <path
                                                        d="M9.629,44.68c-1.154,1.16-2.895,1.51-4.407,0.885c-1.513-0.623-2.5-2.1-2.5-3.735V4.043c0-1.637,0.987-3.112,2.5-3.736 c1.513-0.625,3.253-0.275,4.407,0.885l17.862,17.951c2.088,2.098,2.088,5.488,0,7.585L9.629,44.68z"
                                                        fill="#000000"
                                                        data-original-color="#000000ff"
                                                        stroke="none"
                                                    />
                                                </g>
                                                <g>
                                                    <g>
                                                        <path
                                                            d="M38.252,45.975c-2.763,0-5-2.238-5-5V5c0-2.762,2.237-5,5-5c2.762,0,5,2.238,5,5v35.975 C43.252,43.736,41.013,45.975,38.252,45.975z"
                                                            fill="#000000"
                                                            data-original-color="#000000ff"
                                                            stroke="none"
                                                        />
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </button>
                            </div>
                            <ReactHlsPlayer
                                src={video.video_1080}
                                autoPlay={true}
                                controls={true}
                                width="100%"
                                height="auto"
                                poster={video.landscape}
                            />
                        </div>
                        <div className='v-content w-sm-50'>
                            <div className='v-title'>
                                <h2 className='mb-0'>{video.name}</h2>
                            </div>
                            <div className='v-duration-category d-flex'>
                                <div className='duration'>
                                    <span>Duration : </span>
                                    <span>{video.video_duration}</span>
                                </div>
                                <div className='category'>
                                    <span>Category Name : </span>
                                    <span>{video.category_name}</span>
                                </div>
                            </div>
                            <div className='v-description'>
                                <p>{video.description}</p>
                            </div>
                            <div className='v-cast-section d-flex text-white justify-content-between'>
                                <div>
                                    <h6>Cast</h6>
                                    <span>{ }</span>
                                </div>
                                <div>
                                    <h6>Language</h6>
                                    <span>{ }</span>
                                </div>
                                <div>

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
