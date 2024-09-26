import React, { useEffect, useState } from 'react';
import Layout from '../layout/layout';
import axios from 'axios';
import Countdown from './countdown';
import { useNavigate } from 'react-router-dom';
const baseUrl = process.env.REACT_APP_BASE_URL;

const TopTenVote = () => {
    const [auditionCity, setAuditionCity] = useState([]);
    const [candidateData, setCandidateData] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const userId = localStorage.getItem('userid');

    useEffect(() => {
        const fetchSections = async () => {
            try {
                const response = await axios.get(`${baseUrl}get_audition_list/current`);
                // console.log(response, "getaudition list")
                if (response.status === 200) {
                    setAuditionCity(response.data.result);
                } else {
                    setError("Failed to fetch sections");
                }
            } catch (error) {
                setError("Failed to fetch sections. Please try again later.");
            }
        };

        const fetchAuditionCities = async () => {
            try {
                const response = await axios.post(`${baseUrl}get_application_votings`, {
                    offset: 0,
                    limit: 10,
                    season_id: 1,
                    user_id: userId ? userId : '1000000000',
                    voting_type: "prizemoney"
                });
                // console.log(response, "voting list")
                if (response.status === 200) {
                    setCandidateData(response.data.result);
                } else {
                    setError("Failed to fetch sections");
                }
            } catch (error) {
                setError("Failed to fetch sections. Please try again later.");
            }
        };

        fetchAuditionCities();

        fetchSections();
    }, [userId]);

    // const onCityChange = (event) => {
    //     const cityId = event.target.value;
    //     setSelectedCityId(cityId);
    //     console.log(cityId,"cityid") 
    //     navigate(`/vote/${cityId}`)
    // };

    // const onCityChange = (event) => {
    //     const cityId = event.target.value;
    //     setSelectedCityId(cityId);
    //     navigate(`/vote/${cityId}`)
    // };

    const handleCityChange = (id) => {
        navigate(`/vote/${id.target.value}`);
    };

    return (
        <Layout>
            <div className="topten-main container-screen">
                <div className='top-tenvote'>
                    <div className='head-section text-center'>
                        <div className="topbtn">
                            <button>TOP 10</button>
                        </div>
                        <div className='mt-sm-4 mb-sm-4 mt-2 mb-0'>
                            <h1 className='text-uppercase mb-md-0 mb-sm-4 mb-3'>Super Singer+ Rajasthan Voting</h1>
                        </div>
                        <div className="headdesc d-sm-flex justify-content-center text-white">
                            <span className="">Support Your Favorite Contestant!</span> <p className="">Every Vote
                                Counts!</p>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <img className="vector1 icons1" src="images/Vector111.png" alt="" />
                        <img className="vector1 icons2" src="images/Vector222.png" alt="" />
                    </div>
                    <div className="d-flex awardsection w-100 justify-content-center">
                        <div className="vector">
                            <img className="vector111" src="images/Vector111.png" alt="" />
                        </div>
                        <div className="d-flex justify-content-center pricesection">
                            <div className="d-flex">
                                <img className="desktopprice col-12" src="images/desktopprice.png" alt="" />
                                <img className="mobileprice col-12" src="images/mobileprice.png" alt="" />
                            </div>
                        </div>
                        <div className="vector">
                            <img className="vector222" src="images/Vector222.png" alt="" />
                        </div>
                    </div>
                    <Countdown />
                    <div className="topcontain">
                        <div className="congratulationdata my-sm-5 my-4">
                            <div className="containsection text-white">
                                <div className="wildcardtext">
                                    <h4 className="my-sm-3 my-2 py-1">Your vote holds immense value!</h4>
                                </div>
                                <p>Cast it now and stand a chance to seize countless rewards!</p>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-md-start justify-content-center city-search ">
                        <form className="form-group selectionform w-100">
                            <label htmlFor="mobile">City</label>
                            <div className="input-group-prepend citydropdown ">
                                <select name="city" className="city w-100" onChange={(id)=>handleCityChange(id)}>
                                    <option value="+91">Please Select</option>
                                    {error ? (
                                        <p>Error: {error}</p>
                                    ) : auditionCity !== null ? (
                                        auditionCity.length > 0 ? (
                                            auditionCity.map((item, index) => (
                                                <option key={index} value={item.id}>{item.city_name}</option>
                                            ))
                                        ) : (
                                            <p>No banner available</p>
                                        )
                                    ) : (
                                        <p>Loading...</p>
                                    )}
                                </select>
                            </div>
                        </form>
                    </div>
                </div >
                <div className="conditatedata pt-md-3 pb-md-3 pt-4 pb-0">
                    <div className='datatable'>
                        <table className='text-white w-100'>
                            <thead className='table-head' style={{ paddingBottom: '10px' }}>
                                <tr>
                                    <th></th>
                                    <th>Candidate</th>
                                    <th>Address</th>
                                    <th>Total Vote</th>
                                </tr>
                            </thead>
                            {error ? (
                                <span>Error: {error}</span>
                            ) :
                                <tbody>
                                    {candidateData !== null ? (
                                        candidateData.length > 0 ? (
                                            candidateData.map((item, index) => (
                                                <React.Fragment key={index}>
                                                    <tr>
                                                        <td className='paddingt-left padding-top-bottom srnumber'>{index + 1}</td>
                                                        <td className='padding-top-bottom'>
                                                            <div className='candidate d-flex align-items-center'>
                                                                <img src={item.photo_url || 'images/defaultimg.png'} alt='' />
                                                                <h4>{item.first_name} {item.last_name}</h4>
                                                            </div>
                                                        </td>
                                                        <br className='break-point' />
                                                        <td className='padding-top-bottom address'>
                                                            <div>
                                                                <span className='card-heading'>Address</span>
                                                                <p className='mb-0'>{item.city_name}, {item.state_name}, {item.country_name}</p>
                                                            </div>
                                                        </td>
                                                        <br className='break-point' />
                                                        <td className='padding-right padding-top-bottom votecount'>
                                                            <div>
                                                                <span className='card-heading'>Total Vote</span>
                                                                <p className='mb-0'>{item.votes}</p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <div className='bottom-border'></div>
                                                </React.Fragment>
                                            ))
                                        ) : (
                                            <p>No banner available</p>
                                        )
                                    ) : (
                                        <p>Loading...</p>
                                    )}
                                </tbody>
                            }
                        </table>
                    </div>
                </div>
            </div >
        </Layout >
    );
};

export default TopTenVote;