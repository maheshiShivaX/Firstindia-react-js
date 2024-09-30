import React, { useState, useEffect } from "react";
import { BsFillShieldLockFill } from "react-icons/bs";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import OtpInput from "react-otp-input";
import axios from 'axios';
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import '../home.css';
const baseSmsUrl = process.env.REACT_APP_SMS_KEY;
const baseUrl = process.env.REACT_APP_BASE_URL;
const loginApiUrl = "https://ishivaxservices.com/admin_panel/public/api/login";

const Login = () => {
    const [otp, setOtp] = useState("");
    const [ph, setPh] = useState("");
    const [userData, setUserData] = useState("");
    const [showOtp, setShowOtp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [sections, setSections] = useState([]);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(false);
    const [generatedOtp, setGeneratedOtp] = useState('')
    const [getUserProfile, setUserGetProfile] = useState([]);
    const navigate = useNavigate();
    const userId = localStorage.getItem('userid');
    const [pUserIdModel, setPUserIdModel] = useState({
        id: userId
    });

    const validatePhoneNumber = (phone) => {
        const isValid = /^\d{10}$/.test(phone) && parseInt(phone[0], 10) >= 6;
        return isValid;
    };

    const sendOtp = async () => {
        if (!validatePhoneNumber(ph)) {
            toast.error("Please Enter Valid Mobile Number");
            return;
        }
        setLoading(true);

        const apiUrl = `https://ecommandar.com/smsapi/api/SentOtp/fiss`;
        try {
            const response = await axios.post(apiUrl, {
                mobileNo: `+91${ph}`
            }, { timeout: 50000 });
            // console.log(response, 'responsefirstindia')

            if (response.status === 200) {
                if (response.data.isSuccess === 1) {
                    toast.success("OTP Sent Successfully");
                    setShowOtp(true);
                    // setGeneratedOtp(response.data.data.otp);
                    setLoading(false);
                } else {
                    toast.error("OTP send failed");
                }
            }

        } catch (error) {
            console.error('Error:', error.message);
            setLoading(false);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
            } else if (error.request) {
                console.error('Request made but no response received:', error.request);
            } else {
                console.error('Error setting up the request:', error.message);
            }
            toast.error("Failed to send OTP");
        }
    };

    // const verifyOtp = () => {
    //     if (otp === generatedOtp) {
    //         toast.success("OTP Verified Successfully");
    //         localStorage.setItem('user', 'true');
    //         setUser(true);
    //         navigate("/ott");
    //     } else {
    //         toast.error("Please enter the correct OTP.");
    //     }
    // };

    const verifyOtp = async () => {
        if (!otp) {
            toast.error("Please enter the OTP");
            return;
        }

        setLoading(true);

        const apiUrl = `https://ecommandar.com/smsapi/api/SentOtp/VerifyOTP`;

        try {
            const response = await axios.post(apiUrl, {
                mobileNo: `+91${ph}`,
                OTP: otp,
            });
            if (response.status == 200) {
                if (response.data.isSuccess === 1) {
                    login();
                } else {
                    toast.error("OTP Verification failed");
                }
            }

        } catch (error) {
            toast.error("Failed to Verify OTP");
        } finally {
            setLoading(false);
        }

    }

    const login = async () => {
        if (ph.trim() === "") {
            toast.error('Please enter mobile number');
            return;
        }

        const mobileNo = `+91${ph}`;

        try {
            setLoading(true);
            const response = await axios.post(loginApiUrl, {
                type: 3,
                mobile: mobileNo
            });

            // console.log(response,'responsesdsdsddss')

            localStorage.setItem("userid", response.data.result[0].id);
            localStorage.setItem("mobile", response.data.result[0].mobile);
            setLoading(false);
            if (response.status === 200) {
                toast.success("Login Successful");
                localStorage.setItem('user', 'true');
                setUser(true);
                if (response.data.result.length > 0) {
                    try {
                        const responses = await axios.post(`${baseUrl}get_profile`, { id: response.data.result[0].id });
                        if (responses.status === 200) {
                            if (responses.data.result[0].is_buy === 1) {
                                // navigate("/ott");
                                // localStorage.clear();
                            }
                            else {
                                navigate("/subscribtion");
                            }
                        } else {
                            setError("Failed to fetch sections");
                        }
                    } catch (error) {
                        setError("Failed to fetch sections. Please try again later.");
                    }
                }
            } else {
                toast.error("Failed to login");
            }
        } catch (error) {
            setLoading(false);
            console.error('Error:', error.message);
            toast.error("Failed to login");
        }
    };

    const onReset = () => {
        setShowOtp(false);
        setPh("");
    }

    return (
        <div className='mt-md-4 mt-1 mx-sm-0 mx-2'>
            <Toaster toastOptions={{ duration: 4000 }} />
            {!user ? (
                <div className="d-flex justify-content-center">
                    <div className="signuppage text-white p-lg-5 p-4 col-lg-7 col-md-8 col-11" >
                        {showOtp ? (
                            <div className="optvarificationcontent">
                                <span className="d-flex justify-content-center">
                                    <BsFillShieldLockFill size={40} />
                                </span>
                                <h6 className="text-center mt-3">Enter Your OTP </h6>
                                <OtpInput
                                    className="otpinput justify-content-center"
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={6}
                                    renderSeparator={<span>-</span>}
                                    renderInput={(props) => <input {...props} />}
                                />
                                <div className="d-flex justify-content-center">
                                    <button
                                        className="verifybtn mt-3 w-100 "
                                        onClick={verifyOtp}
                                    >
                                        {loading && (
                                            <span
                                                className="spinner-border spinner-border-sm"
                                                style={{ marginRight: "10px" }}
                                            ></span>
                                        )}
                                        <span> Verify OTP</span>
                                    </button>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <a
                                        className=" mt-3 w-100 "
                                        onClick={() => onReset()}
                                    >
                                        {loading && (
                                            <span
                                                className="spinner-border spinner-border-sm"
                                                style={{ marginRight: "10px" }}
                                            ></span>
                                        )}
                                        <span>Reset</span>
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <div className="loginform">
                                {/* <PhoneInput
                                    country="in"
                                    value={ph}
                                    onChange={setPh}
                                    disableDropdown={true} 
                                /> */}
                                <div className="input-group mobileinput">
                                    <span className="input-group-text" style={{ background: 'transparent', color: '#ffffff90' }}>+91</span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={ph}
                                        onChange={(e) => setPh(e.target.value)}
                                        placeholder="Enter mobile number"
                                        maxLength={10}
                                    />
                                </div>
                                <div className="">
                                    <button
                                        className="get-start-btn mt-3 w-100 "
                                        onClick={sendOtp}
                                    >
                                        {loading && (
                                            <span
                                                className="spinner-border spinner-border-sm"
                                                style={{ marginRight: "10px" }}
                                            ></span>
                                        )}
                                        <span>Send OTP Via SMS</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className=" row position-absolute  text-white p-5">
                    <p style={{ marginTop: "70%" }}>Login Successfully</p>
                </div>
            )}
        </div>
    );
};

export default Login;
