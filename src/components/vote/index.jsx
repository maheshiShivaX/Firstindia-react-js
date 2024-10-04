import React, { useEffect, useState } from 'react';
import Layout from '../layout/layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const baseUrl = process.env.REACT_APP_BASE_URL;

const Vote = () => {
    const [auditionCity, setAuditionCity] = useState([]);
    const [candidateData, setCandidateData] = useState([]);
    const [personData, setPersonData] = useState();
    const [filter, setFilter] = useState([])
    const [selectedCity, setSelectedCity] = useState(null);
    const [error, setError] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(true);
    const [isVoteSuccess, setIsVoteSuccess] = useState(false);
    const [button, setButton] = useState(true);
    const [showHindi, setShowHindi] = useState(true);
    const userId = localStorage.getItem('userid');
    const { id } = useParams();
    const navigate = useNavigate();

    const [pUserIdModel, setPUserIdModel] = useState({
        id: userId
    });

    const onVoteModel = async (applicationId) => {
        if (window.confirm("Are you sure you want to vote for this participant?")) {
            if (userId != null && applicationId != null) {
                let personDatas = candidateData.filter(city => city.id == applicationId);
                setPersonData(personDatas[0])
                try {
                    if (userId != null && applicationId != null) {
                        const response = await axios.post(`${baseUrl}get_profile`, pUserIdModel);
                        if (response.status === 200) {
                            try {
                                if (response.data.result[0].is_buy === 1) {
                                    const responseVotion = await axios.post(`${baseUrl}audition_application_voting`, {
                                        voter_id: userId,
                                        application_id: applicationId ? applicationId : '0',
                                        voting_type: 'prizemoney'
                                    })
                                    if (responseVotion.data.status === 200) {
                                        // console.log('Voting successful:', responseVotion);
                                        setIsVoteSuccess(true);
                                        // getVotingList(userId);
                                        setButton(true)
                                    } else {
                                        alert('You have already voted for maximum applicants!');
                                    }
                                } else {
                                    localStorage.setItem('forvote', 'Y');
                                    alert('Subscribe now to First India Plus for Voting!');
                                }
                            } catch {
                                // console.error('Error fetching profile:', error);
                            }
                        }
                    }
                } catch (error) {
                    console.error('If You Want to Vote this Person Please Login Your Account');
                    navigate(`/`);
                }
            } else {
               alert('If You Want to Vote this Person Please Login Your Account');
               navigate(`/`);
            }
        } else {
           alert('User cancelled voting.');
        }
    };

    useEffect(() => {
        const fetchSections = async () => {
            try {
                const response = await axios.get(`${baseUrl}get_audition_list/current`);
                if (response.status === 200) {
                    setAuditionCity(response.data.result);
                } else {
                    setError("Failed to fetch sections");
                }
            } catch (error) {
                setError("Failed to fetch sections. Please try again later.");
            }
        };

        fetchSections();
    }, []);

    useEffect(() => {
        const fetchSections = async () => {
            try {
                const response = await axios.post(`${baseUrl}get_application_votings`, {
                    offset: 0,
                    limit: 11,
                    season_id: 1,
                    user_id: userId ? userId :'1000000000',
                    voting_type: "prizemoney",
                });
                if (response.status === 200) {
                    setCandidateData(response.data.result);
                    // console.log(response.data.result, "candidateData11")
                } else {
                    setError("Failed to fetch sections");
                }
            } catch (error) {
                setError("Failed to fetch sections. Please try again later.");
            }
        };

        fetchSections();

    }, [userId, id]);

    useEffect(() => {
        const cities = () => {
            const cityId = candidateData.filter(city => city.audition_id == id);
            setSelectedCity(cityId);
        };
        if (candidateData.length > 0 && id) {
            cities();
        }
    }, [candidateData, id]);

    const handleCityChange = (id) => {
        const city = candidateData.filter(city => city.audition_id == id.target.value);
        setSelectedCity(city);
        setFilter(city);
    };

    const toggleLanguage = () => {
        setShowHindi(!showHindi);
    };

    const onSearch = (searchedValue) => {
        const trimmedValue = searchedValue.trim().toUpperCase();

        const filteredRows = selectedCity.filter((item) => {
            const itemName = item.first_name.toString().toLowerCase();
            return itemName.includes(trimmedValue);
        });

        if (searchedValue.length < 1) {
            setFilter(selectedCity);
        } else {
            setFilter(filteredRows);
        }
    };

    const onVoteSuccess = () => {
        setIsVoteSuccess(false)
        setButton(true)
    };

    return (
        <Layout>
            <div className="topten-main container-screen">
                <Link to="/public/topvotelist">
                    <div>
                        <svg id="Layer_2" height="25" viewBox="0 0 512 512" width="25" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" data-name="Layer 2" version="1.1" xmlnssvgjs="http://svgjs.dev/svgjs">
                            <g transform="matrix(1,0,0,1,0,0)">
                                <g id="Icon">
                                    <g id="_136" data-name="136">
                                        <rect id="Background" fill="url(#linear-gradient)" height="512" rx="150" transform="matrix(0 1 -1 0 512 0)" width="512" stroke="none" />
                                        <g fill="#fff">
                                            <path d="m268.78 338.53-82.53-82.53 82.53-82.53c9.76-9.76 9.76-25.59 0-35.36-9.76-9.76-25.59-9.76-35.36 0l-100.21 100.21c-9.76 9.76-9.76 25.59 0 35.36l100.21 100.21c9.76 9.76 25.59 9.76 35.36 0 9.76-9.76 9.76-25.59 0-35.36z" fill="#ffffffff" stroke="none" />
                                            <path d="m343.43 373.89-100.21-100.21c-9.76-9.76-9.76-25.59 0-35.36l100.21-100.21c9.76-9.76 25.59-9.76 35.36 0 9.76 9.76 9.76 25.59 0 35.36l-82.53 82.53 82.53 82.53c9.76 9.76 9.76 25.59 0 35.36-9.76 9.76-25.59 9.76-35.36 0z" fill="#ffffffff" stroke="none" />
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </svg>
                        <span className='text-white' style={{ textDecoration: "none" }}>back</span>
                    </div>
                </Link>
                <div className='top-tenvote'>
                    <div className='head-section text-center'>
                        <div className='mt-sm-4 mb-sm-4 mt-2 mb-0'>
                            <h1 className='text-uppercase mb-md-0 mb-sm-4 mb-3'>Super Singer+ Rajasthan Voting</h1>
                        </div>
                        <div className="headdesc d-sm-flex justify-content-center text-white align-items-center">
                            <span className="">Support Your Favorite Contestant!</span> <p className="mb-0">Every Vote
                                Counts!</p>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <img className="icons1" src="/images/Vector111.png" alt="" />
                        <img className="icons2" src="/images/Vector222.png" alt="" />
                    </div>
                    <div className='d-sm-flex justify-content-between align-items-end py-4'>
                        <div className="d-flex justify-content-md-start justify-content-center city-search">
                            <form className="form-group selectionform w-100">
                                <label htmlFor="mobile" className='text-white'>City</label>
                                <div className="input-group-prepend citydropdown ">
                                    <select name="city" className="city w-100" onChange={(id) => handleCityChange(id)}>
                                        <option value="+91">Please Select</option>
                                        {error ? (
                                            <p>Error: {error}</p>
                                        ) : auditionCity !== null ? (
                                            auditionCity.length > 0 ? (
                                                auditionCity.map((item) => (
                                                    <option key={item.id} value={item.id}>{item.city_name}</option>
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
                        {/* <div className='search mt-sm-0 mt-4'>
                            <form className="form-group selectionform w-100">
                                <div className='search-input w-100'>
                                    <input className='w-100 px-2' type='text' placeholder='Search...' input={onSearch} />
                                </div>
                            </form>
                        </div> */}
                    </div>
                </div>
                <div className="conditatedata pt-md-3 pb-md-3 pt-4 pb-0">
                    <div className='datatable' >
                        <table className='text-white w-100' >
                            <thead className='table-head' style={{ paddingBottom: '10px' }}>
                                <tr>
                                    <th></th>
                                    <th>Candidate</th>
                                    <th>Address</th>
                                    <th>Total Vote</th>
                                    {/* <th></th> */}
                                </tr>
                            </thead>
                            {error ? (
                                <span>Error: {error}</span>
                            ) :
                                <tbody>
                                    {selectedCity !== null ? (
                                        selectedCity.length > 0 ? (
                                            selectedCity.map((item, index) => (
                                                <React.Fragment key={item.id}>
                                                    <tr>
                                                        <td className={`srnumber ${index == 0 ? "first-item" : index == 1 ? "second-item" : index == 2 ? "third-item" : "paddingt-left padding-top-bottom "} `} >{index + 1}</td>
                                                        <td className='padding-top-bottom'>
                                                            <div className='candidate d-flex align-items-center'>
                                                                <img src={item.photo_url || `/images/defaultimg.png`} alt='' />
                                                                <h4>{item.first_name} {item.last_name}</h4>
                                                            </div>
                                                        </td>
                                                        <br className='break-point' />
                                                        <td className='padding-top-bottom address'>
                                                            <div className='card-section'>
                                                                <span className='card-heading'>Address</span>
                                                                <p className='mb-0'>{item.city_name}, {item.state_name}, {item.country_name}</p>
                                                            </div>
                                                        </td>
                                                        <br className='break-point' />
                                                        <td className='padding-right padding-top-bottom votecount padding-right-votebtn'>
                                                            <div className='d-flex justify-content-between align-items-center vote-cobtn card-section'>
                                                                <div>
                                                                    <span className='card-heading'>Total Vote</span>
                                                                    <p className='mb-0'>{item.votes}</p>
                                                                </div>
                                                                <div className='votebtn'>
                                                                    <button
                                                                        onClick={() => onVoteModel(item.id)}
                                                                        className={item.already_voted ? "buttonTrue" : "buttonFalse"}
                                                                        disabled={item.already_voted}
                                                                    >VOTE</button>
                                                                </div>
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

            <div id="termpopupContainer" className={`termspopup-container popup ${isPopupOpen ? 'open' : ''}`}>
                <div className="termsandcondition">
                    <div className="termsandcon d-flex gap-2 align-items-center justify-content-center pb-2">
                        <h3 className="m-0">Terms & Conditions</h3>
                        <div className="d-flex optionbutton m-0">
                            <button className={showHindi ? "active" : ""} onClick={toggleLanguage}>अ</button>/
                            <button className={!showHindi ? "active" : ""} onClick={toggleLanguage}>A</button>
                        </div>
                    </div>
                    <div className="scrollable-content scroll-text">
                        {showHindi ?
                            <div className="optioninput pt-2">
                                <div className="input-group mobilenumber fieldheight d-flex align-items-center mx-0 w-100">
                                    <ul className="p-0 ml-3">
                                        <h6>सुपर सिंगर प्लस राजस्थान के प्रतिभागी ध्यान दें!</h6>
                                        <li className="mb-1 contant">सुपरसिंगर प्लस राजस्थान के प्रतिभागियों (सभी, जिनमें मेगा ऑडिशन के लिए चुने गए 49 प्रतिभागी भी शामिल हैं) से निवेदन है कि आप अपना उत्साह बनाए रखें! अब द्वितीय चरण की वोटिंग में प्रयास करके अपने पक्ष में सर्वाधिक वोट प्राप्त कर लाखों के पुरस्कार भी जीत सकते हैं। </li>
                                        <li className="mb-1 contant">*पहला इनाम - आईफ़ोन 15</li>
                                        <li className="mb-1 contant">*दूसरा इनाम - लैपटॉप </li>
                                        <li className="mb-1 contant">*तीसरा इनाम- आमेजन इको शो 5 </li><br />
                                        <h6>मतदान प्रक्रिया:</h6>
                                        <li className="mb-1"> वोटर को प्ले स्टोर/ऐप स्टोर से हमारा ओटीटी ऐप, फर्स्ट इंडिया प्लस डाउनलोड करना होगा।</li>
                                        <li className="mb-1"> उपयोगकर्ता 31 अगस्त 2024 तक बिना भुगतान किए ओटीटी ऐप की सदस्यता ले सकते है उसके उपरांत 1 रुपए की मामूली फ़ीस का भुगतान करना होगा। </li>
                                        <li className="mb-1"> *ओटीटी ऐप के होम पेज पर सुपर सिंगर टैब पर क्लिक करें।</li>
                                        <li className="mb-1">*वोट नाउ के टैब पर क्लिक करे </li>
                                        <li className="mb-1"> *प्रतिभागी का शहर/नाम खोजें।</li>
                                        <li className="mb-1">*विशेष प्रतियोगी के लिए वोट डालें।</li><br />

                                        <h6>टिप्पणी</h6>
                                        <li className="mb-1">- जो प्रतिभागी सर्वाधिक वोट प्राप्त करेंगे इनमें से शीर्ष 3 प्रतिभागियों को उपरोक्त दिये गये विशेष पुरस्कारों से सम्मानित किया जाएगा।</li>
                                        <li className="mb-1">- पुरस्कार के लिए योग्य होने के लिए प्रतियोगियों को कम से कम 1500 वोट प्राप्त करने होंगे।</li>
                                        <li className="mb-1">-  निष्पक्षता सुनिश्चित करने के लिए, कृपया ध्यान दें कि एक व्यक्ति केवल एक वोट अर्थात् एक मोबाइल फ़ोन से केवल एक वोट ही दिया जा सकता है।</li>

                                        <li className="mb-1 contant">
                                            वोटिंग लाइनें 20, जून 2024 से 30 सितंबर तक जारी रहेंगी।<br />
                                            तो जल्दी करें और लाखों के इनाम सुरक्षित करें!</li>
                                    </ul>
                                </div>
                            </div>
                            :
                            <div className="optioninput pt-2">
                                <div className="input-group mx-0 w-100">
                                    <ul className="p-0 ml-3">
                                        <h6>Attention all participants of Super Singer Plus Rajasthan!</h6>
                                        <li className="mb-1 contant">All participants of SuperSinger Plus Rajasthan, (All, including the 49 participants who were selected for the mega auditions) keep your spirits high!
                                            Now, by participating in the Second Phase of voting, you can strive to gather the most votes and even win prizes worth lakhs.</li>
                                        <br />
                                        <li className="mb-1 contant">*First Prize - iPhone 15</li>
                                        <li className="mb-1 contant">*Second Prize - Laptop</li>
                                        <li className="mb-1 contant">*Third Prize - Amazon Echo Show 5</li>
                                        <br />
                                        <h6>Voting Process:</h6>
                                        <li className="mb-1">Voters need to download our OTT app, First India Plus, from the Play Store/App Store.</li>
                                        <li className="mb-1">Users can subscribe to the OTT app for Free until June 30, 2024, and thereafter pay a nominal fee of ₹1.</li>
                                        <li className="mb-1">- Click on the Super Singer tab on the home page of the OTT app. </li>
                                        <li className="mb-1">- Navigate to the Vote Now tab.</li>
                                        <li className="mb-1">- Search for the contestants city/name.</li>
                                        <li className="mb-1">- Cast your vote for the specific contestant.</li><br />

                                        <h6>Note:</h6>
                                        <li className="mb-1">- The top 3 contestants with the highest votes will be honored with the above-mentioned special prizes.</li>
                                        <li className="mb-1">- To be eligible for the prizes, contestants must receive a minimum of 1500 votes.</li>
                                        <li className="mb-1">- To ensure fairness, please note that each person can only vote once, meaning only one vote per mobile phone.</li>

                                        <li className="mb-1 contant">
                                            Voting lines will be open from June 20, 2024, to September 30, 2024.<br />
                                            So hurry up and secure prizes worth lakhs!</li>
                                    </ul>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className="closebtn">
                    <button className="" onClick={() => setIsPopupOpen(false)}>I Agree</button>
                </div>
            </div>

            {personData != null ?
                <div id="termpopupContainer" className={`termspopup-container successpopup-container successpopup ${isVoteSuccess ? 'open' : ''}`}>
                    <div className="termsandcondition">
                        <div className="gif">
                            <img src="/images/gif.gif" />
                        </div>
                        <h3 className="note">Vote Successful!</h3>
                        <div className="profile-detail d-flex align-items-center justify-content-center pt-2">
                            <img src={personData.photo_url || `/images/defaultimg.png`} alt="Descriptive text" />
                            <div>
                                <label className="mb-1">Candidate Name</label>
                                <h4>{personData.first_name} {personData.last_name}</h4>
                            </div>
                        </div>
                    </div>
                    <div className="closebtn pt-2">
                        <button className="" onClick={onVoteSuccess}>Close</button>
                    </div>
                </div> :
                ""
            }
        </Layout >
    );
};

export default Vote;