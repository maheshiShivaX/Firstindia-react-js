import React, { useState } from 'react';
import axios from 'axios';
import useRazorpay from "react-razorpay";
import Layout from '../layout/layout';
const baseUrl = process.env.REACT_APP_BASE_URL;

const PaymentGateway = () => {
  const [mobileNo, setMobileNo] = useState('');
  const [selectedPaymentOption, setSelectedPaymentOption] = useState('3');
  const [error, setError] = useState(null);
  const userid = localStorage.getItem('userid');
  const mobile = localStorage.getItem('mobile');
  const [Razorpay] = useRazorpay();

  const [form, setForm] = useState({
    customer_id: userid,
    customer_phone: mobile,
    package_id: '1',
    audition_id: '0',
    amount: '100',
    order_type: 'package',
    payment_option_id: selectedPaymentOption
  });

  const [paymentSessionId, setPaymentSessionId] = useState('');

  const onCreateOrder = async () => {
    try {
      const response = await axios.post(`${baseUrl}create_order`, {
        customer_id: form.customer_id,
        customer_phone: form.customer_phone,
        amount: form.amount,
        order_type: form.order_type,
        package_id: form.package_id,
        audition_id: form.audition_id,
        payment_option_id: selectedPaymentOption
      });

      if (response.status === 200) {
        const result = response.data;
        console.log(result, 'paymentgateway');

        if (selectedPaymentOption === "3") {
          loadRazorpayScript();
          const options = {
            key: result.key,
            amount: result.result.amount,
            currency: result.result.currency,
            name: result.result.name,
            description: result.result.description,
            image: result.result.image,
            order_id: result.result.order_id,
            prefill: result.result.prefill,
            theme: result.result.theme,
            callback_url: result.result.callback_url,
            notes: result.result.notes
          };
          // const rzp1 = new Razorpay(options);
          const paymentObject = new Razorpay(options);
          paymentObject.open();
        }
      } else {
        setError("Failed to create order");
      }
    } catch (error) {
      setError("Failed to create order. Please try again later.");
      console.error('Error creating order:', error);
    }
  };


  const loadRazorpayScript = async () => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }

  return (
    <Layout>
      <div className='d-flex justify-content-center'>
        <div className='paymentgateway-main'>
          <div className='payment-heading text-white text-center'>
            <h2>Let's Make Payment</h2>
            <span>To start your subscription</span>
          </div>
          <div className='payment-option text-white d-flex my-4 py-2 justify-content-center'>
            <div className='method'>
              <span>
                <img src='images/2.png' />
              </span>
            </div>
            <div className='method'>
              <span>
                <img src='images/3.png' />
              </span>
            </div>
          </div>
          <div className='plan-amount text-white'>
            <div>
              <div className='amount-heading'>
                <p className='text-white mb-0'>You'r Paying</p>
                <h2>1Rs.</h2>
              </div>
              <div className='d-flex justify-content-between sidetext'>
                <p>Discounts and Offers</p>
                <p>0.00</p>
              </div>
              <div className='borderb'></div>
              <div className='d-flex justify-content-between mt-2 sidetext'>
                <p>Total</p>
                <p>1Rs.</p>
              </div>
            </div>
          </div>
          <div className='paybtn text-center mt-4'>
            <button onClick={onCreateOrder}>Pay Now</button>
          </div>
          {error && <p>{error}</p>}
        </div>
      </div>
    </Layout>
  );
};

export default PaymentGateway;
