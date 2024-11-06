import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import useRazorpay from 'react-razorpay';
import "../ComponentsCSS/viewdetail.css";

const FestivalViewDetails = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [festivalRegData, setFestivalRegData] = useState([])
    const festivalRegId = localStorage.getItem('festivalRegId');
    const [Razorpay] = useRazorpay();
    const youthpaymentStatus = localStorage.getItem('youthpaymentStatus');

    const getFestivalRegistrationById = async () => {
        try {
            const response = await axios.get(`https://www.indianfilms.in/eFirstIndiaAPI/api/FestivalRegistration/GetFestivalRegistrationById?pFestivalRegistrationId=${festivalRegId}`);
            if (response.status == 200) {
                if (response.data.isSuccess && response.data.data != null) {
                    setFestivalRegData(response?.data?.data[0]);
                }
            } else {

                // console.log('data is null')
            }
        } catch (error) {
            setError("Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getFestivalRegistrationById();
    }, [festivalRegId]);

    // const Razorpay = useRazorpay();

    const onCreateOrder = async () => {
        try {
            const response = await axios.post(`https://www.indianfilms.in/eFirstIndiaAPI/api/FestivalPayment/paymentRequest`, {
                festivalRegId: festivalRegId
            });

            if (response.status === 200) {
                const result = response.data;
                loadRazorpayScript();
                const options = {
                    key: result.key,
                    amount: result.data.amount,
                    currency: result.data.currency,
                    name: result.data.name,
                    description: result.data.description,
                    image: result.data.image,
                    order_id: result.data.order_id,
                    prefill: result.data.prefill,
                    theme: result.data.theme,
                    callback_url: result.data.callback_url,
                    notes: result.data.notes
                };
                const paymentObject = new Razorpay(options);
                paymentObject.open();
            } else {
            }
        } catch (error) {
            setError("Payment Failed. Please try again later.");
            // console.error('Error creating order:', error);
        }
    };

    const loadRazorpayScript = async () => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
    }

    return (
        <div className="youthfestival">
            <Navbar />
            <div className="view_detail" style={{ display: 'flex', justifyContent: 'center', paddingBottom: '50px', background: '#fff' }}>
                <div className="user_details">
                    {youthpaymentStatus == "Y" ?
                        <div className="status_button">
                            <button className="status_btn" >Success</button>
                        </div> :
                        null
                    }
                    <div className="content_user">
                        <span className="user_detail_heading">Name of the Institution/Group :-</span>
                        <span className="user_detail_ans">{festivalRegData?.school}</span>
                    </div>
                    <div className="content_user" style={{ marginTop: '10px' }}>
                        <span className="user_detail_heading">Name of the Group Co-Ordinator :-</span>
                        <span className="user_detail_ans">{festivalRegData?.cordinatorName}</span>
                    </div>
                    <div className="content_user" style={{ marginTop: '10px' }}>
                        <span className="user_detail_heading">Email Id :-</span>
                        <span className="user_detail_ans">{festivalRegData?.emailId}</span>
                    </div>
                    <div className="content_user" style={{ marginTop: '10px' }}>
                        <span className="user_detail_heading">Mobile Number :-</span>
                        <span className="user_detail_ans">{festivalRegData?.cordinatorMobileNo}</span>
                    </div>
                    {youthpaymentStatus != "Y" ?
                        <div className="pay_now_button">
                            <button className="pay_btn" onClick={onCreateOrder} >PAY NOW</button>
                        </div> :
                        null
                    }

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default FestivalViewDetails;