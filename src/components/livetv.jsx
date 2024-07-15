import React, { useEffect, useState } from 'react';
import Layout from './layout/layout';
import ReactHlsPlayer from 'react-hls-player';

const Live = ({ sections }) => {
    const [livetv, setLivetv] = useState('https://xlbor37ydvaj-hls-live.wmncdn.net/firstindianewstv1/live.stream/index.m3u8');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    return (
        <Layout>
            <div className="live-videos">
                <div className='tv-box'>
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : livetv ? (
                        <div className='livevideo d-flex'>
                            <ReactHlsPlayer
                                src={livetv}
                                autoPlay={true}
                                controls={true}
                                width="100%"
                                height="auto"
                            // poster={video.landscape}
                            />
                        </div>
                    ) : (
                        <p>No video available</p>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Live;
