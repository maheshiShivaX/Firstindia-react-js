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
                    user_id: userId,
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

    const onCityChange = (e) => {
        const cityId = e.target.value;
        const city = auditionCity.find(city => city.city_name === cityId);
        setSelectedCity(city);
        navigate(`/vote/${cityId}`)
    };

    return (
        <Layout>
            <div className="topten-main container-fluid">
                <div className='top-tenvote'>
                    <div className='head-section text-center'>
                        <div className="topbtn">
                            <button>TOP 10</button>
                        </div>
                        <div className='py-4'>
                            <h1 className='text-uppercase mb-md-0 mb-sm-4 mb-3'>Super Singer+ Rajasthan Voting</h1>
                        </div>
                        <div className="headdesc d-md-flex justify-content-center">
                            <span className="">Support Your Favorite Contestant!</span> <span className="desktopcontent">Every Vote
                                Counts!</span>
                        </div>
                        <div className="headdesc d-flex justify-content-center">
                            <p className="mobilecontent">Every Vote Counts!</p>
                        </div>
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
                        <div className="congratulationdata my-5">
                            <div className="containsection text-white">
                                <div className="wildcardtext">
                                    <h4 className="my-sm-3 my-2 py-1">Your vote holds immense value!</h4>
                                </div>
                                <p>Cast it now and stand a chance to seize countless rewards!</p>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-md-start justify-content-center city-search">
                        <form className="form-group selectionform w-100">
                            <label for="mobile">City</label>
                            <div className="input-group-prepend citydropdown ">
                                <select name="city" className="city w-100" onChange={onCityChange} value={selectedCity}>
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
                <div className="conditatedata py-md-3 py-5">
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
                            <tbody>
                                {error ? (
                                    <p>Error: {error}</p>
                                ) : candidateData !== null ? (
                                    candidateData.length > 0 ? (
                                        candidateData.map((item, index) => (
                                            <React.Fragment key={index}>
                                                <tr>
                                                    <td className='paddingt-left padding-top-bottom'>{index + 1}</td>
                                                    <td className='padding-top-bottom'>
                                                        <div className='candidate d-flex align-items-center'>
                                                        <img src={item.photo_url || 'images/defaultimg.png'} alt='' />
                                                            <h4>{item.first_name} {item.last_name}</h4>
                                                        </div>
                                                    </td>
                                                    <td className='padding-top-bottom address'>{item.city_name}, {item.state_name}, {item.country_name}</td>
                                                    <td className='padding-right padding-top-bottom'>{item.votes}</td>
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
                        </table>
                    </div>
                </div>
            </div >
        </Layout >
    );
};

export default TopTenVote;