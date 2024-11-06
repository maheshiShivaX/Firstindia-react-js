import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Shared/Footer";
import Header from "../Shared/Header";
import './paymentreturn.css';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { API_URL, baseurl } from '../../_config';

const order_id = localStorage.getItem("order_id");

const PaymentReturn = () => {
    const jwtToken = localStorage.getItem('jwtToken');
    const [paymentResponse, setPaymentResponse] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showLoader, setShowLoader] = useState(true); 
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const pathname = location.pathname;
    const orderId = pathname.split('/').pop();

    const getPaymentRes = async () => {
        try {
            const response = await axios.get(`${baseurl}${API_URL?.UpdatePaymentResponse}?OrderId=${orderId}`, {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`,
                },
            });
            if (response.status === 200) {
                if (response.data.isSuccess == 1) {
                    if (response.data.data.orderStatusId === 3 && response.data.data.paymentStatus === "PAYMENT_SUCCESS") {
                        setPaymentResponse(response?.data?.data);
                        // console.log(response,'response')
                    } else {
                        setError("Failed to payment");
                    }
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
        const timer = setTimeout(() => {
            setShowLoader(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);



    return (
        <div className="payment_return" style={{ background: '#000' }}>
            <section>
                <div className="container">
                    <Header />
                    <div className="payment_status d-flex justify-content-center my-5">
                        {showLoader ? (
                            <div className="loader">
                                <div className="spinner"></div>
                            </div>
                        ) : (
                            <>
                                 {paymentResponse.orderStatusId === 3 && paymentResponse.paymentStatus === "PAYMENT_SUCCESS" ? (
                                    <div className="text-center">
                                        <div className="payment_status_gif">
                                            <img src="./assets/gif.gif" alt="" loading="lazy" />
                                        </div>
                                        <h2>Your Order has been Placed</h2>
                                        <div className="order_detail my-3">
                                            <h4>{paymentResponse?.orderReqId}</h4>
                                        </div>
                                        <div className="go_home_btn my-4">
                                            <Link to="/">GO BACK TO HOME</Link>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <div className="payment_failed">

                                            <div>
                                                <img src="./assets/payment_fail_icon.png" alt="" className="failed_image" />
                                            </div>
                                            <div className="payment_failed_text">Payment Failed</div>
                                            <div className="go_home_btn_failed my-4">
                                                <Link to="/">GO BACK TO HOME</Link>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default PaymentReturn;