// import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { useEffect } from "react";
import "../ComponentsCSS/paymentsuccess.css";

const FestivalPaymentSuccess = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [paymentResponse, setPaymentResponse] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const pathname = location.pathname;
    const orderId = pathname.split('/').pop();
    const [showLoader, setShowLoader] = useState(true);

    const getPaymentRes = async () => {
        try {
            const response = await axios.get(`https://www.indianfilms.in/eFirstIndiaAPI/api/FestivalPayment/UpdatePaymentResponse?OrderId=${orderId}`);
            // console.log(response, 'responseresponseresponseresponseresponseresponse')
            if (response.status === 200) {
                if (response.data.isSuccess == 1) {
                    if (response.data.data.orderStatusId === 3 && response.data.data.paymentStatus === "Y") {
                        setPaymentResponse(response?.data?.data);
                    } else {
                        setError("Failed to payment");
                    }
                } else {
                    alert('payment failed');
                }

            } else {
                setError("Failed to payment");
            }
        } catch (error) {
            // console.error('Error payment:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPaymentRes();
    }, [])

    const onViewDetail = () => {
        if (paymentResponse?.paymentStatus === "Y") {
            localStorage.setItem('youthpaymentStatus', paymentResponse?.paymentStatus);
            navigate('/youthfestivalplus/viewdetails');
        }
    }

    useEffect(() => {
        getPaymentRes();
        const timer = setTimeout(() => {
            setShowLoader(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className='youthfestival'>
            <Navbar />
            <div className="payment_status d-flex justify-content-center py-5">
                {showLoader ? (
                    <div className="loader">
                        <div className="spinner"></div>
                    </div>
                ) : (
                    <div className="payment_status_box">
                        {
                            paymentResponse?.orderStatusId === 3 && paymentResponse?.paymentStatus === "Y" ?
                                <div className="text-center">

                                    <div className="payment_status_gif" style={{ display: "flex", justifyContent: "center" }}>
                                        <img src="./festivalimages/gif.gif" alt="" loading="lazy" style={{ height: '100px' }} />
                                    </div>
                                    <h2 className="" style={{ color: 'green' }}>Payment Successful</h2>
                                    <div className="order_detail my-3">
                                        <h4>{paymentResponse?.orderReqId}</h4>

                                    </div>
                                    <div className="go_home_btn my-4">
                                        <button onClick={() => onViewDetail()}>VIEW DETAIL</button >
                                    </div>
                                </div>
                                :
                                <div className="text-center">

                                    <div className="payment_status_gif" style={{ display: "flex", justifyContent: "center" }}>
                                        <img src="./festivalimages/payfailed1.png" alt="" loading="lazy" style={{ height: '100px' }} />
                                    </div>
                                    <h2>Payment Failed</h2>
                                    <div className="order_detail my-3">
                                        <h4>{paymentResponse?.orderReqId}</h4>

                                    </div>
                                    <div className="go_home_btn my-4">
                                        <Link to="/youthfestivalplus/viewdetails">Please try again</Link >
                                    </div>
                                </div>
                        }
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default FestivalPaymentSuccess;