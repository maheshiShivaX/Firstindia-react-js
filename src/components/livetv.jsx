import React, { useEffect, useState } from 'react';
import Layout from './layout/layout';
import ReactHlsPlayer from 'react-hls-player';
import ReactPlayer from 'react-player'

const Live = ({ sections }) => {
    const [livetv, setLivetv] = useState('https://xlbor37ydvaj-hls-live.wmncdn.net/firstindianewstv1/live.stream/index.m3u8');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    return (
        <Layout>
            <div className="live-videos d-flex justify-content-center">
                <div className='tv-box'>
                    <div className='livevideo d-flex'>
                        <ReactPlayer
                            url='https://xlbor37ydvaj-hls-live.wmncdn.net/firstindianewstv1/live.stream/index.m3u8'
                            playing={true}
                            controls={true}
                            width="100%"
                            height="auto"
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Live;
