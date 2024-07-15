import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import OtpInput from 'react-otp-input';

// Import environment configuration (simulating Angular-like setup)
import { environment } from '../config'; // Adjust path as per your project structure

const SendOtp = () => {
    const [phoneNo, setPhoneNo] = useState('');
    const [otp, setOtp] = useState('');
    const [enteredOtp, setEnteredOtp] = useState('');
    const [verified, setVerified] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        generateOtp();
    }, []);

    const generateOtp = () => {
        const secret = "TPQDAHVBZ5NBO5LFEQKC7V7UPATSSMFY";
        const options = {
            algorithm: "sha256",
            digits: 6,
            period: 30
        };

        // Simulating OTP generation
        const otp = idGenerator("REACTOTP");
        setOtp(otp);
        console.log('Generated OTP:', otp);
    };

    const handleChange = (event) => {
        setPhoneNo(event.target.value);
    };

    const handleOtpChange = (otp) => {
        setEnteredOtp(otp);
    };

    const sendOtpHandler = () => {
        if (!phoneNo) {
            toast.error('Please enter a valid phone number');
            return;
        }

        setLoading(true);

        // Construct API URL using environment configuration
        const apiUrl = `${environment.smskey}&numbers=91${phoneNo}&message=Your OTP is ${otp}`;

        axios.get(apiUrl)
            .then((response) => {
                console.log(response.data);
                setLoading(false);
                toast.success('OTP Sent Successfully');
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
                toast.error('Failed to send OTP');
            });
    };

    const verifyOtpHandler = () => {
        if (enteredOtp === otp) {
            setVerified(true);
            toast.success('OTP Verified Successfully');
        } else {
            setVerified(false);
            toast.error('Invalid OTP');
        }
    };

    return (
        <div style={{ margin: 250 }}>
            <input
                type="text"
                placeholder="Phone Number"
                value={phoneNo}
                onChange={handleChange}
            />

            <button style={{ margin: 10, marginTop: 25 }} onClick={sendOtpHandler}>
                Send OTP
            </button>

            <OtpInput
                value={enteredOtp}
                onChange={handleOtpChange}
                numInputs={6}
                separator={<span>-</span>}
                isInputNum={true}
                shouldAutoFocus={true}
                containerStyle={{ marginTop: "20px" }}
                inputStyle={{
                    width: "50px",
                    height: "50px",
                    fontSize: "20px",
                    margin: "5px",
                    borderRadius: "5px",
                    border: "2px solid black",
                }}
            />

            <button style={{ margin: 10, marginTop: 25 }} onClick={verifyOtpHandler}>
                Verify OTP
            </button>

            <div>
                {verified && <p>OTP Verified Successfully</p>}
                {!verified && verified !== '' && <p>Invalid OTP</p>}
            </div>
        </div>
    );
};

// Function to generate OTP (replace with your actual OTP generation logic)
function idGenerator(prefix) {
    return `${prefix}_${Math.floor(Math.random() * 1000000)}`;
}

export default SendOtp;
