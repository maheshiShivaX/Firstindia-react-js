import React, { useEffect, useState } from 'react';
import Layout from '../layout/layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Countdown from './countdown';
import './topvotelist.css';
import { Toaster, toast } from "react-hot-toast";
const baseUrl = process.env.REACT_APP_BASE_URL;

const Topvotelist = () => {
    const [auditionCity, setAuditionCity] = useState([]);
    const [candidateData, setCandidateData] = useState([]);
    const [personData, setPersonData] = useState();
    const [filter, setFilter] = useState([])
    const [selectedCity, setSelectedCity] = useState(null);
    const [error, setError] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isVoteSuccess, setIsVoteSuccess] = useState(false);
    const [button, setButton] = useState(true);
    const [showHindi, setShowHindi] = useState(true);
    const userId = localStorage.getItem('userid');
    const { id } = useParams();
    const navigate = useNavigate();
    const [isShiproketPopupOpen, setIsShiproketPopupOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [ph, setPh] = useState('');
    const [otp, setOtp] = useState('');
    const [showOtpInput, setShowOtpInput] = useState(false);

    const handleOrderListClick = () => {
        setIsShiproketPopupOpen(true);
    };

    const closePopupotp = () => {
        localStorage.removeItem('applicationId')
        setIsShiproketPopupOpen(false);
    };

    const [pUserIdModel, setPUserIdModel] = useState({
        id: userId
    });

    const [getUserProfile, setUserGetProfile] = useState([]);

    useEffect(() => {
        const getProfile = async () => {
            try {
                const response = await axios.post(`${baseUrl}get_profile`, { id: userId });
                // console.log(response.data.result, "response.data.result1")
                if (response.data.result != null) {
                    setUserGetProfile(response.data.result[0]);
                    // console.log(response,'responseresponseresponseresponseresponseresponse')
                }

            } catch (error) {
                setError("Failed to fetch sections. Please try again later.dgdsgsggerge");
            }
        };
        getProfile();
    }, [userId]);


    // const validatePhoneNumber = (phone) => {
    //     const isValid = /^\d{13}$/.test(phone) && parseInt(phone[0], 13);
    //     return isValid;
    // };

    const sendOtp = async (applicationId) => {
        if (!userId) {
            alert("Please Login First For Vote");
            navigate('/');
            return;
        }

      if(userId && candidateData != null){
        const filterVote = candidateData.filter(x => x.already_voted == true)
        if(filterVote !=null && filterVote.length >0) {
            alert('You have already Voted for Supersinger Plus Rajasthan');
            return ;
        }
      }

        localStorage.setItem('applicationId', applicationId);
        setLoading(true);

        const apiUrl = `https://ecommandar.com/smsapi/api/SentOtp/fiss`;
        try {
            const response = await axios.post(apiUrl, {
                mobileNo: getUserProfile.mobile
            }, { timeout: 50000 });

            if (response.status === 200) {
                if (response.data.isSuccess === 1) {
                    toast.success("OTP Sent Successfully");
                    setIsShiproketPopupOpen(true);
                    setLoading(false);
                } else {
                    toast.error("OTP send failed");
                }
            }

        } catch (error) {
            // console.error('Error:', error.message);
            setLoading(false);
            if (error.response) {
                console.error('Response data:');
                console.error('Response status:');
            } else if (error.request) {
                console.error('Request made but no response received:');
            } else {
                console.error('Error setting up the request:');
            }
            toast.error("Failed to send OTP");
        }
    };

    const verifyOtp = async () => {
        if (!otp) {
            toast.error("Please enter the OTP");
            return;
        }

        setLoading(true);

        const apiUrl = `https://ecommandar.com/smsapi/api/SentOtp/VerifyOTP`;

        try {
            const response = await axios.post(apiUrl, {
                mobileNo: getUserProfile.mobile,
                OTP: otp,
            });

            if (response.status == 200) {
                if (response.data.isSuccess === 1) {
                    setIsShiproketPopupOpen(false)
                    const applicationId = localStorage.getItem('applicationId');
                    if (window.confirm("Are you sure you want to vote for this participant?")) {
                        if (userId != null && applicationId != null) {
                            let personDatas = candidateData.filter(city => city.id == applicationId);
                            setPersonData(personDatas[0])
                            try {
                                if (userId != null && applicationId != null) {
                                    const response = await axios.post(`${baseUrl}get_profile`, pUserIdModel);
                                    if (response.data.status === 200) {
                                        try {
                                            if (response.data.result[0].is_buy === 1) {
                                                const responseVotion = await axios.post(`${baseUrl}audition_application_voting`, {
                                                    voter_id: userId,
                                                    application_id: applicationId ? applicationId : '0',
                                                    voting_type: 'prizemoney'
                                                })
                                                if (responseVotion.data.status === 200) {
                                                    setIsVoteSuccess(true);
                                                    fetchSections();
                                                    setButton(true);
                                                } else {
                                                    alert('You have already voted for maximum applicants!');
                                                }
                                            } else {
                                                localStorage.setItem('forvote', 'Y');
                                                alert('Subscribe now to First India Plus for Voting!');
                                            }
                                        } catch {
                                            console.error('Error fetching profile:', error);
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
                        localStorage.removeItem('applicationId')
                    }
                } else {
                    toast.error("OTP Verification failed");
                    // setIsShiproketPopupOpen(false)

                }
            }

        } catch (error) {
            toast.error("Failed to Verify OTP");
            setIsShiproketPopupOpen(false)
        } finally {
            setLoading(false);
            localStorage.removeItem('applicationId')
            setOtp('');
        }

    }


    useEffect(() => {
        const fetchSectionscurrent = async () => {
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

        fetchSectionscurrent();
    }, []);

    const fetchSections = async () => {
        try {
            const response = await axios.post(`${baseUrl}get_application_votings`, {
                offset: 0,
                limit: 10,
                season_id: 1,
                user_id: userId ? userId : '1000000000',
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

    useEffect(() => {
        fetchSections();
    }, [userId, id]);

    // useEffect(() => {
    //     const cities = () => {
    //         const cityId = candidateData.filter(city => city.audition_id == id);
    //         setSelectedCity(cityId);
    //     };
    //     if (candidateData.length > 0 && id) {
    //         cities();
    //     }
    // }, [candidateData, id]);


    const toggleLanguage = () => {
        // setShowHindi(!showHindi);
    };


    const onVoteSuccess = () => {
        setIsVoteSuccess(false)
        setButton(true)
    };

    return (
        <Layout>
            <div style={{ position: 'relative', zIndex: 999999 }}>
                <Toaster />
            </div>
            <div className="topten-main container-screen">
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
                    <div className="d-flex awardsection w-100 justify-content-between">
                        <div className="vector">
                            <img className="vector111" src="images/Vector111.png" alt="" />
                        </div>
                        {/* <div className="d-flex justify-content-center pricesection">
                            <div className="d-flex">
                                <img className="desktopprice col-12" src="images/desktopprice.png" alt="" />
                                <img className="mobileprice col-12" src="images/mobileprice.png" alt="" />
                            </div>
                        </div> */}
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
                                    {candidateData !== null ? (
                                        candidateData.length > 0 ? (
                                            candidateData.map((item, index) => (
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
                                                                        onClick={() => sendOtp(item.id)}
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

            {isShiproketPopupOpen && (
                <div className="shiproket_popup">
                    <div className="shiproket_popup_content">
                        <span className="close" onClick={closePopupotp}>&times;</span>
                        <form onSubmit={(e) => e.preventDefault()} className='mt-4'>
                            <div className="otp_input mt-2">
                                <input
                                    className=''
                                    type="text"
                                    name="otp"
                                    id="otp"
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    maxLength={6}
                                />
                            </div>
                            <button
                                type="button"
                                className="otp_btn mt-3 verify_otp_btn"
                                onClick={verifyOtp}
                                disabled={loading}
                            >
                                Verify OTP
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </Layout >
    );
};

export default Topvotelist;