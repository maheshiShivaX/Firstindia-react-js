import React, { useState, useEffect } from "react";
import { BsFillShieldLockFill } from "react-icons/bs";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import OtpInput from "react-otp-input";
import axios from 'axios';
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const baseSmsUrl = process.env.REACT_APP_SMS_KEY;
const loginApiUrl = "https://ishivaxservices.com/admin_panel/public/api/login";

const Login = () => {
    const [otp, setOtp] = useState("");
    const [ph, setPh] = useState("");
    const [userId, setUserId] = useState("");
    const [showOtp, setShowOtp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [sections, setSections] = useState([]);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(false);
    const [generatedOtp, setGeneratedOtp] = useState('')
    const navigate = useNavigate();

    const sendOtp = async () => {
        setLoading(true);

        const apiUrl = `https://ecommandar.com/smsapi/api/Supersinger/OTPSend?pMobileNo=${encodeURIComponent(ph)}`;
        try {
            const response = await axios.get(apiUrl, {
                timeout: 5000,
            });
            // console.log(response.data, "rgftgrghthgtyhty")

            setLoading(false);
            setShowOtp(true);
            setGeneratedOtp(response.data.data.otp);
            // login();
            toast.success("OTP Sent Successfully");
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

    const verifyOtp = () => {
        if (otp === generatedOtp) {
            toast.success("OTP Verified Successfully");
            login();
        } else {
            toast.error("Please enter the correct OTP.");
        }
    };

    const login = async () => {
        if (ph.trim() === "") {
            toast.error('Please enter mobile number');
            return;
        }

        const mobileNo = `+${ph}`;
        try {
            setLoading(true);
            const response = await axios.post(loginApiUrl, {
                type: 3,
                mobile: mobileNo
            });
            localStorage.setItem("userid", response.data.result[0].id);
            localStorage.setItem("mobile", response.data.result[0].mobile);
            setLoading(false);
            if (response.status === 200) {
                toast.success("Login Successful");
                localStorage.setItem('user', 'true');
                setUser(true);
                navigate("/ott");
            } else {
                toast.error("Failed to login");
            }
        } catch (error) {
            setLoading(false);
            console.error('Error:', error.message);
            toast.error("Failed to login");
        }
    };

    return (
        <div className='mt-4'>
            <Toaster toastOptions={{ duration: 4000 }} />
            {!user ? (
                <div className="d-flex justify-content-center">
                    <div className="signuppage text-white p-5 col-md-7">
                        {showOtp ? (
                            <div className="optvarificationcontent">
                                <span className="d-flex justify-content-center">
                                    <BsFillShieldLockFill size={40} />
                                </span>
                                <h6 className="text-center mt-3">Enter Your OTP </h6>
                                <OtpInput
                                    inputStyle={{
                                        width: "50px",
                                        height: "50px",
                                        fontSize: "20px",
                                        margin: "5px",
                                        borderRadius: "5px",
                                        border: "2px solid black",
                                    }}
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={6}
                                    renderSeparator={<span>-</span>}
                                    renderInput={(props) => <input {...props} />}
                                />
                                <div className="d-flex justify-content-center">
                                    <button
                                        className="btn btn-primary mt-3 w-100 "
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
                            </div>
                        ) : (
                            <div className="loginform">
                                <PhoneInput
                                    country={"in"}
                                    value={ph}
                                    onChange={setPh}
                                />
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
